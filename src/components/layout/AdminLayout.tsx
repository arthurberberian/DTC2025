import { useEffect } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useAuthAdmin } from "@/lib/hooks/useAuthAdmin";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Users, LogOut } from "lucide-react";

export default function AdminLayout() {
  const { user, role, loading, logout } = useAuthAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
    if (!loading && user && !role) {
      navigate("/");
    }
  }, [user, role, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Carregando...</p>
      </div>
    );
  }

  if (!user || !role) {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-slate-900 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Portal</h1>
          <p className="mt-1 text-sm text-slate-400">Mentoria TDAH</p>
        </div>

        <nav className="space-y-1 px-3">
          <Link to="/admin/dashboard">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                isActive("/admin/dashboard")
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </Button>
          </Link>

          <Link to="/admin/applications">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                isActive("/admin/applications")
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FileText className="mr-3 h-5 w-5" />
              Aplicações
            </Button>
          </Link>

          {role === "admin" && (
            <Link to="/admin/team">
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  isActive("/admin/team")
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Time
              </Button>
            </Link>
          )}
        </nav>

        <div className="absolute bottom-0 w-64 border-t border-white/10 p-4">
          <div className="mb-3 text-sm">
            <p className="font-medium">{user.email}</p>
            <p className="text-slate-400 capitalize">{role}</p>
          </div>
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full justify-start text-slate-300 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </Button>
        </div>
      </aside>

      <main className="flex-1 bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
}
