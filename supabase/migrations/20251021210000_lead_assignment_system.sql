-- Lead Assignment System for Closers
-- This migration adds lead assignment functionality and updates RLS policies

-- 1. Add assigned_to column to applications table
ALTER TABLE public.applications
ADD COLUMN IF NOT EXISTS assigned_to uuid REFERENCES auth.users(id);

-- Add index for performance
CREATE INDEX IF NOT EXISTS applications_assigned_to_idx 
  ON public.applications(assigned_to);

-- Add comment for documentation
COMMENT ON COLUMN public.applications.assigned_to IS 
  'User (closer) to whom this application is assigned. NULL means unassigned.';

-- 2. Update RLS policies for applications table

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Admins can view all applications" ON public.applications;
DROP POLICY IF EXISTS "Closers can view assigned applications" ON public.applications;
DROP POLICY IF EXISTS "Admins can insert applications" ON public.applications;
DROP POLICY IF EXISTS "Admins can update applications" ON public.applications;
DROP POLICY IF EXISTS "Closers can update assigned applications" ON public.applications;
DROP POLICY IF EXISTS "Anyone can insert applications" ON public.applications;

-- Policy 1: Admins can view all applications
CREATE POLICY "Admins can view all applications"
ON public.applications
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy 2: Closers can view only their assigned applications
CREATE POLICY "Closers can view assigned applications"
ON public.applications
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'closer') 
  AND assigned_to = auth.uid()
);

-- Policy 3: Anyone (unauthenticated) can insert applications (public form)
CREATE POLICY "Public can insert applications"
ON public.applications
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy 4: Authenticated users can also insert (for testing)
CREATE POLICY "Authenticated can insert applications"
ON public.applications
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy 5: Admins can update all applications
CREATE POLICY "Admins can update all applications"
ON public.applications
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy 6: Closers can update only their assigned applications
CREATE POLICY "Closers can update assigned applications"
ON public.applications
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'closer') 
  AND assigned_to = auth.uid()
)
WITH CHECK (
  public.has_role(auth.uid(), 'closer') 
  AND assigned_to = auth.uid()
);

-- Policy 7: Admins can delete applications
CREATE POLICY "Admins can delete applications"
ON public.applications
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 3. Create function to assign application to closer
CREATE OR REPLACE FUNCTION public.assign_application_to_closer(
  _application_id uuid,
  _closer_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Check if caller is admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can assign applications';
  END IF;
  
  -- Check if closer exists and has closer role
  IF NOT public.has_role(_closer_id, 'closer') THEN
    RAISE EXCEPTION 'Target user is not a closer';
  END IF;
  
  -- Assign application
  UPDATE public.applications
  SET assigned_to = _closer_id,
      updated_at = now()
  WHERE id = _application_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Application not found';
  END IF;
END;
$$;

-- Add comment for documentation
COMMENT ON FUNCTION public.assign_application_to_closer IS 
  'Allows admins to assign an application to a closer. Only admins can call this function.';

-- 4. Create function to unassign application
CREATE OR REPLACE FUNCTION public.unassign_application(
  _application_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Check if caller is admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can unassign applications';
  END IF;
  
  -- Unassign application
  UPDATE public.applications
  SET assigned_to = NULL,
      updated_at = now()
  WHERE id = _application_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Application not found';
  END IF;
END;
$$;

-- Add comment for documentation
COMMENT ON FUNCTION public.unassign_application IS 
  'Allows admins to unassign an application from a closer. Only admins can call this function.';

-- 5. Create view for closers to see their assigned applications count
CREATE OR REPLACE VIEW public.closer_stats AS
SELECT 
  u.id as closer_id,
  u.email as closer_email,
  COUNT(a.id) as total_assigned,
  COUNT(CASE WHEN a.status = 'new' THEN 1 END) as new_applications,
  COUNT(CASE WHEN a.status = 'contacted' THEN 1 END) as contacted,
  COUNT(CASE WHEN a.status = 'qualified' THEN 1 END) as qualified,
  COUNT(CASE WHEN a.status = 'disqualified' THEN 1 END) as disqualified
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
LEFT JOIN public.applications a ON u.id = a.assigned_to
WHERE ur.role = 'closer'
GROUP BY u.id, u.email;

-- Add RLS to the view
ALTER VIEW public.closer_stats SET (security_invoker = on);

-- Grant permissions
GRANT SELECT ON public.closer_stats TO authenticated;

-- Add comment for documentation
COMMENT ON VIEW public.closer_stats IS 
  'Statistics view showing application counts per closer. Admins see all, closers see only their own stats.';

-- 6. Create function to get unassigned applications count
CREATE OR REPLACE FUNCTION public.get_unassigned_applications_count()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  count integer;
BEGIN
  -- Check if caller is admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can view unassigned applications count';
  END IF;
  
  SELECT COUNT(*)
  INTO count
  FROM public.applications
  WHERE assigned_to IS NULL;
  
  RETURN count;
END;
$$;

-- Add comment for documentation
COMMENT ON FUNCTION public.get_unassigned_applications_count IS 
  'Returns the count of unassigned applications. Only admins can call this function.';

-- 7. Add trigger to log assignment changes
CREATE TABLE IF NOT EXISTS public.application_assignments_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES auth.users(id),
  assigned_by uuid REFERENCES auth.users(id),
  assigned_at timestamptz DEFAULT now(),
  action text NOT NULL CHECK (action IN ('assigned', 'unassigned', 'reassigned'))
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS application_assignments_log_application_id_idx 
  ON public.application_assignments_log(application_id);

-- Enable RLS
ALTER TABLE public.application_assignments_log ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can view all logs
CREATE POLICY "Admins can view assignment logs"
ON public.application_assignments_log
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Closers can view logs for their applications
CREATE POLICY "Closers can view their assignment logs"
ON public.application_assignments_log
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'closer')
  AND assigned_to = auth.uid()
);

-- Create trigger function to log assignments
CREATE OR REPLACE FUNCTION public.log_application_assignment()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  action_type text;
BEGIN
  -- Determine action type
  IF OLD.assigned_to IS NULL AND NEW.assigned_to IS NOT NULL THEN
    action_type := 'assigned';
  ELSIF OLD.assigned_to IS NOT NULL AND NEW.assigned_to IS NULL THEN
    action_type := 'unassigned';
  ELSIF OLD.assigned_to IS NOT NULL AND NEW.assigned_to IS NOT NULL 
        AND OLD.assigned_to != NEW.assigned_to THEN
    action_type := 'reassigned';
  ELSE
    -- No assignment change, skip logging
    RETURN NEW;
  END IF;
  
  -- Log the assignment change
  INSERT INTO public.application_assignments_log (
    application_id,
    assigned_to,
    assigned_by,
    action
  ) VALUES (
    NEW.id,
    NEW.assigned_to,
    auth.uid(),
    action_type
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS log_application_assignment_trigger ON public.applications;
CREATE TRIGGER log_application_assignment_trigger
  AFTER UPDATE OF assigned_to ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.log_application_assignment();

-- Add comment for documentation
COMMENT ON TABLE public.application_assignments_log IS 
  'Audit log for application assignment changes. Tracks who assigned what to whom and when.';

COMMENT ON FUNCTION public.log_application_assignment IS 
  'Trigger function that logs all assignment changes to applications.';

