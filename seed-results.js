import { db } from './src/db/index';
import { quizResults } from './src/db/schema';

async function seedResults() {
  console.log('🌱 Adding test quiz results...');
  
  try {
    // Dados de teste para analytics
    const testResults = [
      {
        birthDate: new Date('1990-01-15'),
        age: 34,
        dominantTemperament: 'sanguineo',
        temperamentScores: {
          sanguineo: 12,
          colerico: 8,
          melancolico: 6,
          fleumatico: 4
        },
        userAgent: 'Mozilla/5.0 (Test Browser)',
        ipAddress: '192.168.1.1'
      },
      {
        birthDate: new Date('1985-05-20'),
        age: 39,
        dominantTemperament: 'colerico',
        temperamentScores: {
          sanguineo: 6,
          colerico: 14,
          melancolico: 5,
          fleumatico: 5
        },
        userAgent: 'Mozilla/5.0 (Test Browser)',
        ipAddress: '192.168.1.2'
      },
      {
        birthDate: new Date('1995-09-10'),
        age: 29,
        dominantTemperament: 'melancolico',
        temperamentScores: {
          sanguineo: 4,
          colerico: 6,
          melancolico: 13,
          fleumatico: 7
        },
        userAgent: 'Mozilla/5.0 (Test Browser)',
        ipAddress: '192.168.1.3'
      },
      {
        birthDate: new Date('1988-12-03'),
        age: 36,
        dominantTemperament: 'fleumatico',
        temperamentScores: {
          sanguineo: 5,
          colerico: 4,
          melancolico: 6,
          fleumatico: 15
        },
        userAgent: 'Mozilla/5.0 (Test Browser)',
        ipAddress: '192.168.1.4'
      }
    ];

    for (const result of testResults) {
      await db.insert(quizResults).values(result);
      console.log(`✅ Inserted result for ${result.dominantTemperament}`);
    }
    
    console.log('🎉 Test results added successfully!');
  } catch (error) {
    console.error('❌ Error adding test results:', error);
  }
}

seedResults();
