import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

// Configurar a URL de conexão manualmente
if (!process.env.POSTGRES_URL) {
  process.env.POSTGRES_URL = 'postgres://neondb_owner:npg_jk3LtIgOA5Qo@ep-hidden-waterfall-adbjrcpn-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';
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
