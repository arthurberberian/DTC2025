# Configuração de Segurança - Supabase

Este documento contém instruções para configurar as proteções de segurança adicionais no Supabase.

## 🔒 1. Habilitar Leaked Password Protection

A proteção de senhas vazadas impede que usuários usem senhas que já foram expostas em vazamentos de dados públicos.

### Passos para Habilitar:

1. **Acesse o Dashboard do Supabase:**
   - URL: https://supabase.com/dashboard/project/xeqlgsrgoumsacuoopfx

2. **Navegue até Authentication > Settings:**
   - No menu lateral, clique em **Authentication**
   - Depois clique em **Settings** (ou **Configurações**)

3. **Localize a seção "Security":**
   - Role até encontrar **"Leaked Password Protection"**

4. **Habilite a proteção:**
   - Clique no toggle/switch para **ENABLE** (Habilitar)
   - A proteção será ativada imediatamente

5. **Salve as alterações:**
   - Clique em **Save** (Salvar) se necessário

### O que isso faz?

Quando habilitado, o Supabase verifica automaticamente se a senha fornecida durante o registro ou alteração de senha está presente em bancos de dados de senhas vazadas (como o [Have I Been Pwned](https://haveibeenpwned.com/)).

Se a senha estiver comprometida, o usuário receberá um erro e será solicitado a escolher uma senha diferente.

### Benefícios:

- ✅ Protege contra ataques de credential stuffing
- ✅ Melhora a segurança geral das contas
- ✅ Reduz o risco de comprometimento de contas
- ✅ Conformidade com melhores práticas de segurança

---

## 🛡️ 2. Rate Limiting (Já Implementado)

O rate limiting foi implementado via migração SQL e está ativo automaticamente após aplicar as migrações.

### Limites Configurados:

- **Por IP:** 3 submissões por hora
- **Por E-mail:** 2 submissões por 24 horas

### Como funciona:

1. Cada tentativa de submissão é registrada na tabela `submission_attempts`
2. Um trigger verifica automaticamente os limites antes de permitir a inserção
3. Se o limite for excedido, a submissão é bloqueada com mensagem de erro
4. Registros antigos são limpos automaticamente após 7 dias

### Testando o Rate Limiting:

```bash
# Tente enviar o formulário 4 vezes seguidas
# A 4ª tentativa deve ser bloqueada com erro
```

---

## 📊 3. Aplicar Migrações

Para aplicar as migrações de segurança ao banco de dados:

### Opção A: Via Supabase CLI (Recomendado)

```bash
# 1. Instalar Supabase CLI (se ainda não tiver)
npm install -g supabase

# 2. Login no Supabase
supabase login

# 3. Link com o projeto
supabase link --project-ref xeqlgsrgoumsacuoopfx

# 4. Aplicar migrações
supabase db push
```

### Opção B: Via Dashboard do Supabase

1. Acesse: https://supabase.com/dashboard/project/xeqlgsrgoumsacuoopfx/sql
2. Abra o arquivo `supabase/migrations/20251021200000_rate_limiting_protection.sql`
3. Copie todo o conteúdo
4. Cole no SQL Editor do Supabase
5. Clique em **Run** (Executar)

---

## ✅ 4. Verificar Configurações

### Checklist de Segurança:

- [ ] Leaked Password Protection habilitado
- [ ] Migração de rate limiting aplicada
- [ ] RLS (Row Level Security) ativo em todas as tabelas
- [ ] Políticas de acesso configuradas corretamente
- [ ] Honeypot anti-bot ativo no formulário
- [ ] Validação de tempo de preenchimento ativa
- [ ] HTTPS habilitado (padrão no Supabase)

### Testar Segurança:

1. **Teste de Rate Limiting:**
   - Envie o formulário 4 vezes seguidas
   - A 4ª deve ser bloqueada

2. **Teste de Senha Vazada:**
   - Tente criar conta com senha comum (ex: "password123")
   - Deve ser rejeitada

3. **Teste de RLS:**
   - Tente acessar `/admin` sem login
   - Deve redirecionar para `/auth`

---

## 🚨 5. Monitoramento

### Logs de Submissões:

Para visualizar tentativas de submissão bloqueadas:

```sql
-- Ver tentativas recentes
SELECT * FROM public.submission_attempts
ORDER BY attempted_at DESC
LIMIT 100;

-- Ver IPs bloqueados
SELECT identifier, COUNT(*) as attempts
FROM public.submission_attempts
WHERE attempt_type = 'ip'
  AND attempted_at > now() - interval '1 hour'
GROUP BY identifier
HAVING COUNT(*) >= 3;

-- Ver e-mails bloqueados
SELECT identifier, COUNT(*) as attempts
FROM public.submission_attempts
WHERE attempt_type = 'email'
  AND attempted_at > now() - interval '24 hours'
GROUP BY identifier
HAVING COUNT(*) >= 2;
```

### Limpeza Manual (se necessário):

```sql
-- Limpar tentativas antigas
SELECT public.cleanup_old_submission_attempts();

-- Limpar tentativas de um IP específico (em caso de falso positivo)
DELETE FROM public.submission_attempts
WHERE identifier = '192.168.1.1';
```

---

## 📞 Suporte

Se encontrar problemas ou tiver dúvidas sobre a configuração de segurança:

1. Verifique os logs no Supabase Dashboard
2. Consulte a documentação oficial: https://supabase.com/docs/guides/auth
3. Abra uma issue no repositório GitHub

---

## 📝 Notas Importantes

- **Backup:** Sempre faça backup do banco antes de aplicar migrações
- **Testes:** Teste em ambiente de desenvolvimento antes de aplicar em produção
- **Monitoramento:** Configure alertas para detectar tentativas de ataque
- **Atualizações:** Mantenha o Supabase e dependências sempre atualizados

---

**Última atualização:** 21 de outubro de 2025

