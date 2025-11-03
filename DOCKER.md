# 🐳 Docker Deployment Guide

Este guia explica como usar Docker para executar e fazer deploy do backend BankMe.

## 📋 Pré-requisitos

- Docker instalado
- Docker Compose instalado (opcional, mas recomendado)

## 🚀 Opções de Deploy

### Opção 1: Docker Compose (Recomendado para desenvolvimento)

```bash
# Executar aplicação + PostgreSQL
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Parar
docker-compose down
```

A aplicação estará disponível em: `http://localhost:3000`

### Opção 2: Docker Build Local

```bash
# Build da imagem
docker build -t bankme-backend:latest -f Dockerfile.prod .

# Executar (precisa de um PostgreSQL rodando)
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:password@host:5432/database" \
  bankme-backend:latest
```

### Opção 3: Usar imagem do GitHub Container Registry

```bash
# Pull da imagem
docker pull ghcr.io/daaaiii/aprove-me/backend:latest

# Executar
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:password@host:5432/database" \
  ghcr.io/daaaiii/aprove-me/backend:latest
```

## 🔄 CI/CD - GitHub Actions

O workflow `.github/workflows/docker-build.yml` automaticamente:

1. ✅ Builda a imagem Docker
2. ✅ Publica no GitHub Container Registry (GHCR)
3. ✅ Cria tags automáticas (latest, versão, SHA)

### Como funciona:

- **Push na main**: Cria tag `latest`
- **Push de tag `v*`**: Cria versão (ex: `v1.0.0`)
- **Pull Request**: Cria tag de teste

### Acessar as imagens:

🔗 https://github.com/Daaaiii/aprove-me/pkgs/container/aprove-me%2Fbackend

## ☁️ Deploy em Plataformas Cloud

### Fly.io (Recomendado)

```bash
# Instalar CLI
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Criar app
fly launch

# Deploy
fly deploy
```

O arquivo `fly.toml` já está configurado!

### Render

1. Vá em: https://render.com
2. New → Web Service
3. Deploy an existing image from a registry
4. Use: `ghcr.io/daaaiii/aprove-me/backend:latest`
5. Configure as variáveis de ambiente
6. Deploy!

### Railway

```bash
# Instalar CLI
npm install -g @railway/cli

# Login
railway login

# Iniciar projeto
railway init

# Deploy
railway up
```

### Google Cloud Run

```bash
# Deploy direto da imagem
gcloud run deploy bankme-backend \
  --image ghcr.io/daaaiii/aprove-me/backend:latest \
  --platform managed \
  --region southamerica-east1 \
  --allow-unauthenticated
```

## 🔐 Variáveis de Ambiente Necessárias

Configure estas variáveis em seu ambiente de deploy:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
NODE_ENV=production
PORT=3000
JWT_SECRET=your-super-secret-key
JWT_EXPIRATION=1d
```

## 🏥 Health Check

O container possui um health check configurado em:
- **Endpoint**: `/health`
- **Intervalo**: 30s
- **Timeout**: 3s

## 📊 Monitoramento

Para ver logs em produção:

```bash
# Docker Compose
docker-compose logs -f backend

# Docker
docker logs -f <container-id>

# Fly.io
fly logs

# Railway
railway logs
```

## 🛠️ Troubleshooting

### Container não inicia

```bash
# Verificar logs
docker logs <container-id>

# Verificar se o banco está acessível
docker exec -it <container-id> sh
ping postgres
```

### Migrations não rodam

```bash
# Executar migrations manualmente
docker exec -it <container-id> npx prisma migrate deploy
```

### Variáveis de ambiente

```bash
# Verificar variáveis carregadas
docker exec -it <container-id> env
```

## 📦 Tamanho da Imagem

A imagem de produção é otimizada:
- Multi-stage build
- Alpine Linux (menor)
- Apenas dependências de produção
- Tamanho estimado: ~200-300MB

## 🔄 Atualizações

Para atualizar para a última versão:

```bash
# Pull nova imagem
docker pull ghcr.io/daaaiii/aprove-me/backend:latest

# Recriar containers
docker-compose up -d --force-recreate
```

## 📝 Notas

- ⚠️ **Não use SQLite em produção** (não funciona bem em containers)
- ✅ Use PostgreSQL ou MySQL
- 🔒 Sempre configure JWT_SECRET em produção
- 💾 Use volumes para dados persistentes
- 🌐 Configure CORS adequadamente

## 🆘 Precisa de Ajuda?

- 📖 [Docker Documentation](https://docs.docker.com)
- 🚀 [Fly.io Docs](https://fly.io/docs)
- 🎯 [Render Docs](https://render.com/docs)
- 🛤️ [Railway Docs](https://docs.railway.app)
