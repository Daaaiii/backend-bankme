# 🚀 Guia Rápido de Deploy no Render

## ⚡ Deploy em 5 Passos

### 1. Fazer Push do Código

```bash
git add .
git commit -m "feat: add render deployment"
git push origin main
```

### 2. Acessar o Render

🔗 https://dashboard.render.com

- Se não tiver conta, crie uma (grátis)
- Conecte sua conta GitHub

### 3. Criar Blueprint

1. Clique em **"New +"** → **"Blueprint"**
2. Conecte o repositório: `Daaaiii/backend-bankme`
3. O Render detectará automaticamente o arquivo `render.yaml`
4. Revise as configurações (backend + banco PostgreSQL)
5. Clique em **"Apply"**

### 4. Aguardar Deploy

O Render irá:
- ⏳ Criar banco PostgreSQL (~1 min)
- ⏳ Buildar imagem Docker (~3-5 min)
- ⏳ Fazer deploy do backend (~1 min)

**Total: ~5-7 minutos** na primeira vez

### 5. Testar!

Quando terminar, você receberá uma URL:
```
https://bankme-backend.onrender.com
```

Teste:
```bash
curl https://bankme-backend.onrender.com/health
```

---

## 🔐 Configurar Variáveis de Ambiente (Opcional)

Se precisar customizar:

1. Vá para o seu serviço → **"Environment"**
2. Adicione/edite:
   - `JWT_SECRET` → (Gere um seguro)
   - `JWT_EXPIRATION` → `1d`
   - `DATABASE_URL` → (já configurado automaticamente)

Para gerar JWT_SECRET seguro:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📝 Estrutura Criada

O Render criará automaticamente:

```
✅ Web Service: bankme-backend
   - Tipo: Docker
   - Build: Dockerfile.prod
   - Region: Oregon
   - Plan: Free
   
✅ PostgreSQL Database: bankme-db
   - Database: bankme_db
   - Region: Oregon
   - Plan: Free (90 dias)
   
✅ Auto-deploy configurado
   - Push na main → deploy automático
```

---

## 🔄 Atualizações Futuras

Após o setup inicial, para fazer deploy de novas alterações:

```bash
git add .
git commit -m "feat: sua mudança"
git push origin main
```

O Render fará deploy automaticamente! ✨

---

## ⚠️ Limitações do Free Tier

- 🌙 Serviço **hiberna após 15 min** sem uso
- ⏰ Primeira request demora **~30 segundos** (acordar)
- 🗄️ PostgreSQL gratuito por **90 dias** (depois $7/mês)
- 📊 **750 horas/mês** de runtime

---

## 🎯 Próximos Passos

### Conectar o Frontend

No seu frontend Next.js, configure a URL:

```typescript
// .env.local ou .env.production
NEXT_PUBLIC_API_URL=https://bankme-backend.onrender.com
```

### Configurar CORS

No backend, adicione o domínio do frontend:

```typescript
// main.ts
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://seu-frontend.vercel.app'
  ],
  credentials: true,
});
```

---

## 🆘 Problemas?

### Deploy falhou

1. Verifique os **logs** no Dashboard
2. Confirme que o `DATABASE_URL` está correto
3. Verifique se as migrations rodaram

### API não responde

- Aguarde ~30 segundos (acordar do hibernar)
- Verifique se o health check está OK no Dashboard
- Veja os logs para erros

### Banco de dados

- Confirme que o banco foi criado
- Verifique se está na mesma região do backend
- Migrations são aplicadas automaticamente no deploy

---

## 📚 Documentação Completa

Para detalhes completos, veja:
- 📖 [DOCKER.md](DOCKER.md) - Guia completo de Docker
- 🔧 [README.md](README.md) - Documentação do projeto
- 🌐 [Render Docs](https://render.com/docs)

---

## ✅ Checklist de Deploy

- [ ] Push do código para GitHub
- [ ] Conectado ao Render
- [ ] Blueprint aplicado
- [ ] Backend deployado com sucesso
- [ ] PostgreSQL criado
- [ ] Health check funcionando
- [ ] Testado endpoint da API
- [ ] Frontend conectado ao backend
- [ ] CORS configurado

---

**Pronto! Seu backend está no ar! 🎉**
