
import prisma from '../lib/prisma';
import { mockQuestions } from '../lib/mock-data';

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Limpar dados existentes
    console.log('🧹 Cleaning existing data...');
    await prisma.answer.deleteMany();
    await prisma.question.deleteMany();

    console.log('📝 Inserting questions and answers...');

    for (const mockQuestion of mockQuestions) {
      const insertedQuestion = await prisma.question.create({
        data: {
          title: mockQuestion.title,
          group: mockQuestion.group,
          isActive: true,
        },
      });
      console.log(`✅ Inserted question: ${insertedQuestion.title}`);

      for (const mockAnswer of mockQuestion.answers) {
        await prisma.answer.create({
          data: {
            questionId: insertedQuestion.id,
            text: mockAnswer.text,
            temperament: mockAnswer.temperament,
          },
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
    .catch((error) => {
      console.error('❌ Seed failed:', error);
      process.exit(1);
    });
}

export { seed };
