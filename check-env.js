#!/usr/bin/env node

console.log('Verificando variáveis de ambiente:');
console.log('quiz_DATABASE_URL:', process.env.quiz_DATABASE_URL);
console.log('quiz_DATABASE_URL_UNPOOLED:', process.env.quiz_DATABASE_URL_UNPOOLED);
console.log('POSTGRES_URL:', process.env.POSTGRES_URL);
console.log('DATABASE_URL:', process.env.DATABASE_URL);
