# 🔐 Variáveis de Ambiente

## 📋 Lista Completa de Variáveis

### 🗄️ DATABASE

| Variável | Obrigatória | Descrição | Exemplo |
|----------|-------------|-----------|---------|
| `DATABASE_URL` | ✅ Sim | URL de conexão com o banco de dados | `postgresql://user:pass@host:5432/db` |

**Valores por ambiente:**
- **Desenvolvimento (SQLite)**: `file:./dev.db`
- **Produção (PostgreSQL)**: `postgresql://bankme:bankme_password@host:5432/bankme_db`
- **Docker Compose**: `postgresql://bankme:bankme_password@postgres:5432/bankme_db`
- **Render**: Gerado automaticamente pelo serviço PostgreSQL

---

### 🚀 APPLICATION

| Variável | Obrigatória | Padrão | Descrição | Exemplo |
|----------|-------------|--------|-----------|---------|
| `NODE_ENV` | ❌ Não | `development` | Ambiente de execução | `production` |
| `PORT` | ❌ Não | `3000` | Porta do servidor | `3000` |

**Valores válidos para NODE_ENV:**
- `development` - Desenvolvimento local
- `production` - Produção
- `test` - Testes

---

### 🔑 JWT (Authentication)

| Variável | Obrigatória | Padrão | Descrição | Exemplo |
|----------|-------------|--------|-----------|---------|
| `JWT_PASS` | ✅ Sim | - | Secret para assinar tokens JWT | `a1b2c3d4e5f6...` |
| `JWT_EXPIRATION` | ❌ Não | - | Tempo de expiração do token | `1d`, `7d`, `24h` |

**⚠️ IMPORTANTE:** 
- O `JWT_PASS` deve ser uma string **aleatória e segura**
- Nunca compartilhe ou commite o valor real
- Use senhas diferentes para dev e produção

**Gerar JWT_PASS seguro:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Exemplos de JWT_EXPIRATION:**
- `1d` - 1 dia
- `7d` - 7 dias
- `24h` - 24 horas
- `30m` - 30 minutos

---

### 🔴 REDIS (Queue/Cache)

| Variável | Obrigatória | Padrão | Descrição | Exemplo |
|----------|-------------|--------|-----------|---------|
| `REDIS_HOST` | ❌ Não | `localhost` | Host do servidor Redis | `localhost` |
| `REDIS_PORT` | ❌ Não | `6379` | Porta do servidor Redis | `6379` |

**Uso:** 
- Sistema de filas com BullMQ
- Processamento de batch de payables

**Onde é usado:**
- `src/payable/payable.module.ts` - Configuração das filas

---

## 🌍 Configuração por Ambiente

### 💻 Desenvolvimento Local

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL=file:./dev.db
NODE_ENV=development
PORT=3000
JWT_PASS=dev-secret-change-this
JWT_EXPIRATION=1d
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 🐳 Docker Compose

```env
DATABASE_URL=postgresql://bankme:bankme_password@postgres:5432/bankme_db
NODE_ENV=production
PORT=3000
JWT_PASS=docker-secret-change-this
JWT_EXPIRATION=1d
REDIS_HOST=redis
REDIS_PORT=6379
```

### ☁️ Render (Produção)

O Render configura automaticamente via Blueprint (`render.yaml`):

```yaml
envVars:
  - key: DATABASE_URL
    fromDatabase:
      name: bankme-db
      property: connectionString
  
  - key: NODE_ENV
    value: production
  
  - key: PORT
    value: 3000
  
  - key: JWT_PASS
    generateValue: true  # Gerado automaticamente
  
  - key: JWT_EXPIRATION
    value: 1d
```

**⚠️ Redis no Render:**
- Não incluído no Blueprint (serviço pago)
- A aplicação usa valores padrão (localhost:6379)
- Se precisar de Redis, adicione o serviço separadamente

---

## 📍 Onde Cada Variável é Usada

### DATABASE_URL
- `prisma/schema.prisma` - Conexão com banco de dados
- Todas as operações do Prisma

### NODE_ENV
- `src/app.controller.ts` - Endpoint de health check
- Determina comportamento da aplicação

### PORT
- `src/main.ts` - Porta do servidor (hardcoded como 3000 atualmente)
- **Nota**: Precisa ser configurável para produção

### JWT_PASS
- `src/auth/auth.module.ts` - Secret do JwtModule
- Assinar e verificar tokens JWT

### JWT_EXPIRATION
- Usado na geração de tokens (se configurado)
- Define tempo de validade do token

### REDIS_HOST e REDIS_PORT
- `src/payable/payable.module.ts` - Configuração do BullModule
- Sistema de filas para processamento em batch

---

## ✅ Checklist de Segurança

- [ ] `JWT_PASS` é uma string aleatória forte (32+ caracteres)
- [ ] Valores diferentes entre dev e produção
- [ ] Arquivo `.env` está no `.gitignore`
- [ ] Nunca commitar valores reais
- [ ] `DATABASE_URL` de produção usa PostgreSQL (não SQLite)
- [ ] `NODE_ENV=production` em produção
- [ ] Variáveis sensíveis configuradas via secrets (Render/Railway/etc)

---

## 🔧 Problemas Comuns

### JWT_PASS não configurado
```
Error: secretOrPrivateKey must be provided
```
**Solução**: Configure a variável `JWT_PASS` no `.env`

### DATABASE_URL inválido
```
Error: Can't reach database server
```
**Solução**: Verifique se o `DATABASE_URL` está correto e o banco está rodando

### Redis não conecta
```
Error: connect ECONNREFUSED 127.0.0.1:6379
```
**Solução**: 
- Inicie o Redis: `docker run -d -p 6379:6379 redis`
- Ou ajuste `REDIS_HOST` e `REDIS_PORT`

### Porta já em uso
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solução**: Mude a `PORT` ou pare o processo usando a porta 3000

---

## 📝 Notas Importantes

1. **SQLite em Produção**: 
   - ⚠️ Não recomendado
   - Use PostgreSQL ou MySQL

2. **PORT Hardcoded**:
   - A porta está hardcoded como `3000` no `main.ts`
   - Considere usar `process.env.PORT || 3000`

3. **Redis Opcional**:
   - A aplicação funciona sem Redis
   - Valores padrão (localhost:6379) são usados
   - Necessário apenas para processamento de filas

4. **Render Limitations**:
   - PostgreSQL gratuito por 90 dias
   - Redis é um serviço pago adicional
   - Free tier hiberna após inatividade

---

## 🆘 Ajuda Adicional

- 📖 [Prisma Env Variables](https://www.prisma.io/docs/guides/development-environment/environment-variables)
- 🔐 [NestJS Config](https://docs.nestjs.com/techniques/configuration)
- 🚀 [Render Environment Variables](https://render.com/docs/environment-variables)
