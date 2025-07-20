# 🗄️ Configuração do Banco de Dados

## 📋 Pré-requisitos

1. **Conta na Vercel**: Para usar o Vercel Postgres
2. **Projeto no Vercel**: Deploy do projeto na Vercel

## 🚀 Setup na Vercel

### 1. Criar banco Postgres na Vercel

1. Acesse o [dashboard da Vercel](https://vercel.com/dashboard)
2. Vá em **Storage** > **Create Database**
3. Escolha **Postgres**
4. Nomeie o banco (ex: `quiz-temperamento-db`)
5. Selecione a região mais próxima

### 2. Configurar variáveis de ambiente

1. Na Vercel, vá em **Settings** > **Environment Variables**
2. Adicione as variáveis que apareceram após criar o banco:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL` 
   - `POSTGRES_URL_NO_SSL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

3. Adicione também:
   - `JWT_SECRET`: Uma string secreta para JWT
   - `NEXT_PUBLIC_BASE_URL`: URL do seu projeto

### 3. Para desenvolvimento local

1. Copie `.env.example` para `.env.local`
2. Substitua as variáveis pelas da Vercel
3. Ou use banco local PostgreSQL

## 🛠️ Comandos de Banco

```bash
# Gerar migrations
npm run db:generate

# Aplicar migrations (Vercel)
npm run db:push

# Executar migrations locais
npm run db:migrate

# Popular banco com dados iniciais
npm run db:seed

# Abrir Drizzle Studio
npm run db:studio
```

## 📊 Estrutura do Banco

### Tabelas Principais

1. **questions** - Perguntas do quiz
2. **answers** - Respostas das perguntas
3. **quiz_results** - Resultados dos usuários
4. **quiz_sessions** - Sessões de quiz (futuro)
5. **users** - Usuários (futuro)

## 🔧 Primeiro Setup

1. **Deploy na Vercel** com as variáveis configuradas
2. **Gerar schema**: `npm run db:push`
3. **Popular dados**: `npm run db:seed`
4. **Testar**: Fazer um quiz e verificar analytics

## 🎯 Verificação

Para verificar se está funcionando:

1. Acesse `/analytics` após fazer alguns quizzes
2. Os dados devem aparecer nos gráficos
3. No Drizzle Studio: `npm run db:studio`

## ⚠️ Importante

- **Desenvolvimento**: Use arquivo `.env.local`
- **Produção**: Configure na Vercel
- **Seed**: Execute apenas uma vez
- **Backup**: Vercel faz automaticamente
