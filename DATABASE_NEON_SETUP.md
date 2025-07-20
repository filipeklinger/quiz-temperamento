# Configuração do Banco de Dados - Drizzle + Neon

## ✅ Status da Configuração
- **Banco de Dados**: Neon Database (PostgreSQL)
- **ORM**: Drizzle ORM
- **Status**: Conectado e funcionando
- **Dados**: Populado com 16 perguntas e 64 respostas

## 🔧 Configuração Atual

### Arquivos Configurados:
1. **`drizzle.config.ts`**: Configuração do Drizzle Kit
2. **`src/db/index.ts`**: Cliente do banco e conexão
3. **`src/db/schema.ts`**: Schema das tabelas
4. **`src/db/seed.ts`**: Script para popular o banco

### Variáveis de Ambiente:
As variáveis estão configuradas no arquivo `.env.local` (baixado do Vercel):
- `POSTGRES_URL`: URL principal de conexão com o Neon
- `quiz_DATABASE_URL`: URL pooled do Neon
- `quiz_DATABASE_URL_UNPOOLED`: URL direct do Neon

## 🚀 Scripts Disponíveis

```bash
# Gerar migrações
npm run db:generate

# Aplicar mudanças no schema
npm run db:push

# Popular o banco com dados iniciais
npm run db:seed

# Abrir Drizzle Studio (pode ter problemas com websockets)
npm run db:studio
```

## 📋 Schema das Tabelas

### Questions (Perguntas)
- `id`: UUID (Primary Key)
- `title`: Texto da pergunta
- `group`: Grupo da pergunta (group_a, group_b, etc.)
- `isActive`: Status ativo (1 = ativo, 0 = inativo)
- `createdAt`, `updatedAt`: Timestamps

### Answers (Respostas)
- `id`: UUID (Primary Key)
- `questionId`: Referência para pergunta
- `text`: Texto da resposta
- `temperament`: Tipo de temperamento (sanguineo, colerico, melancolico, fleumatico)
- `createdAt`: Timestamp

### Quiz Results (Resultados)
- `id`: UUID (Primary Key)
- `birthDate`: Data de nascimento
- `age`: Idade calculada
- `dominantTemperament`: Temperamento dominante
- `temperamentScores`: JSON com pontuações
- `userAgent`, `ipAddress`: Para analytics
- `completedAt`, `createdAt`: Timestamps

### Quiz Sessions (Sessões)
- `id`: UUID (Primary Key)
- `sessionId`: ID único da sessão
- `currentQuestionIndex`: Índice da pergunta atual
- `responses`: JSON com respostas da sessão
- `startedAt`, `updatedAt`: Timestamps

## 🔗 Conexão com Vercel

O projeto está conectado ao Vercel e as variáveis de ambiente foram sincronizadas automaticamente usando:

```bash
vercel link
vercel env pull .env.local
```

## ⚠️ Notas Importantes

1. **Websockets**: O Drizzle Studio pode ter problemas com websockets ao conectar com Neon via `@vercel/postgres`
2. **Variáveis de Ambiente**: O `@vercel/postgres` requer `POSTGRES_URL` definida
3. **Produção**: Em produção, o Vercel automaticamente define as variáveis necessárias

## 🧪 Testando a Conexão

Para testar se tudo está funcionando:

```bash
npm run db:seed
```

Se o comando executar sem erros e mostrar as mensagens de sucesso, o banco está funcionando corretamente.
