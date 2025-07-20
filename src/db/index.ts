import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

// Forçar o uso da URL correta do Neon, ignorando POSTGRES_URL se for do Prisma
let targetUrl = process.env.POSTGRES_URL;

// Se POSTGRES_URL for do Prisma, usar as variáveis específicas do Neon
if (!targetUrl || targetUrl.includes('db.prisma.io')) {
  targetUrl = process.env.quiz_POSTGRES_URL || process.env.quiz_DATABASE_URL;
  
  if (targetUrl) {
    process.env.POSTGRES_URL = targetUrl;
    console.log('🔗 Using Neon database URL from quiz variables');
  } else {
    throw new Error('No valid Neon database connection string found in environment variables');
  }
} else {
  console.log('🔗 Using existing POSTGRES_URL');
}

// Criar a instância do banco
export const db = drizzle(sql, { schema });

// Função utilitária para verificar conexão
export async function testConnection() {
  try {
    await sql`SELECT 1`;
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}
