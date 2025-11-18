import { useState, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationFormSchema, type ApplicationFormInput } from "@/lib/schemas";
import { track } from "@/lib/track";
import { toast } from "sonner";
import { submitCompleteApplication } from "@/lib/hooks/useApplicationSubmit";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User, Calendar, Mail, Phone, MessageSquareText, GraduationCap, BriefcaseBusiness,
  Target, AlertTriangle, History, Wallet, CalendarClock, CheckCircle2, XCircle
} from "lucide-react";

// Floating Input Component
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  icon?: React.ElementType;
  error?: string;
  isValid?: boolean;
};

function FloatInput({ id, label, icon: Icon, error, isValid, className = "", ...rest }: InputProps) {
  return (
    <div className="relative group">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 transition-all duration-300 group-focus-within:text-[#C46D37] group-focus-within:scale-110" />
      )}
      <input
        id={id}
        placeholder=" "
        className={[
          "peer w-full rounded-xl border px-3 py-3 text-[15px] text-white",
          Icon ? "pl-9" : "",
          "bg-white/[0.04] border-white/10 shadow-sm outline-none transition-all duration-300",
          "focus:border-[#C46D37]/60 focus:ring-4 focus:ring-[#C46D37]/20 focus:bg-white/[0.06]",
          "hover:border-white/20 hover:bg-white/[0.05]",
          "placeholder-transparent",
          isValid && !error && "border-green-500/40 bg-green-500/5",
          error && "border-red-500/60 ring-2 ring-red-500/20",
          className,
        ].join(" ")}
        {...rest}
      />
      
      {/* Validation Icons */}
      {isValid && !error && (
        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-400 animate-in zoom-in-50 duration-200" />
      )}
      {error && (
        <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-400 animate-in zoom-in-50 duration-200" />
      )}
      
      <label
        htmlFor={id}
        className={[
          "pointer-events-none absolute",
          Icon ? "left-9" : "left-3",
          "top-1/2 -translate-y-1/2 text-sm text-white/60 transition-all duration-200",
          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm",
          "peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#C46D37]",
          "peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs",
        ].join(" ")}
      >
        {label}
      </label>
      {error && <p className="mt-1.5 text-xs text-red-400 animate-in fade-in-50">{error}</p>}
    </div>
  );
}

// Floating Textarea Component
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  icon?: React.ElementType;
  error?: string;
  isValid?: boolean;
  maxLength?: number;
};

function FloatTextarea({ id, label, icon: Icon, error, isValid, maxLength, className = "", ...rest }: TextareaProps) {
  const [charCount, setCharCount] = useState(0);
  
  return (
    <div className="relative group">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-white/50 transition-all duration-300 group-focus-within:text-[#C46D37] group-focus-within:scale-110" />
      )}
      <textarea
        id={id}
        placeholder=" "
        maxLength={maxLength}
        onChange={(e) => {
          setCharCount(e.target.value.length);
          rest.onChange?.(e);
        }}
        className={[
          "peer w-full rounded-xl border px-3 py-3 text-[15px] text-white min-h-28 resize-y",
          Icon ? "pl-9" : "",
          "bg-white/[0.04] border-white/10 shadow-sm outline-none transition-all duration-300",
          "focus:border-[#C46D37]/60 focus:ring-4 focus:ring-[#C46D37]/20 focus:bg-white/[0.06]",
          "hover:border-white/20 hover:bg-white/[0.05]",
          "placeholder-transparent",
          isValid && !error && "border-green-500/40 bg-green-500/5",
          error && "border-red-500/60 ring-2 ring-red-500/20",
          className,
        ].join(" ")}
        {...rest}
      />
      
      {/* Validation Icons */}
      {isValid && !error && (
        <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-400 animate-in zoom-in-50 duration-200" />
      )}
      {error && (
        <XCircle className="absolute right-3 top-3 h-4 w-4 text-red-400 animate-in zoom-in-50 duration-200" />
      )}
      
      <label
        htmlFor={id}
        className={[
          "pointer-events-none absolute",
          Icon ? "left-9" : "left-3",
          "top-3 text-sm text-white/60 transition-all duration-200",
          "peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#C46D37]",
          "peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs",
        ].join(" ")}
      >
        {label}
      </label>
      
      {/* Character Counter */}
      {maxLength && (
        <div className="absolute right-3 bottom-2 text-xs text-white/40">
          {charCount}/{maxLength}
        </div>
      )}
      
      {error && <p className="mt-1.5 text-xs text-red-400 animate-in fade-in-50">{error}</p>}
    </div>
  );
}

