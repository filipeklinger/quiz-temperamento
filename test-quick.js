// Teste rápido para verificar as novas propriedades do resultado
const { QuizResultEngine } = require('./src/lib/result-engine.ts');
const { Temperament } = require('./src/types/index.ts');

// Criar respostas de teste
const testResponses = [
  ...Array(6).fill({ questionId: "test", answerId: "test", temperament: 'sanguineo' }),
  ...Array(2).fill({ questionId: "test", answerId: "test", temperament: 'colerico' }),
  ...Array(2).fill({ questionId: "test", answerId: "test", temperament: 'melancolico' }),
];

const result = QuizResultEngine.calculateResult(testResponses, 25);

console.log('📊 Resultado do teste:');
console.log('Título:', result.title);
console.log('Temperamento dominante:', result.dominantTemperament);
console.log('Características:', result.characteristics?.length || 0, 'itens');
console.log('Forças:', result.strengths?.length || 0, 'itens');
console.log('Áreas de desenvolvimento:', result.developmentAreas?.length || 0, 'itens');

if (result.characteristics) {
  console.log('\n✨ Características:');
  result.characteristics.forEach((char, i) => console.log(`  ${i+1}. ${char}`));
}

if (result.strengths) {
  console.log('\n💪 Forças:');
  result.strengths.forEach((strength, i) => console.log(`  ${i+1}. ${strength}`));
}

if (result.developmentAreas) {
  console.log('\n🚀 Áreas de desenvolvimento:');
  result.developmentAreas.forEach((area, i) => console.log(`  ${i+1}. ${area}`));
}
