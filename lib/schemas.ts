import { z } from "zod";

export const ApplicationCreateSchema = z.object({
  candidateName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  candidateEmail: z.string().email("E-mail inválido"),
  candidatePhone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  candidateAge: z.coerce.number().int().min(18, "Idade mínima: 18 anos").max(100),
  professionalArea: z.string().min(1, "Selecione sua área de atuação"),
  experienceLevel: z.string().min(1, "Selecione seu tempo de experiência"),
  mainChallenge: z.string().min(5, "Descreva seu desafio com pelo menos 5 caracteres"),
  mainGoal: z.string().min(5, "Descreva seu objetivo com pelo menos 5 caracteres"),
  investmentWillingness: z.string().min(5, "Por favor, compartilhe sua reflexão (mínimo 5 caracteres)"),
  commitmentScore: z.number().min(0).max(10),
  consentLGPD: z.boolean().refine((val) => val === true, {
    message: "Você precisa concordar com a política de privacidade",
  }),
});

export type ApplicationCreateInput = z.infer<typeof ApplicationCreateSchema>;

export const ApplicationFormSchema = z.object({
  // Seção 1: Informações de Contato
  fullName: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().trim().email("E-mail inválido"),
  phone: z.string().trim().regex(/^\d{10,15}$/, "Telefone inválido (use DDD + número)"),
  age: z.coerce.number()
    .int()
    .min(18, "Idade mínima: 18 anos")
    .max(100, "Idade máxima: 100 anos")
    .refine((v) => !Number.isNaN(v), { message: "Informe uma idade válida" }),

  // Seção 2: Diagnóstico Profissional
  mainEducation: z.enum([
    "Psicologia",
    "Neuropsicologia",
    "Terapia Cognitiva-Comportamental",
    "Psicopedagogia",
    "Fonoaudiologia",
    "Terapia Ocupacional",
    "Outra"
  ], {
    errorMap: () => ({ message: "Selecione sua formação principal" })
  }),
  
  currentMoment: z.enum([
    "Trabalho autônomo/consultório próprio",
    "CLT em clínica/instituição",
    "Ambos (CLT + autônomo)",
    "Estudante/recém-formado",
    "Em transição de carreira"
  ], {
    errorMap: () => ({ message: "Selecione seu momento atual" })
  }),

  satisfactionLevel: z.number()
    .min(0, "Escolha um valor entre 0 e 100")
    .max(100, "Escolha um valor entre 0 e 100"),

  top3Challenges: z.string()
    .min(8, "Mínimo 8 caracteres"),

  mainGoal: z.enum([
    "Aumentar segurança técnica nos atendimentos",
    "Ampliar minha base de pacientes",
    "Me tornar referência/especialista reconhecido",
    "Criar protocolos e padronizar meu trabalho",
    "Gerenciar melhor minha clínica/consultório",
    "Outro objetivo"
  ], {
    errorMap: () => ({ message: "Selecione seu principal objetivo" })
  }),

  consequencesIfNotSolved: z.string()
    .min(8, "Mínimo 8 caracteres"),

  // Seção 3: Intenção e Comprometimento
  previousMentorship: z.string()
    .min(8, "Mínimo 8 caracteres"),

  investmentWillingness: z.string()
    .min(8, "Mínimo 8 caracteres"),

  wantsStrategicSession: z.enum([
    "Sim, tenho interesse na sessão estratégica!",
    "Gostaria de tirar algumas dúvidas antes"
  ], {
    errorMap: () => ({ message: "Escolha uma opção" })
  }),

  // Campos técnicos
  consentLGPD: z.boolean().refine((val) => val === true, {
    message: "Você precisa concordar com a política de privacidade",
  }),
});

export type ApplicationFormInput = z.infer<typeof ApplicationFormSchema>;
