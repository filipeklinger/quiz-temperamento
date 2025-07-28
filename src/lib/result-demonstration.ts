/**
 * DEMONSTRAÇÃO DAS NOVAS REGRAS DE CLASSIFICAÇÃO
 * 
 * Este arquivo demonstra como o sistema classifica diferentes cenários
 * baseado nas novas regras de porcentagem e diferença.
 */

import { QuizResultEngine } from './result-engine';
import { Temperament } from '@/types';

// Função auxiliar para criar respostas baseadas em porcentagens
function createResponsesFromPercentages(
  percentages: Record<Temperament, number>, 
  totalResponses: number = 12
): any[] {
  const responses: any[] = [];
  
  Object.entries(percentages).forEach(([temperament, percentage]) => {
    const count = Math.round((percentage / 100) * totalResponses);
    for (let i = 0; i < count; i++) {
      responses.push({
        questionId: `q${responses.length + 1}`,
        answerId: `a${responses.length + 1}`,
        temperament: temperament as Temperament
      });
    }
  });
  
  // Ajustar para ter exatamente totalResponses
  while (responses.length < totalResponses) {
    responses.push({
      questionId: `q${responses.length + 1}`,
      answerId: `a${responses.length + 1}`,
      temperament: Temperament.SANGUINEO
    });
  }
  
  return responses.slice(0, totalResponses);
}

// Cenários de teste
export const TEST_SCENARIOS = [
  // REGRA 1: Temperamento Puro
  {
    name: "Temperamento Puro - Por Porcentagem (>50%)",
    percentages: {
      [Temperament.SANGUINEO]: 60,
      [Temperament.COLERICO]: 20,
      [Temperament.MELANCOLICO]: 10,
      [Temperament.FLEUMATICO]: 10
    },
    expectedPattern: "Puro",
    explanation: "Sanguíneo tem 60% (>50%), então é classificado como puro"
  },
  
  {
    name: "Temperamento Puro - Por Diferença (≥20%)",
    percentages: {
      [Temperament.COLERICO]: 45,
      [Temperament.SANGUINEO]: 22,
      [Temperament.MELANCOLICO]: 17,
      [Temperament.FLEUMATICO]: 16
    },
    expectedPattern: "Puro",
    explanation: "Colérico 45% vs Sanguíneo 22% = diferença 23% (≥20%), então é puro"
  },

  // REGRA 2: Temperamento Misto
  {
    name: "Temperamento Misto - Condições Ideais",
    percentages: {
      [Temperament.SANGUINEO]: 40,
      [Temperament.COLERICO]: 35,
      [Temperament.MELANCOLICO]: 15,
      [Temperament.FLEUMATICO]: 10
    },
    expectedPattern: "Misto",
    explanation: "Diferença 5% (≤15%) e soma 75% (≥70%) = Misto: Sanguíneo + Colérico"
  },

  {
    name: "Temperamento Misto - Limite da Diferença",
    percentages: {
      [Temperament.MELANCOLICO]: 42,
      [Temperament.FLEUMATICO]: 28,
      [Temperament.SANGUINEO]: 20,
      [Temperament.COLERICO]: 10
    },
    expectedPattern: "Misto",
    explanation: "Diferença 14% (≤15%) e soma 70% (≥70%) = Misto: Melancólico + Fleumático"
  },

  // REGRA 3: Temperamento Equilibrado
  {
    name: "Temperamento Equilibrado - Perfeito",
    percentages: {
      [Temperament.SANGUINEO]: 25,
      [Temperament.COLERICO]: 25,
      [Temperament.MELANCOLICO]: 25,
      [Temperament.FLEUMATICO]: 25
    },
    expectedPattern: "Equilibrado",
    explanation: "Diferença entre maior e menor = 0% (≤20%) = Equilibrado"
  },

  {
    name: "Temperamento Equilibrado - Limite",
    percentages: {
      [Temperament.SANGUINEO]: 30,
      [Temperament.COLERICO]: 26,
      [Temperament.MELANCOLICO]: 24,
      [Temperament.FLEUMATICO]: 20
    },
    expectedPattern: "Equilibrado",
    explanation: "Diferença entre 30% e 20% = 10% (≤20%) = Equilibrado"
  },

  // REGRA 4: Predominância Parcial
  {
    name: "Predominância Parcial - Condições Ideais",
    percentages: {
      [Temperament.MELANCOLICO]: 45,
      [Temperament.FLEUMATICO]: 30,
      [Temperament.SANGUINEO]: 15,
      [Temperament.COLERICO]: 10
    },
    expectedPattern: "Predominância",
    explanation: "Primeiro 45% (40-50%) e segundo 30% (25-35%) = Predominantemente Melancólico com traços de Fleumático"
  },

  // CASOS LIMÍTROFES
  {
    name: "Caso Limítrofe - Quase Puro vs Misto",
    percentages: {
      [Temperament.SANGUINEO]: 50,
      [Temperament.COLERICO]: 30,
      [Temperament.MELANCOLICO]: 12,
      [Temperament.FLEUMATICO]: 8
    },
    expectedPattern: "Puro",
    explanation: "Exatamente 50% = Puro (≥50%)"
  },

  {
    name: "Caso Limítrofe - Diferença Exata para Puro",
    percentages: {
      [Temperament.COLERICO]: 40,
      [Temperament.SANGUINEO]: 20,
      [Temperament.MELANCOLICO]: 20,
      [Temperament.FLEUMATICO]: 20
    },
    expectedPattern: "Puro",
    explanation: "Diferença exata de 20% (≥20%) = Puro"
  },

  {
    name: "Caso Limítrofe - Não se Encaixa em Nenhuma Regra",
    percentages: {
      [Temperament.SANGUINEO]: 38,
      [Temperament.COLERICO]: 22,
      [Temperament.MELANCOLICO]: 22,
      [Temperament.FLEUMATICO]: 18
    },
    expectedPattern: "Indefinido",
    explanation: "Não atende nenhuma regra específica = Padrão Indefinido"
  }
];

