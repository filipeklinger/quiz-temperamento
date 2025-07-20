
import { db } from './index';
import { questions, answers } from './schema';
import { mockQuestions } from '../lib/mock-data';

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Limpar dados existentes
    console.log('🧹 Cleaning existing data...');
    await db.delete(answers);
    await db.delete(questions);

    console.log('📝 Inserting questions and answers...');

    for (const mockQuestion of mockQuestions) {
      const [insertedQuestion] = await db.insert(questions).values({
        title: mockQuestion.title,
        group: mockQuestion.group,
        isActive: 1,
      }).returning();
      
      console.log(`✅ Inserted question: ${insertedQuestion.title}`);

      for (const mockAnswer of mockQuestion.answers) {
        await db.insert(answers).values({
          questionId: insertedQuestion.id,
          text: mockAnswer.text,
          temperament: mockAnswer.temperament,
        });
      }
      console.log(`✅ Inserted ${mockQuestion.answers.length} answers for question`);
    }

    console.log('🎉 Database seed completed successfully!');
    console.log(`📊 Total questions inserted: ${mockQuestions.length}`);
    console.log(`📊 Total answers inserted: ${mockQuestions.length * 4}`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Executar seed se chamado diretamente
if (require.main === module) {
  seed()
    .then(() => {
      console.log('✅ Seed completed');
      process.exit(0);
    })
    .catch((error: any) => {
      console.error('❌ Seed failed:', error);
      process.exit(1);
    });
}

export { seed };
