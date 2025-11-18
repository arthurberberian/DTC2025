-- Attach rate limiting trigger to applications table
-- This trigger will enforce rate limits on form submissions before allowing inserts

CREATE TRIGGER enforce_rate_limit_on_application_trigger
  BEFORE INSERT ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_rate_limit_on_application();