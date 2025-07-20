import { db, testConnection } from './src/db/index';
import { questions, answers } from './src/db/schema';

async function testDatabase() {
  console.log('🔍 Testing database connection and data...');
  
  try {
    // Testar conexão
    await testConnection();
    
    // Buscar perguntas
    const allQuestions = await db.select().from(questions);
    console.log(`📋 Found ${allQuestions.length} questions`);
    
    // Buscar respostas
    const allAnswers = await db.select().from(answers);
    console.log(`📝 Found ${allAnswers.length} answers`);
    
    // Mostrar primeira pergunta como exemplo
    if (allQuestions.length > 0) {
      console.log(`\n📌 First question: ${allQuestions[0].title}`);
      console.log(`   Group: ${allQuestions[0].group}`);
      console.log(`   ID: ${allQuestions[0].id}`);
    }
    
    console.log('\n✅ Database test completed successfully!');
  } catch (error) {
    console.error('❌ Database test failed:', error);
  }
}

testDatabase();
