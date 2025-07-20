import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL || 'postgresql://neondb_owner:npg_jk3LtIgOA5Qo@ep-hidden-waterfall-adbjrcpn.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require',
  },
} satisfies Config;
