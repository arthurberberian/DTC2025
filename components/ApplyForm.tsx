import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationCreateSchema, type ApplicationCreateInput } from "@/lib/schemas";
import { track } from "@/lib/track";
import { toast } from "sonner";
import { submitSimpleApplication } from "@/lib/hooks/useApplicationSubmit";

export default function ApplyForm() {
  const startRef = useRef<number>(Date.now());
  const [ok, setOk] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ApplicationCreateInput>({
    resolver: zodResolver(ApplicationCreateSchema),
    defaultValues: {
      commitmentScore: 5,
      consentLGPD: false,
    } as any,
  });

  const commitmentScore = watch("commitmentScore");

  useEffect(() => {
    const element = document.getElementById("apply-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  async function onSubmit(data: any) {
    setOk(null);
    const elapsed = Date.now() - startRef.current;
    
    if (elapsed < 8000) {
      toast.error("Por favor, revise suas respostas antes de enviar.");
      return;
    }

    // Honeypot check
    if ((data as any).company) {
      toast.error("Erro de validação.");
      return;
    }

    track("apply_started", { page: "mentoria_tdah" });

    try {
      await submitSimpleApplication(data);
      
      track("apply_submitted", { page: "mentoria_tdah", form_type: "simple" });
      setOk("Aplicação recebida! Nossa equipe entrará em contato por WhatsApp/E-mail.");
      toast.success("Aplicação enviada com sucesso!");
      reset();
    } catch (e: any) {
      toast.error("Não foi possível enviar sua aplicação agora. Tente novamente.");
      track("apply_error", { page: "mentoria_tdah", message: e?.message });
      console.error("Error submitting application:", e);
    }
  }

  return (
    <div id="apply-form" className="rounded-xl bg-slate-900 p-6 shadow-2xl md:p-10">
      <h2 className="text-2xl font-bold text-white md:text-3xl">
        Aplicação para a Mentoria
      </h2>
      <p className="mt-2 text-sm text-slate-300">
        Preencha seus dados. Usaremos para contato na análise da aplicação.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Honeypot (invisible) */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          {...register("company" as any)}
        />

        <Field label="Nome completo" error={errors.candidateName?.message}>
          <input 
            className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
            placeholder="Seu nome completo" 
            {...register("candidateName")} 
          />
        </Field>

        <Field label="E-mail" error={errors.candidateEmail?.message}>
          <input
            className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            type="email"
            placeholder="seuemail@exemplo.com"
            {...register("candidateEmail")}
          />
        </Field>

        <Field label="WhatsApp (com DDD)" error={errors.candidatePhone?.message}>
          <input 
            className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
            placeholder="11999990000" 
            {...register("candidatePhone")} 
          />
        </Field>

        <Field label="Idade" error={errors.candidateAge?.message}>
          <input
            className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            type="number"
            min="18"
            max="100"
            placeholder="35"
            {...register("candidateAge")}
          />
        </Field>

        <Field label="Área de atuação" error={errors.professionalArea?.message}>
          <select 
            className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
            {...register("professionalArea")}
          >
            <option value="">Selecione…</option>
            <option>Psicólogo(a) Clínico(a)</option>
            <option>Neuropsicólogo(a)</option>
            <option>Psicopedagogo(a)</option>
            <option>Outra</option>
          </select>
        </Field>

        <Field label="Tempo de clínica" error={errors.experienceLevel?.message}>
          <select 
            className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
            {...register("experienceLevel")}
          >
            <option value="">Selecione…</option>
            <option>1-2 anos</option>
            <option>3-5 anos</option>
            <option>6-10 anos</option>
            <option>11+ anos</option>
          </select>
        </Field>

        <Field label="Desafio principal em TDAH" error={errors.mainChallenge?.message} full>
          <textarea
            className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-28"
            placeholder="Conte um caso, uma dificuldade de decisão..."
            {...register("mainChallenge")}
          />
        </Field>

        <Field label="Objetivo com a mentoria" error={errors.mainGoal?.message} full>
          <textarea
            className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-28"
            placeholder="O que você quer mudar na sua prática clínica..."
            {...register("mainGoal")}
          />
        </Field>

        <Field 
          label="Nível de Comprometimento com seu Crescimento*" 
          error={errors.investmentWillingness?.message} 
          full
        >
          <textarea
            className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-32"
            placeholder='Ex: "Já investi incontáveis horas em estudos sem direção e sinto que minha carreira está estagnada. Estou pronto(a) para fazer um investimento sério em um método que me dê um retorno claro em segurança e reputação."'
            {...register("investmentWillingness")}
          />
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            Pensando nos seus desafios atuais, qual você acredita que tem sido o custo (em tempo, energia e oportunidades perdidas) de não resolvê-los até hoje? E qual investimento você considera justo para finalmente alcançar o nível de referência clínica que deseja?
          </p>
        </Field>

        <div className="md:col-span-2">
          <label className="mb-3 block text-sm font-medium text-white">
            Comprometimento (0 a 10)
          </label>
          <div className="relative">
            <input
              type="range"
              min={0}
              max={10}
              className="h-3 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-blue-500"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(commitmentScore || 5) * 10}%, #334155 ${(commitmentScore || 5) * 10}%, #334155 100%)`
              }}
              {...register("commitmentScore", { valueAsNumber: true })}
            />
            <div className="mt-2 flex justify-between text-xs text-slate-400">
              <span>0 - Nenhum</span>
              <span className="text-lg font-bold text-blue-400">{commitmentScore || 5}</span>
              <span>10 - Total</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Em uma escala de 0 a 10, o quão comprometido(a) você está em investir tempo e energia para transformar sua prática clínica?
          </p>
        </div>

        <div className="flex items-start gap-3 md:col-span-2">
          <input
            id="lgpd"
            type="checkbox"
            className="mt-1 h-5 w-5 cursor-pointer rounded border-slate-600 bg-white accent-blue-500"
            {...register("consentLGPD")}
          />
          <label htmlFor="lgpd" className="text-sm leading-relaxed text-slate-300">
            Concordo em fornecer meus dados para avaliação da aplicação, conforme a{" "}
            <a className="font-medium text-blue-400 underline hover:text-blue-300" href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">
              Política de Privacidade
            </a>
            .
          </label>
        </div>
        {errors.consentLGPD?.message && (
          <p className="text-xs text-red-400 md:col-span-2">{String(errors.consentLGPD.message)}</p>
        )}

        {ok && (
          <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-4 text-sm text-green-400 md:col-span-2">
            {ok}
          </div>
        )}

        <div className="md:col-span-2">
          <button 
            disabled={isSubmitting} 
            className="w-full rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed md:w-auto md:px-12"
          >
            {isSubmitting ? "Enviando..." : "Enviar aplicação"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  full,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="mb-2 block text-sm font-medium text-white">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

