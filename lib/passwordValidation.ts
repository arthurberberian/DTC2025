import { z } from 'zod';

export const passwordSchema = z.string()
  .min(12, "Senha deve ter no mínimo 12 caracteres")
  .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "Deve conter pelo menos um número")
  .regex(/[^A-Za-z0-9]/, "Deve conter pelo menos um caractere especial");

export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  percentage: number;
}

export function getPasswordStrength(password: string): PasswordStrength {
  let score = 0;
  
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  const percentage = Math.round((score / 6) * 100);
  
  if (score <= 2) return { score, label: 'Fraca', color: 'hsl(var(--destructive))', percentage };
  if (score <= 4) return { score, label: 'Média', color: 'hsl(48 96% 53%)', percentage };
  return { score, label: 'Forte', color: 'hsl(142 76% 36%)', percentage };
}

export function getPasswordRequirements(password: string): Array<{ met: boolean; text: string }> {
  return [
    { met: password.length >= 12, text: 'Mínimo 12 caracteres' },
    { met: /[A-Z]/.test(password), text: 'Letra maiúscula' },
    { met: /[a-z]/.test(password), text: 'Letra minúscula' },
    { met: /[0-9]/.test(password), text: 'Número' },
    { met: /[^A-Za-z0-9]/.test(password), text: 'Caractere especial (!@#$...)' },
  ];
}
