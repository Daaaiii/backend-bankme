# GitHub Actions Workflows

## docker-build.yml 🐳

Este workflow valida o build do Docker antes do deploy no Render.

### O que faz:

1. ✅ Testa o build da imagem Docker (Dockerfile.prod)
2. ✅ Valida que a aplicação compila corretamente
3. ✅ Usa cache para builds mais rápidos
4. ✅ Confirma que está pronto para deploy no Render

### Deploy no Render:

O Render fará o build automático da imagem Docker quando você:

1. Conectar seu repositório GitHub ao Render
2. Criar um novo Blueprint apontando para o arquivo `render.yaml`
3. Clicar em "Apply"

O Render irá:
- 🐳 Buildar a imagem usando `Dockerfile.prod`
- 🗄️ Criar um banco PostgreSQL gratuito
- 🔗 Conectar automaticamente o backend ao banco
- 🚀 Fazer deploy e manter sempre atualizado

### Mais informações:

Veja o arquivo `DOCKER.md` para instruções completas de deploy no Render.
