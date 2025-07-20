import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

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
