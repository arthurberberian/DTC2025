import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";

export function useAuthAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<"admin" | "closer" | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Listener primeiro
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer para evitar deadlock
          setTimeout(() => {
            supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", session.user.id)
              .maybeSingle()
              .then(({ data }) => {
                setRole(data?.role as "admin" | "closer" | null);
                setLoading(false);
              });
          }, 0);
        } else {
          setRole(null);
          setLoading(false);
        }
      }
    );

    // Depois checar sessão existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .maybeSingle()
          .then(({ data }) => {
            setRole(data?.role as "admin" | "closer" | null);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return { user, role, loading, logout };
}
