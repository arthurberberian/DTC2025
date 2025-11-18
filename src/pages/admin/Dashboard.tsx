import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    qualified: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Total
      const { count: total } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true });

      // Pendentes
      const { count: pending } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      // Qualificadas
      const { count: qualified } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true })
        .eq("status", "qualified");

      const conversionRate = total && qualified ? ((qualified / total) * 100).toFixed(1) : 0;

      setStats({
        total: total || 0,
        pending: pending || 0,
        qualified: qualified || 0,
        conversionRate: Number(conversionRate),
      });
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Carregando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">Visão geral das aplicações</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total de Aplicações
            </CardTitle>
            <FileText className="h-5 w-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.total}</div>
            <p className="mt-1 text-sm text-slate-500">Todas as aplicações</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pendentes
            </CardTitle>
            <AlertCircle className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.pending}</div>
            <p className="mt-1 text-sm text-slate-500">Aguardando revisão</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Qualificadas
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.qualified}</div>
            <p className="mt-1 text-sm text-slate-500">Aprovadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Taxa de Conversão
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.conversionRate}%</div>
            <p className="mt-1 text-sm text-slate-500">Qualificadas / Total</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
