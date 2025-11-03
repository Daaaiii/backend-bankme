# 🐳 Deploy no Render com Docker

Este guia explica como fazer deploy do backend BankMe no Render usando Docker.

## 📋 Pré-requisitos

- Conta no [Render](https://render.com) (gratuita)
- Repositório no GitHub
- Docker instalado (apenas para testes locais)

## 🚀 Deploy no Render (Recomendado)

### Método 1: Blueprint (Automático) ⭐

Este é o método mais fácil! O arquivo `render.yaml` já está configurado.

1. **Acesse o Render Dashboard**: https://dashboard.render.com
2. **New → Blueprint**
3. **Conecte seu repositório GitHub** (`Daaaiii/backend-bankme`)
4. **O Render detectará o `render.yaml`** automaticamente
5. **Clique em "Apply"**
6. **Aguarde o deploy** (~3-5 minutos na primeira vez)

O Render irá:
- ✅ Criar um banco PostgreSQL gratuito
- ✅ Buildar a imagem Docker usando `Dockerfile.prod`
- ✅ Configurar as variáveis de ambiente automaticamente
- ✅ Fazer deploy do backend
- ✅ Configurar auto-deploy em cada push na branch `main`

### Método 2: Manual

1. **Vá para o Dashboard**: https://dashboard.render.com
2. **New → Web Service**
3. **Conecte seu repositório**
4. Configure:
   - **Environment**: Docker
   - **Dockerfile Path**: `./Dockerfile.prod`
   - **Region**: Oregon (ou Frankfurt para Europa)
   - **Plan**: Free
   
5. **Adicione o banco de dados**:
   - New → PostgreSQL
   - Name: `bankme-db`
   - Region: Oregon
   - Plan: Free
   
6. **Configure variáveis de ambiente**:
   - `NODE_ENV`: `production`
   - `PORT`: `3000`
   - `DATABASE_URL`: (Copie do banco PostgreSQL criado)
   - `JWT_SECRET`: (Gere um secret seguro)
   - `JWT_EXPIRATION`: `1d`

7. **Clique em "Create Web Service"**

## 🧪 Testar Localmente com Docker Compose

Antes de fazer deploy, você pode testar localmente:

```bash
# Subir backend + PostgreSQL
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Testar API
curl http://localhost:3000/health

# Parar
docker-compose down
```

A aplicação estará disponível em: `http://localhost:3000`

## 🔐 Variáveis de Ambiente

Configure estas variáveis no Render:

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NODE_ENV` | Ambiente | `production` |
| `PORT` | Porta do servidor | `3000` |
| `JWT_SECRET` | Secret para JWT | Gere um aleatório seguro |
| `JWT_EXPIRATION` | Tempo de expiração do token | `1d` |

### Gerar JWT_SECRET seguro:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🏥 Health Check

O backend possui um endpoint de health check:
- **URL**: `/health`
- **Método**: GET
- **Resposta esperada**: 200 OK

O Render usa este endpoint para verificar se o serviço está funcionando.

## 📊 Monitoramento

### Ver logs no Render:

1. Acesse seu serviço no Dashboard
2. Clique na aba "Logs"
3. Logs em tempo real aparecerão aqui

### Comandos úteis:

```bash
# Ver logs locais
docker-compose logs -f backend

# Entrar no container
docker-compose exec backend sh

# Rodar migrations manualmente
docker-compose exec backend npx prisma migrate deploy

# Ver status do banco
docker-compose exec postgres psql -U bankme -d bankme_db -c "\dt"
```

## 🔄 CI/CD - GitHub Actions

O workflow `.github/workflows/docker-build.yml` automaticamente:

1. ✅ Valida o build do Docker em cada push
2. ✅ Testa se a aplicação compila
3. ✅ Confirma que está pronta para deploy no Render

O Render fará o deploy automático quando você:
- Fizer push na branch `main`
- Tiver configurado o Blueprint ou Auto-Deploy

## 🛠️ Troubleshooting

### Container não inicia no Render

1. **Verifique os logs** no Dashboard
2. **Confirme as variáveis de ambiente**:
   - `DATABASE_URL` está correta?
   - `JWT_SECRET` está configurado?
3. **Verifique se o banco está pronto**:
   - O banco PostgreSQL pode demorar 1-2 minutos para iniciar
   - O backend aguarda o banco antes de conectar

### Erro de conexão com banco

```bash
# Teste a conexão localmente:
docker-compose exec backend npx prisma db pull

# Verifique se o DATABASE_URL está correto
docker-compose exec backend env | grep DATABASE_URL
```

### Migrations não aplicadas

No Render, as migrations são aplicadas automaticamente no CMD do Dockerfile:
```bash
npx prisma migrate deploy && node dist/main
```

Se precisar rodar manualmente, use o Render Shell:
1. Dashboard → seu serviço → Shell
2. Execute: `npx prisma migrate deploy`

### Erro "Port already in use"

Localmente:
```bash
# Parar todos os containers
docker-compose down

# Verificar portas em uso
netstat -ano | findstr :3000  # Windows
lsof -i :3000                  # Linux/Mac
```

## 📦 Estrutura do Dockerfile

O `Dockerfile.prod` usa **multi-stage build** para otimizar:

1. **Stage 1 (builder)**: 
   - Instala todas as dependências
   - Gera Prisma Client
   - Builda a aplicação

2. **Stage 2 (production)**:
   - Usa apenas dependências de produção
   - Copia apenas os arquivos necessários
   - Resultado: imagem menor e mais segura (~200-300MB)

## 🎯 Recursos do Render (Free Tier)

- ✅ **750 horas/mês** de runtime
- ✅ **PostgreSQL** gratuito (90 dias, depois $7/mês)
- ✅ **SSL/HTTPS** automático
- ✅ **Auto-deploy** do GitHub
- ✅ **Health checks** automáticos
- ✅ **Logs** persistentes
- ⚠️ O serviço **hiberna** após 15 min de inatividade (demora ~30s para acordar)

## 🚀 Após o Deploy

Seu backend estará disponível em:
```
https://bankme-backend.onrender.com
```

### Testar:

```bash
# Health check
curl https://bankme-backend.onrender.com/health

# Sua API
curl https://bankme-backend.onrender.com/api/endpoint
```

### Conectar o Frontend:

No seu frontend, atualize a URL da API:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bankme-backend.onrender.com';
```

## 📝 Notas Importantes

- 🐘 **PostgreSQL obrigatório** (não use SQLite em produção)
- 🔒 **JWT_SECRET** deve ser forte e seguro
- 🌐 **Configure CORS** adequadamente para seu frontend
- ⏰ **Hibernação**: No free tier, pode demorar ~30s na primeira request
- 💾 **Banco de dados**: Backup regular recomendado (não incluído no free tier)

## 🆘 Precisa de Ajuda?

- 📖 [Render Documentation](https://render.com/docs)
- 💬 [Render Community](https://community.render.com)
- � [Docker Documentation](https://docs.docker.com)
- 🎯 [NestJS Deployment](https://docs.nestjs.com/recipes/prisma#deployment)

## � Dicas de Performance

1. **Otimize queries** do Prisma
2. **Use cache** (Redis no Render é pago)
3. **Monitore logs** regularmente
4. **Configure rate limiting**
5. **Upgrade para plano pago** se precisar de mais performance
