-- Update all functions to use search_path = '' for security

-- 1. Update handle_updated_at function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 2. Update has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 3. Update get_applications_with_closer_info function
CREATE OR REPLACE FUNCTION public.get_applications_with_closer_info()
RETURNS TABLE(
  id uuid,
  created_at timestamp with time zone,
  full_name text,
  email text,
  phone text,
  age integer,
  status text,
  qualification_score integer,
  form_type text,
  assigned_to uuid,
  closer_name text,
  closer_email text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT 
    a.id,
    a.created_at,
    a.full_name,
    a.email,
    a.phone,
    a.age,
    a.status,
    a.qualification_score,
    a.form_type,
    a.assigned_to,
    au.raw_user_meta_data->>'full_name' AS closer_name,
    au.email AS closer_email
  FROM public.applications a
  LEFT JOIN auth.users au ON a.assigned_to = au.id
  ORDER BY a.created_at DESC;
$$;