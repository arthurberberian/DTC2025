-- Lead Assignment System Migration
-- This migration implements the lead assignment system for closers with proper RLS policies

-- 1. Add assigned_to column if it doesn't exist
ALTER TABLE public.applications 
ADD COLUMN IF NOT EXISTS assigned_to uuid REFERENCES auth.users(id);

-- 2. Create index for performance
CREATE INDEX IF NOT EXISTS idx_applications_assigned_to 
ON public.applications(assigned_to);

-- 3. Drop old insecure policies
DROP POLICY IF EXISTS "Closers and admins can view applications" ON public.applications;
DROP POLICY IF EXISTS "Closers can update assigned applications" ON public.applications;
DROP POLICY IF EXISTS "Admins can update any application" ON public.applications;

-- 4. Create new secure RLS policies
CREATE POLICY "Closers can view assigned applications"
ON public.applications
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR 
  (
    public.has_role(auth.uid(), 'closer'::app_role) AND 
    assigned_to = auth.uid()
  )
);

CREATE POLICY "Closers can update assigned applications"
ON public.applications
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  (
    public.has_role(auth.uid(), 'closer'::app_role) AND 
    assigned_to = auth.uid()
  )
)
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  (
    public.has_role(auth.uid(), 'closer'::app_role) AND 
    assigned_to = auth.uid()
  )
);

CREATE POLICY "Admins can update any application"
ON public.applications
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 5. Create function to assign application to closer (admin only)
CREATE OR REPLACE FUNCTION public.assign_application_to_closer(
  _application_id uuid,
  _closer_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  _is_admin boolean;
  _is_closer boolean;
BEGIN
  -- Check if caller is admin
  SELECT public.has_role(auth.uid(), 'admin'::app_role) INTO _is_admin;
  
  IF NOT _is_admin THEN
    RAISE EXCEPTION 'Only admins can assign applications';
  END IF;
  
  -- Check if target user is a closer
  SELECT public.has_role(_closer_id, 'closer'::app_role) INTO _is_closer;
  
  IF NOT _is_closer THEN
    RAISE EXCEPTION 'Target user must have closer role';
  END IF;
  
  -- Assign application
  UPDATE public.applications
  SET assigned_to = _closer_id
  WHERE id = _application_id;
  
  RETURN FOUND;
END;
$$;

-- 6. Create function to unassign application (admin only)
CREATE OR REPLACE FUNCTION public.unassign_application(
  _application_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  _is_admin boolean;
BEGIN
  -- Check if caller is admin
  SELECT public.has_role(auth.uid(), 'admin'::app_role) INTO _is_admin;
  
  IF NOT _is_admin THEN
    RAISE EXCEPTION 'Only admins can unassign applications';
  END IF;
  
  -- Unassign application
  UPDATE public.applications
  SET assigned_to = NULL
  WHERE id = _application_id;
  
  RETURN FOUND;
END;
$$;

-- 7. Create function to get unassigned applications count
CREATE OR REPLACE FUNCTION public.get_unassigned_applications_count()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT COUNT(*)::integer
  FROM public.applications
  WHERE assigned_to IS NULL;
$$;

-- 8. Create view for closer statistics
CREATE OR REPLACE VIEW public.closer_stats AS
SELECT 
  ur.user_id,
  au.email as closer_email,
  au.raw_user_meta_data->>'full_name' as closer_name,
  COUNT(a.id) as total_assigned,
  COUNT(CASE WHEN a.status = 'new' THEN 1 END) as status_new,
  COUNT(CASE WHEN a.status = 'contacted' THEN 1 END) as status_contacted,
  COUNT(CASE WHEN a.status = 'qualified' THEN 1 END) as status_qualified,
  COUNT(CASE WHEN a.status = 'converted' THEN 1 END) as status_converted,
  COUNT(CASE WHEN a.status = 'lost' THEN 1 END) as status_lost
FROM public.user_roles ur
JOIN auth.users au ON ur.user_id = au.id
LEFT JOIN public.applications a ON a.assigned_to = ur.user_id
WHERE ur.role = 'closer'::app_role
GROUP BY ur.user_id, au.email, au.raw_user_meta_data->>'full_name';

-- Enable RLS on the view (inherits from underlying tables)
ALTER VIEW public.closer_stats SET (security_invoker = on);

-- 9. Create audit log table for assignment changes
CREATE TABLE IF NOT EXISTS public.application_assignments_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_at timestamptz DEFAULT now() NOT NULL,
  previous_closer uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS on audit log
ALTER TABLE public.application_assignments_log ENABLE ROW LEVEL SECURITY;

-- Policy for admins to view audit log
CREATE POLICY "Admins can view assignment log"
ON public.application_assignments_log
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create index for audit log queries
CREATE INDEX IF NOT EXISTS idx_assignments_log_application 
ON public.application_assignments_log(application_id, assigned_at DESC);

-- 10. Create trigger to log assignment changes
CREATE OR REPLACE FUNCTION public.log_application_assignment()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Only log if assigned_to changed
  IF (TG_OP = 'UPDATE' AND OLD.assigned_to IS DISTINCT FROM NEW.assigned_to) THEN
    INSERT INTO public.application_assignments_log (
      application_id,
      assigned_to,
      assigned_by,
      previous_closer
    ) VALUES (
      NEW.id,
      NEW.assigned_to,
      auth.uid(),
      OLD.assigned_to
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS log_application_assignment_trigger ON public.applications;
CREATE TRIGGER log_application_assignment_trigger
AFTER UPDATE ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.log_application_assignment();

-- Grant necessary permissions
GRANT SELECT ON public.closer_stats TO authenticated;
GRANT EXECUTE ON FUNCTION public.assign_application_to_closer(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.unassign_application(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_unassigned_applications_count() TO authenticated;