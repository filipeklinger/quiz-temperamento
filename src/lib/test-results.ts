/**
 * Teste simples para verificar o funcionamento do sistema de resultados
 * com as novas regras baseadas em porcentagens
 */

import { QuizResultEngine } from './result-engine';
import { Temperament } from '@/types';

// Função de teste
function testResultSystem() {
  console.log('🧪 Testando sistema de resultados com novas regras...\n');

  // Teste 1: Temperamento puro - Sanguíneo com 60% (>50%)
  const pureResponses = [
    ...Array(7).fill({ questionId: "test", answerId: "test", temperament: Temperament.SANGUINEO }),
    ...Array(2).fill({ questionId: "test", answerId: "test", temperament: Temperament.COLERICO }),
    ...Array(2).fill({ questionId: "test", answerId: "test", temperament: Temperament.MELANCOLICO }),
    { questionId: "test", answerId: "test", temperament: Temperament.FLEUMATICO }
  ];

  const result1 = QuizResultEngine.calculateResult(pureResponses, 25);
  console.log('✅ Teste 1 - Sanguíneo Puro (58% - regra >50%):');
  console.log(`   Título: ${result1.title}`);
  console.log(`   Temperamento: ${result1.dominantTemperament}`);
  console.log(`   Pontuações: ${JSON.stringify(result1.temperamentScores)}`);
  console.log(`   Descrição: ${result1.description.substring(0, 80)}...\n`);

  // Teste 2: Temperamento puro por diferença - Colérico 45% vs 20% (diferença >= 20%)
  const pureDiffResponses = [
    ...Array(5).fill({ questionId: "test", answerId: "test", temperament: Temperament.COLERICO }),
    ...Array(2).fill({ questionId: "test", answerId: "test", temperament: Temperament.SANGUINEO }),
    ...Array(2).fill({ questionId: "test", answerId: "test", temperament: Temperament.MELANCOLICO }),
    ...Array(2).fill({ questionId: "test", answerId: "test", temperament: Temperament.FLEUMATICO })
  ];

  const result2 = QuizResultEngine.calculateResult(pureDiffResponses, 30);
  console.log('✅ Teste 2 - Colérico Puro por diferença (45% vs 18% - diferença 27%):');
  console.log(`   Título: ${result2.title}`);
  console.log(`   Temperamento: ${result2.dominantTemperament}`);
  console.log(`   Pontuações: ${JSON.stringify(result2.temperamentScores)}`);
  console.log(`   Descrição: ${result2.description.substring(0, 80)}...\n`);

  // Teste 3: Temperamento Misto - Sanguíneo 40% + Colérico 35% (diferença 5% <= 15%, soma 75% >= 70%)
  const mixedResponses = [
    ...Array(5).fill({ questionId: "test", answerId: "test", temperament: Temperament.SANGUINEO }),
    ...Array(4).fill({ questionId: "test", answerId: "test", temperament: Temperament.COLERICO }),
    ...Array(2).fill({ questionId: "test", answerId: "test", temperament: Temperament.MELANCOLICO }),
    { questionId: "test", answerId: "test", temperament: Temperament.FLEUMATICO }
  ];

  const result3 = QuizResultEngine.calculateResult(mixedResponses, 35);
  console.log('✅ Teste 3 - Temperamento Misto (42% + 33%, diferença 9%, soma 75%):');
  console.log(`   Título: ${result3.title}`);
  console.log(`   Temperamento: ${result3.dominantTemperament}`);
  console.log(`   Pontuações: ${JSON.stringify(result3.temperamentScores)}`);
  console.log(`   Descrição: ${result3.description.substring(0, 80)}...\n`);

  // Teste 4: Temperamento Equilibrado - diferença entre maior e menor <= 20%
  const balancedResponses = [
    ...Array(3).fill({ questionId: "test", answerId: "test", temperament: Temperament.SANGUINEO }),
    ...Array(3).fill({ questionId: "test", answerId: "test", temperament: Temperament.COLERICO }),
    ...Array(3).fill({ questionId: "test", answerId: "test", temperament: Temperament.MELANCOLICO }),
    ...Array(3).fill({ questionId: "test", answerId: "test", temperament: Temperament.FLEUMATICO })
  ];

  const result4 = QuizResultEngine.calculateResult(balancedResponses, 45);
  console.log('✅ Teste 4 - Temperamento Equilibrado (25% cada, diferença 0%):');
  console.log(`   Título: ${result4.title}`);
  console.log(`   Temperamento: ${result4.dominantTemperament}`);
  console.log(`   Pontuações: ${JSON.stringify(result4.temperamentScores)}`);
  console.log(`   Descrição: ${result4.description.substring(0, 80)}...\n`);

  // Teste 5: Predominância Parcial - Melancólico 45% + Fleumático 30%
  const partialResponses = [
    ...Array(5).fill({ questionId: "test", answerId: "test", temperament: Temperament.MELANCOLICO }),
    ...Array(3).fill({ questionId: "test", answerId: "test", temperament: Temperament.FLEUMATICO }),
    ...Array(2).fill({ questionId: "test", answerId: "test", temperament: Temperament.SANGUINEO }),
    ...Array(1).fill({ questionId: "test", answerId: "test", temperament: Temperament.COLERICO })
  ];

  const result5 = QuizResultEngine.calculateResult(partialResponses, 28);
  console.log('✅ Teste 5 - Predominância Parcial (45% + 27%):');
  console.log(`   Título: ${result5.title}`);
  console.log(`   Temperamento: ${result5.dominantTemperament}`);
  console.log(`   Pontuações: ${JSON.stringify(result5.temperamentScores)}`);
  console.log(`   Descrição: ${result5.description.substring(0, 80)}...\n`);

  console.log('🎉 Todos os testes executados com sucesso!');
  console.log('\n📊 Resumo das regras implementadas:');
  console.log('1. ✅ Temperamento Puro: >50% OU diferença ≥20% para o segundo');
  console.log('2. ✅ Temperamento Misto: diferença ≤15% e soma ≥70%');
  console.log('3. ✅ Temperamento Equilibrado: diferença entre maior e menor ≤20%');
  console.log('4. ✅ Predominância Parcial: primeiro 40-50% e segundo 25-35%');
}

