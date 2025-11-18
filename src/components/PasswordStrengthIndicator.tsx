import { getPasswordStrength, getPasswordRequirements } from "@/lib/passwordValidation";
import { CheckCircle2, Circle } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const strength = getPasswordStrength(password);
  const requirements = getPasswordRequirements(password);

  return (
    <div className="space-y-2 text-sm">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Força da senha:</span>
          <span className="font-medium" style={{ color: strength.color }}>
            {strength.label}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full transition-all duration-300"
            style={{ 
              width: `${strength.percentage}%`,
              backgroundColor: strength.color 
            }}
          />
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Requisitos:</p>
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            {req.met ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <Circle className="h-3.5 w-3.5 text-muted-foreground" />
            )}
            <span className={req.met ? "text-green-600" : "text-muted-foreground"}>
              {req.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
