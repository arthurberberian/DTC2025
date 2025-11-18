-- Rate Limiting Protection for Public Form Submissions
-- This migration adds rate limiting to prevent spam and abuse

-- 1. Create a table to track submission attempts by IP/email
CREATE TABLE IF NOT EXISTS public.submission_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text NOT NULL, -- IP address or email
  attempt_type text NOT NULL CHECK (attempt_type IN ('ip', 'email')),
  attempted_at timestamptz DEFAULT now(),
  success boolean DEFAULT false
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS submission_attempts_identifier_idx 
  ON public.submission_attempts(identifier, attempted_at DESC);

-- 2. Function to check rate limiting
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  _identifier text,
  _attempt_type text,
  _max_attempts integer DEFAULT 5,
  _time_window_minutes integer DEFAULT 60
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  attempt_count integer;
BEGIN
  -- Count recent attempts
  SELECT COUNT(*)
  INTO attempt_count
  FROM public.submission_attempts
  WHERE identifier = _identifier
    AND attempt_type = _attempt_type
    AND attempted_at > (now() - (_time_window_minutes || ' minutes')::interval);
  
  -- Return true if under limit, false if over
  RETURN attempt_count < _max_attempts;
END;
$$;

-- 3. Function to log submission attempt
CREATE OR REPLACE FUNCTION public.log_submission_attempt(
  _identifier text,
  _attempt_type text,
  _success boolean DEFAULT false
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.submission_attempts (identifier, attempt_type, success)
  VALUES (_identifier, _attempt_type, _success);
END;
$$;

-- 4. Trigger to enforce rate limiting on applications insert
CREATE OR REPLACE FUNCTION public.enforce_rate_limit_on_application()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  client_ip text;
  can_submit boolean;
BEGIN
  -- Get client IP from request headers (if available)
  -- Note: This requires proper configuration in Supabase Edge Functions
  client_ip := current_setting('request.headers', true)::json->>'x-forwarded-for';
  
  -- If no IP available, use email as identifier
  IF client_ip IS NULL OR client_ip = '' THEN
    client_ip := NEW.email;
  END IF;
  
  -- Check rate limit by IP
  SELECT public.check_rate_limit(client_ip, 'ip', 3, 60) INTO can_submit;
  
  IF NOT can_submit THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;
  
  -- Check rate limit by email (stricter)
  SELECT public.check_rate_limit(NEW.email, 'email', 2, 1440) INTO can_submit;
  
  IF NOT can_submit THEN
    RAISE EXCEPTION 'You have already submitted an application recently. Please wait 24 hours.';
  END IF;
  
  -- Log successful attempt
  PERFORM public.log_submission_attempt(client_ip, 'ip', true);
  PERFORM public.log_submission_attempt(NEW.email, 'email', true);
  
  RETURN NEW;
END;
$$;

-- Create trigger on applications table
DROP TRIGGER IF EXISTS rate_limit_applications_trigger ON public.applications;
CREATE TRIGGER rate_limit_applications_trigger
  BEFORE INSERT ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_rate_limit_on_application();

-- 5. Function to clean old attempts (run periodically)
CREATE OR REPLACE FUNCTION public.cleanup_old_submission_attempts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  DELETE FROM public.submission_attempts
  WHERE attempted_at < (now() - interval '7 days');
END;
$$;

-- 6. Enable RLS on submission_attempts table
ALTER TABLE public.submission_attempts ENABLE ROW LEVEL SECURITY;

-- Only admins can view submission attempts
CREATE POLICY "Admins can view submission attempts"
ON public.submission_attempts
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 7. Add comment for documentation
COMMENT ON TABLE public.submission_attempts IS 
  'Tracks form submission attempts for rate limiting. Automatically cleaned after 7 days.';

COMMENT ON FUNCTION public.check_rate_limit IS 
  'Checks if an identifier (IP or email) has exceeded rate limits. Returns true if allowed, false if blocked.';

COMMENT ON FUNCTION public.enforce_rate_limit_on_application IS 
  'Trigger function that enforces rate limiting on application submissions. Limits: 3 per IP/hour, 2 per email/24h.';