import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';


// Verificar se temos uma URL válida do Neon (não do Prisma)
let connectionString = process.env.POSTGRES_URL;

// Se a POSTGRES_URL for do Prisma ou inválida, usar as específicas do Neon
if (!connectionString || connectionString.includes('db.prisma.io')) {
  connectionString = process.env.quiz_POSTGRES_URL || 
    process.env.quiz_DATABASE_URL || 
    process.env.quiz_DATABASE_URL_UNPOOLED;
}

if (!connectionString) {
  throw new Error('Database connection string not found. Please check your environment variables.');
}

console.log('🔗 Drizzle Config using:', connectionString.split('@')[1]?.split('/')[0] || 'unknown host');

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString,
  },
} satisfies Config;