// Floating Select Component
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  icon?: React.ElementType;
  error?: string;
  isValid?: boolean;
  children: React.ReactNode;
};

function FloatSelect({ id, label, icon: Icon, error, isValid, className = "", children, ...rest }: SelectProps) {
  return (
    <div className="relative group">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 transition-all duration-300 group-focus-within:text-[#C46D37] group-focus-within:scale-110" />
      )}
      <select
        id={id}
        defaultValue=""
        className={[
          "peer w-full appearance-none rounded-xl border px-3 py-3 text-[15px] text-white",
          Icon ? "pl-9 pr-10" : "pr-10",
          "bg-white/[0.04] border-white/10 shadow-sm outline-none transition-all duration-300",
          "focus:border-[#C46D37]/60 focus:ring-4 focus:ring-[#C46D37]/20 focus:bg-white/[0.06]",
          "hover:border-white/20 hover:bg-white/[0.05]",
          isValid && !error && "border-green-500/40 bg-green-500/5",
          error && "border-red-500/60 ring-2 ring-red-500/20",
          className,
        ].join(" ")}
        {...rest}
      >
        <option value="" disabled hidden> </option>
        {children}
      </select>
      
      {/* Dropdown Arrow */}
      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      
      {/* Validation Icons */}
      {isValid && !error && (
        <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 text-green-400 animate-in zoom-in-50 duration-200" />
      )}
      {error && (
        <XCircle className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 text-red-400 animate-in zoom-in-50 duration-200" />
      )}
      
      <label
        htmlFor={id}
        className={[
          "pointer-events-none absolute",
          Icon ? "left-9" : "left-3",
          "top-1/2 -translate-y-1/2 text-sm text-white/60 transition-all duration-200",
          "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-[#C46D37]",
          "peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs",
        ].join(" ")}
      >
        {label}
      </label>
      {error && <p className="mt-1.5 text-xs text-red-400 animate-in fade-in-50">{error}</p>}
    </div>
  );
}

