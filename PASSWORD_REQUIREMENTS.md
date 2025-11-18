# Fortalecimento de Requisitos de Senha

**Data:** 21 de outubro de 2025  
**Projeto:** arthurberberian/mentoria-tdah-landing  
**Objetivo:** Corrigir o problema "Weak Password Requirements Enable Easy Account Compromise"

---

## 🔐 Problema Identificado

O Supabase Security Scanner identificou que os requisitos de senha atuais são fracos e podem permitir comprometimento fácil de contas.

### Configuração Atual:
- **Mínimo de caracteres:** 6
- **Requisitos de complexidade:** Nenhum
- **HIBP Check:** ✅ Habilitado (correção anterior)

---

## ✅ Solução Implementada

### 1. **Aumentar Mínimo de Caracteres**

**Configuração Recomendada:**
- **Mínimo de caracteres:** 8 (em vez de 6)

**Como Configurar:**

1. Acesse o Dashboard do Supabase (via Lovable)
2. Vá em **Users > Auth settings > Email Settings**
3. Localize **"Minimum Password Length"**
4. Altere de `6` para `8`
5. Salve as alterações

---

### 2. **Requisitos de Complexidade (Opcional)**

O Supabase não oferece configuração nativa de complexidade de senha (ex: exigir maiúsculas, números, símbolos).

**Alternativas:**

#### **Opção A: Validação no Frontend (Recomendado)**

Adicionar validação no formulário de cadastro para exigir:
- Pelo menos 1 letra maiúscula
- Pelo menos 1 letra minúscula
- Pelo menos 1 número
- Pelo menos 1 caractere especial

**Implementação:**

Atualizar o schema de validação em `src/lib/schemas.ts`:

```typescript
password: z.string()
  .min(8, "Senha deve ter no mínimo 8 caracteres")
  .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "Senha deve conter pelo menos um número")
  .regex(/[^A-Za-z0-9]/, "Senha deve conter pelo menos um caractere especial"),
```

#### **Opção B: Validação via Edge Function**

Criar uma Edge Function no Supabase que valida a senha antes de permitir o cadastro.

**Vantagens:**
- Validação server-side (mais segura)
- Não pode ser bypassada

**Desvantagens:**
- Mais complexo de implementar
- Requer configuração adicional

---

## 🎯 Recomendação Final

### **Configuração Ideal para Seu Caso:**

Como você terá apenas **1 admin e 1 closer**, e ambos serão criados **manualmente por você**, a configuração atual já é suficiente:

1. ✅ **Mínimo de 8 caracteres** (configure no Dashboard)
2. ✅ **HIBP Check habilitado** (já feito)
3. ✅ **Disable Sign-up habilitado** (já feito)

**Por quê isso é suficiente?**

- Você criará as contas manualmente
- Você pode escolher senhas fortes ao criar
- Não há risco de usuários criarem senhas fracas
- HIBP Check já bloqueia senhas comprometidas

---

## 📋 Checklist de Implementação

### **Ações Necessárias:**

- [ ] Acessar Dashboard do Supabase (via Lovable)
- [ ] Ir em Users > Auth settings > Email Settings
- [ ] Alterar "Minimum Password Length" de 6 para 8
- [ ] Salvar alterações
- [ ] Rodar novo Security Scan
- [ ] Verificar se problema foi resolvido

### **Ações Opcionais (se quiser mais segurança):**

- [ ] Implementar validação de complexidade no frontend
- [ ] Adicionar indicador de força de senha
- [ ] Criar política de rotação de senhas (ex: trocar a cada 90 dias)
- [ ] Implementar 2FA (autenticação de dois fatores)

---

## 🔍 Como Testar

### **Teste 1: Mínimo de Caracteres**

1. Tente criar uma conta com senha de 7 caracteres
2. Deve ser rejeitada com erro
3. Tente com 8 caracteres
4. Deve ser aceita

### **Teste 2: HIBP Check**

1. Tente criar conta com senha comum (ex: "password123")
2. Deve ser rejeitada (senha comprometida)
3. Tente com senha forte (ex: "X9$mK2!pL7@qR4")
4. Deve ser aceita

---

## 📊 Comparação: Antes vs Depois

| Aspecto | Antes | Depois |
|---------|-------|--------|
| **Mínimo de caracteres** | 6 | 8 |
| **HIBP Check** | ❌ Desabilitado | ✅ Habilitado |
| **Sign-up público** | ✅ Habilitado | ❌ Desabilitado |
| **Complexidade** | Nenhuma | Opcional (frontend) |
| **Nível de segurança** | ⚠️ Médio | ✅ Alto |

---

## 💡 Dicas de Segurança

### **Para Você (Admin):**

1. **Use senha forte e única** para sua conta admin
2. **Não compartilhe** a senha com ninguém
3. **Use gerenciador de senhas** (ex: 1Password, Bitwarden)
4. **Habilite 2FA** se disponível
5. **Troque a senha periodicamente** (a cada 3-6 meses)

### **Para a Closer:**

1. **Crie senha forte** ao criar a conta dela
2. **Envie por canal seguro** (não por WhatsApp ou e-mail)
3. **Instrua a trocar** a senha no primeiro login
4. **Oriente sobre boas práticas** de segurança

---

## 🚨 Senhas Fortes: Exemplos

### **❌ Senhas Fracas (NÃO USE):**
- `123456`
- `password`
- `mentoria123`
- `tdah2024`
- `admin123`

### **✅ Senhas Fortes (USE):**
- `X9$mK2!pL7@qR4`
- `Td@h#M3nt0r!a2025`
- `C10s3r$Seg@ur0`
- `P$yc0!M3nt0r#2025`

### **💡 Como Criar Senha Forte:**

1. **Use 12+ caracteres**
2. **Misture:** maiúsculas, minúsculas, números, símbolos
3. **Evite:** palavras do dicionário, datas, nomes
4. **Use frases:** transforme em senha (ex: "Minha mentoria é segura!" → `M!m3nt0r!@#S3g`)
5. **Use gerenciador:** deixe ele gerar senhas aleatórias

---

## 🔗 Referências

- [OWASP Password Strength](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [NIST Password Guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html)
- [Have I Been Pwned](https://haveibeenpwned.com/)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)

---

## 📞 Suporte

Se tiver dúvidas sobre configuração de senhas ou segurança:

1. Consulte a documentação do Supabase
2. Verifique os logs de erro no Dashboard
3. Entre em contato com suporte do Lovable/Supabase

---

**Documento criado por:** Manus AI  
**Data:** 21 de outubro de 2025  
**Versão:** 1.0