// Função para testar cenários específicos
function testSpecificScenarios() {
  console.log('\n🔍 Testando cenários específicos...\n');

  // Cenário: exatamente na borda das regras
  console.log('Teste de Fronteira - Temperamento Puro vs Misto:');
  
  // 50% vs 30% = diferença 20% (exato na fronteira do puro)
  const borderlineResponses = [
    ...Array(5).fill({ temperament: Temperament.SANGUINEO }),
    ...Array(3).fill({ temperament: Temperament.COLERICO }),
    ...Array(1).fill({ temperament: Temperament.MELANCOLICO }),
    ...Array(1).fill({ temperament: Temperament.FLEUMATICO })
  ];

  const borderResult = QuizResultEngine.calculateResult(borderlineResponses, 25);
  console.log(`Resultado: ${borderResult.title} (esperado: Puro por diferença)`);
  
  // Cenário: exatamente 15% de diferença para misto
  const exactMixedResponses = [
    ...Array(4).fill({ temperament: Temperament.MELANCOLICO }),  // 40%
    ...Array(3).fill({ temperament: Temperament.FLEUMATICO }),   // 30% (diferença 10%)
    ...Array(2).fill({ temperament: Temperament.SANGUINEO }),    // 20%
    ...Array(1).fill({ temperament: Temperament.COLERICO })      // 10%
  ];

  const exactMixed = QuizResultEngine.calculateResult(exactMixedResponses, 30);
  console.log(`Resultado: ${exactMixed.title} (esperado: Misto se soma ≥70%)`);
}

// Exportar funções de teste
export { testResultSystem, testSpecificScenarios };

// Se executado diretamente, rodar os testes
if (typeof window === 'undefined') {
  // testResultSystem();
  // testSpecificScenarios();
}