// Função para executar demonstração
export function runDemonstration() {
  console.log('🎯 DEMONSTRAÇÃO DAS NOVAS REGRAS DE CLASSIFICAÇÃO\n');
  console.log('═'.repeat(60));
  
  TEST_SCENARIOS.forEach((scenario, index) => {
    console.log(`\n${index + 1}. ${scenario.name}`);
    console.log('─'.repeat(50));
    
    // Criar respostas baseadas nas porcentagens
    const responses = createResponsesFromPercentages(scenario.percentages);
    
    // Calcular resultado
    const result = QuizResultEngine.calculateResult(responses, 25);
    
    // Mostrar informações
    console.log(`📊 Entrada: ${JSON.stringify(scenario.percentages)}`);
    console.log(`🎲 Resultado: "${result.title}"`);
    console.log(`🧠 Dominante: ${result.dominantTemperament}`);
    console.log(`💡 Explicação: ${scenario.explanation}`);
    console.log(`✅ Esperado: ${scenario.expectedPattern}`);
    
    // Verificar se está correto
    const isCorrect = result.title.toLowerCase().includes(scenario.expectedPattern.toLowerCase());
    console.log(`${isCorrect ? '✅' : '❌'} Status: ${isCorrect ? 'CORRETO' : 'INCORRETO'}`);
  });
  
  console.log('\n' + '═'.repeat(60));
  console.log('🎉 Demonstração completa!');
  
  // Resumo das regras
  console.log('\n📋 RESUMO DAS REGRAS:');
  console.log('1. 🎯 Puro: >50% OU diferença ≥20%');
  console.log('2. 🤝 Misto: diferença ≤15% E soma ≥70%');
  console.log('3. ⚖️  Equilibrado: diferença total ≤20%');
  console.log('4. 📊 Predominância: 1º(40-50%) E 2º(25-35%)');
  console.log('5. ❓ Indefinido: casos não cobertos');
}

// Função para testar um cenário específico
export function testCustomScenario(percentages: Record<Temperament, number>, age: number = 25) {
  console.log('🧪 TESTE PERSONALIZADO');
  console.log('─'.repeat(30));
  
  const responses = createResponsesFromPercentages(percentages);
  const result = QuizResultEngine.calculateResult(responses, age);
  
  console.log(`📊 Entrada: ${JSON.stringify(percentages)}`);
  console.log(`👤 Idade: ${age} anos`);
  console.log(`🎲 Resultado: "${result.title}"`);
  console.log(`🧠 Dominante: ${result.dominantTemperament}`);
  console.log(`📝 Descrição: ${result.description.substring(0, 100)}...`);
  
  return result;
}

// Exemplo de uso:
// runDemonstration();
// testCustomScenario({ [Temperament.SANGUINEO]: 55, [Temperament.COLERICO]: 25, [Temperament.MELANCOLICO]: 12, [Temperament.FLEUMATICO]: 8 });