// Section Chip Component
function SectionChip({ n, total, title }: { n: number; total: number; title: string }) {
  return (
    <div className="flex items-center gap-2 animate-in fade-in-50 slide-in-from-left-5 duration-500">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-white/85">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-[#C46D37] text-[11px] text-white animate-in zoom-in-50 duration-300">
          {n}
        </span>
        {title}
        <span className="ml-1 text-white/50">({n}/{total})</span>
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
}

interface ApplyFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ApplyFormModal({ open, onOpenChange }: ApplyFormModalProps) {
  const startRef = useRef<number>(Date.now());
  const [ok, setOk] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ApplicationFormInput>({
    resolver: zodResolver(ApplicationFormSchema),
    defaultValues: { satisfactionLevel: 50, consentLGPD: false },
  });

  // Progress calculation
  const requiredKeys: (keyof ApplicationFormInput)[] = [
    "fullName","age","email","phone","howDidYouKnow",
    "mainEducation","currentMoment","top3Challenges","mainGoal",
    "consequencesIfNotSolved","previousMentorship","investmentWillingness",
    "wantsStrategicSession"
  ];
  const watched = watch(requiredKeys);
  const progress = useMemo(() => {
    const filled = watched.filter(v =>
      typeof v === "number" ? true : !!String(v ?? "").trim()
    ).length;
    return Math.round((filled / requiredKeys.length) * 100);
  }, [watched]);

  const satisfactionLevel = watch("satisfactionLevel");
  
  // Track field completion for validation icons
  const allWatched = watch();
  const isFieldValid = (fieldName: keyof ApplicationFormInput) => {
    const value = allWatched[fieldName];
    return !errors[fieldName] && value && String(value).trim() !== "";
  };

  async function onSubmit(data: ApplicationFormInput) {
    setOk(null);
    const elapsed = Date.now() - startRef.current;
    
    if (elapsed < 8000) {
      toast.error("Por favor, revise suas respostas antes de enviar.");
      return;
    }

    track("apply_started", { page: "mentoria_tdah" });

    try {
      await submitCompleteApplication(data);
      
      track("apply_submitted", { page: "mentoria_tdah" });
      setOk("Aplicação recebida! Nossa equipe entrará em contato por WhatsApp/E-mail.");
      toast.success("Aplicação enviada com sucesso!");
      
      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        reset();
        onOpenChange(false);
        setOk(null);
      }, 3000);
    } catch (e: any) {
      toast.error("Não foi possível enviar sua aplicação agora. Tente novamente.");
      track("apply_error", { page: "mentoria_tdah", message: e?.message });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          dark max-w-3xl max-h-[90vh] p-0 overflow-hidden
          rounded-2xl border border-white/10
          bg-[#0D0F12]/90 backdrop-blur-xl
          shadow-[0_30px_80px_-20px_rgba(0,0,0,.55)]
          animate-in fade-in-50 zoom-in-95 duration-300
        "
      >
        <div className="absolute inset-0 pointer-events-none opacity-[.12] bg-[radial-gradient(1200px_400px_at_100%_-10%,#C46D37_0%,transparent_55%)]" />
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6 md:p-8 relative z-10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-extrabold text-white md:text-3xl tracking-tight">
                Aplicação para a Mentoria em TDAH na Clínica
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-white/70">
                Preencha com atenção. Usamos suas respostas para entender seu momento e confirmar o encaixe com a mentoria.
              </DialogDescription>

              {/* Progress Bar */}
              <div className="mt-5">
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C46D37] via-[#E7A06B] to-[#F4C39A] transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                    aria-label="Progresso do preenchimento"
                  />
                </div>
                <div className="mt-1 text-right text-xs text-white/60 animate-in fade-in-50">
                  {progress}% completo
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-10">
              {/* SEÇÃO 1: Informações de Contato */}
              <SectionChip n={1} total={3} title="Informações de Contato" />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FloatInput 
                  id="fullName" 
                  label="Nome Completo*" 
                  icon={User}
                  error={errors.fullName?.message}
                  isValid={isFieldValid("fullName")}
                  {...register("fullName")} 
                />

                <FloatInput 
                  id="age" 
                  type="number" 
                  label="Idade*" 
                  icon={Calendar}
                  min={18} 
                  max={100}
                  error={errors.age?.message}
                  isValid={isFieldValid("age")}
                  {...register("age", { valueAsNumber: true })} 
                />

                <FloatInput 
                  id="email" 
                  type="email" 
                  label="E-mail*" 
                  icon={Mail}
                  error={errors.email?.message}
                  isValid={isFieldValid("email")}
                  {...register("email")} 
                />

                <FloatInput 
                  id="phone" 
                  label="Telefone (WhatsApp)*" 
                  icon={Phone}
                  error={errors.phone?.message}
                  isValid={isFieldValid("phone")}
                  {...register("phone")} 
                />

                <div className="md:col-span-2">
                  <FloatTextarea 
                    id="howDidYouKnow" 
                    label="Como conheceu nosso trabalho?*"
                    icon={MessageSquareText}
                    maxLength={500}
                    error={errors.howDidYouKnow?.message}
                    isValid={isFieldValid("howDidYouKnow")}
                    {...register("howDidYouKnow")} 
                  />
                </div>
              </div>

              {/* SEÇÃO 2: Área de Atuação */}
              <SectionChip n={2} total={3} title="Área de Atuação" />

              <div className="space-y-6">
                <FloatSelect 
                  id="mainEducation" 
                  label="Qual é a sua formação principal?*" 
                  icon={GraduationCap}
                  error={errors.mainEducation?.message}
                  isValid={isFieldValid("mainEducation")}
                  {...register("mainEducation")}
                >
                  <option>Psicologia</option>
                  <option>Neuropsicologia</option>
                  <option>Terapia Cognitiva-Comportamental</option>
                  <option>Psicopedagogia</option>
                  <option>Fonoaudiologia</option>
                  <option>Terapia Ocupacional</option>
                  <option>Outra</option>
                </FloatSelect>

                <FloatSelect 
                  id="currentMoment" 
                  label="Qual opção melhor descreve seu momento atual?*" 
                  icon={BriefcaseBusiness}
                  error={errors.currentMoment?.message}
                  isValid={isFieldValid("currentMoment")}
                  {...register("currentMoment")}
                >
                  <option>Trabalho autônomo/consultório próprio</option>
                  <option>CLT em clínica/instituição</option>
                  <option>Ambos (CLT + autônomo)</option>
                  <option>Estudante/recém-formado</option>
                  <option>Em transição de carreira</option>
                </FloatSelect>

                {/* Custom Slider */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/90">
                    Você está satisfeito(a) com os resultados que alcança em sua prática? ({satisfactionLevel}%)
                  </label>
                  <input
                    type="range" 
                    min={0} 
                    max={100}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 transition-all duration-200"
                    {...register("satisfactionLevel", { valueAsNumber: true })}
                  />
                  <div className="mt-1 flex justify-between text-xs text-white/60">
                    <span>0% - Nada satisfeito</span>
                    <span>100% - Totalmente satisfeito</span>
                  </div>
                  {errors.satisfactionLevel?.message && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.satisfactionLevel.message}</p>
                  )}
                </div>

                <FloatTextarea 
                  id="top3Challenges" 
                  label="Maiores desafios na prática ou na carreira?*" 
                  icon={AlertTriangle}
                  maxLength={1000}
                  error={errors.top3Challenges?.message}
                  isValid={isFieldValid("top3Challenges")}
                  {...register("top3Challenges")} 
                />

                <FloatSelect 
                  id="mainGoal" 
                  label="Seu principal objetivo com a mentoria?*" 
                  icon={Target}
                  error={errors.mainGoal?.message}
                  isValid={isFieldValid("mainGoal")}
                  {...register("mainGoal")}
                >
                  <option>Aumentar segurança técnica nos atendimentos</option>
                  <option>Ampliar minha base de pacientes</option>
                  <option>Me tornar referência/especialista reconhecido</option>
                  <option>Criar protocolos e padronizar meu trabalho</option>
                  <option>Gerenciar melhor minha clínica/consultório</option>
                  <option>Outro objetivo</option>
                </FloatSelect>

                <FloatTextarea 
                  id="consequencesIfNotSolved" 
                  label="E se isso não for resolvido no próximo ano?*" 
                  icon={History}
                  maxLength={1000}
                  error={errors.consequencesIfNotSolved?.message}
                  isValid={isFieldValid("consequencesIfNotSolved")}
                  {...register("consequencesIfNotSolved")} 
                />
              </div>

              {/* SEÇÃO 3: Intenção e Comprometimento */}
              <SectionChip n={3} total={3} title="Intenção e Comprometimento" />

              <div className="space-y-6">
                <FloatTextarea 
                  id="previousMentorship" 
                  label="Já participou de mentoria/curso avançado? Como foi?*"
                  icon={History}
                  maxLength={1000}
                  error={errors.previousMentorship?.message}
                  isValid={isFieldValid("previousMentorship")}
                  {...register("previousMentorship")} 
                />

                <FloatTextarea 
                  id="investmentWillingness" 
                  label="Custo de não resolver + investimento que considera justo?*"
                  icon={Wallet}
                  maxLength={1000}
                  error={errors.investmentWillingness?.message}
                  isValid={isFieldValid("investmentWillingness")}
                  {...register("investmentWillingness")} 
                />

                <FloatSelect 
                  id="wantsStrategicSession" 
                  label="Gostaria de agendar uma sessão estratégica gratuita?*"
                  icon={CalendarClock}
                  error={errors.wantsStrategicSession?.message}
                  isValid={isFieldValid("wantsStrategicSession")}
                  {...register("wantsStrategicSession")}
                >
                  <option>Sim, tenho interesse na sessão estratégica!</option>
                  <option>Gostaria de tirar algumas dúvidas antes</option>
                </FloatSelect>
              </div>

              {/* LGPD */}
              <div className="flex items-start gap-3">
                <input
                  id="lgpd"
                  type="checkbox"
                  className="mt-1 h-4 w-4 cursor-pointer rounded border-white/20 bg-white/5 text-[#C46D37] focus:ring-[#C46D37] transition-all duration-200"
                  {...register("consentLGPD")}
                />
                <label htmlFor="lgpd" className="text-sm text-white/85">
                  Concordo em fornecer meus dados para avaliação da aplicação, conforme a{" "}
                  <a className="font-medium text-[#E7A06B] underline hover:text-[#F4C39A] transition-colors" href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">
                    Política de Privacidade
                  </a>.
                </label>
              </div>
              {errors.consentLGPD?.message && (
                <p className="text-xs text-red-400 animate-in fade-in-50">{String(errors.consentLGPD.message)}</p>
              )}

              {/* Success Message */}
              {ok && (
                <div className="rounded-xl bg-[#C46D37]/15 border border-[#C46D37]/30 p-4 text-sm text-[#E7A06B] animate-in fade-in-50 slide-in-from-top-2">
                  {ok}
                </div>
              )}

              {/* Submit Button with Shine Effect */}
              <div>
                <button
                  disabled={isSubmitting}
                  className="
                    group relative w-full rounded-xl bg-gradient-to-b from-[#C96F3C] to-[#A2542F]
                    px-6 py-3 text-base font-semibold text-white shadow-lg
                    ring-1 ring-[#8F3B18]/70
                    hover:from-[#CF7644] hover:to-[#954A29]
                    transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                    overflow-hidden
                  "
                >
                  <span className="relative z-10">{isSubmitting ? "Enviando..." : "Enviar aplicação"}</span>
                  {/* Shine Effect */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.25),transparent)] group-hover:translate-x-full transition-transform duration-700" />
                </button>
                <p className="mt-2 text-center text-xs text-white/50">
                  Analisamos cada aplicação cuidadosamente. Retorno em até 2 dias úteis.
                </p>
              </div>
            </form>
          </div>
        </ScrollArea>

        {/* Custom Range Slider Styles */}
        <style>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px; 
            height: 18px; 
            border-radius: 9999px;
            background: #C46D37; 
            border: 2px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 2px 8px rgba(196, 109, 55, 0.45);
            cursor: pointer;
            transition: all 0.2s ease;
          }
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(196, 109, 55, 0.6);
          }
          input[type="range"]::-moz-range-thumb {
            width: 18px; 
            height: 18px; 
            border-radius: 9999px;
            background: #C46D37; 
            border: 2px solid rgba(255, 255, 255, 0.2);
            cursor: pointer;
            transition: all 0.2s ease;
          }
          input[type="range"]::-moz-range-thumb:hover {
            transform: scale(1.1);
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
