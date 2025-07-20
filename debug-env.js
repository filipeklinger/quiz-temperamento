#!/usr/bin/env node
require('dotenv/config');

console.log('=== Debug Environment Variables ===');
console.log('POSTGRES_URL:', process.env.POSTGRES_URL ? 'DEFINED' : 'UNDEFINED');
console.log('quiz_POSTGRES_URL:', process.env.quiz_POSTGRES_URL ? 'DEFINED' : 'UNDEFINED');
console.log('quiz_DATABASE_URL:', process.env.quiz_DATABASE_URL ? 'DEFINED' : 'UNDEFINED');
console.log('quiz_DATABASE_URL_UNPOOLED:', process.env.quiz_DATABASE_URL_UNPOOLED ? 'DEFINED' : 'UNDEFINED');

// Mostrar apenas parte das URLs para debug sem expor credenciais
if (process.env.POSTGRES_URL) {
  console.log('POSTGRES_URL host:', process.env.POSTGRES_URL.split('@')[1]?.split('/')[0] || 'N/A');
}
if (process.env.quiz_POSTGRES_URL) {
  console.log('quiz_POSTGRES_URL host:', process.env.quiz_POSTGRES_URL.split('@')[1]?.split('/')[0] || 'N/A');
}
if (process.env.quiz_DATABASE_URL) {
  console.log('quiz_DATABASE_URL host:', process.env.quiz_DATABASE_URL.split('@')[1]?.split('/')[0] || 'N/A');
}
