/**
 * EXEMPLO DE USO DO SISTEMA DE RESULTADOS
 * 
 * Este arquivo demonstra como usar e configurar o novo sistema de resultados do quiz.
 * Copie os exemplos abaixo para implementar suas próprias configurações.
 */

import { QuizResultEngine, ResultRule } from "./result-engine";
import { Temperament } from "@/types";
import { CUSTOM_RESULT_RULES } from "./result-config";

// ================================
// EXEMPLO 1: Uso básico da engine
// ================================

const exampleResponses = [
  { questionId: "1", answerId: "a", temperament: Temperament.SANGUINEO },
  { questionId: "2", answerId: "b", temperament: Temperament.COLERICO },
  { questionId: "3", answerId: "c", temperament: Temperament.SANGUINEO },
  // ... mais respostas
];

const result = QuizResultEngine.calculateResult(exampleResponses, 28);
console.log(result.title); // Ex: "O Líder Inspirador"

// ================================
// EXEMPLO 2: Adicionando regra customizada
// ================================

// Adicione esta regra ao array CUSTOM_RESULT_RULES em result-config.ts
const customRule: ResultRule = {
  id: "young_entrepreneur",
  name: "Jovem Empreendedor",
  priority: 9,
  conditions: [
    { type: "age_range", minAge: 18, maxAge: 30 },
    { type: "minimum_percentage", temperament: Temperament.COLERICO, minPercentage: 45 },
    { type: "minimum_percentage", temperament: Temperament.SANGUINEO, minPercentage: 35 }
  ],
  result: {
    title: "O Jovem Empreendedor",
    description: "Você combina a energia da juventude com uma forte inclinação para liderança e comunicação, características ideais para o empreendedorismo.",
    characteristics: [
      "Ambição e visão empreendedora",
      "Facilidade para networking",
      "Energia para assumir riscos calculados",
      "Capacidade de inspirar investidores e equipes"
    ],
    strengths: [
      "Identificação de oportunidades",
      "Construção de relacionamentos estratégicos",
      "Liderança de times jovens",
      "Adaptação rápida ao mercado"
    ],
    developmentAreas: [
      "Desenvolver paciência com processos longos",
      "Melhorar análise financeira",
      "Fortalecer planejamento estratégico",
      "Praticar gestão de riscos"
    ]
  }
};

// ================================
// EXEMPLO 3: Configurações específicas por setor
// ================================

// Regras para profissionais de tecnologia
const techProfessionalRules: Partial<ResultRule>[] = [
  {
    id: "tech_leader_melancolico_colerico",
    name: "Líder Técnico",
    priority: 8,
    conditions: [
      { type: "combination", temperaments: [Temperament.MELANCOLICO, Temperament.COLERICO] },
      { type: "minimum_percentage", temperament: Temperament.MELANCOLICO, minPercentage: 40 },
      { type: "minimum_percentage", temperament: Temperament.COLERICO, minPercentage: 35 }
    ],
    result: {
      title: "O Arquiteto de Soluções",
      description: "Você combina profundidade técnica com capacidade de liderança, sendo ideal para posições de arquitetura e gestão técnica.",
      characteristics: [
        "Visão técnica aprofundada",
        "Capacidade de tomar decisões técnicas complexas",
        "Liderança baseada em competência",
        "Foco em qualidade e excelência"
      ],
      strengths: [
        "Design de arquiteturas complexas",
        "Mentoria técnica de equipes",
        "Análise de trade-offs técnicos",
        "Implementação de best practices"
      ],
      developmentAreas: [
        "Melhorar comunicação com stakeholders não-técnicos",
        "Desenvolver habilidades de produto",
        "Praticar delegação técnica",
        "Balancear perfeição com prazos"
      ]
    }
  }
];

// ================================
// EXEMPLO 4: Configuração por contexto cultural
// ================================

// Configurações específicas para cultura brasileira
const brazilianCulturalAdaptations = {
  sanguineo: {
    culturalStrengths: [
      "Jeitinho brasileiro para resolver problemas",
      "Facilidade com relacionamentos calorosos",
      "Adaptabilidade ao ambiente dinâmico brasileiro"
    ],
    culturalChallenges: [
      "Manter formalidade em ambientes corporativos",
      "Equilibrar sociabilidade com produtividade",
      "Adaptar comunicação direta para contextos hierárquicos"
    ]
  },
  // ... outras configurações culturais
};

// ================================
// EXEMPLO 5: Integração com APIs externas
// ================================

class EnhancedQuizResultEngine extends QuizResultEngine {
  
  // Método para integrar com APIs de desenvolvimento profissional
  static async getCareerRecommendations(result: any) {
    const careerAPI = `https://api.careers.com/recommendations`;
    
    try {
      const response = await fetch(careerAPI, {
        method: 'POST',
        body: JSON.stringify({
          temperament: result.dominantTemperament,
          percentages: result.temperamentScores,
          age: result.age
        })
      });
      
      return await response.json();
    } catch (error) {
      console.log('Usando recomendações locais como fallback');
      return this.getLocalCareerRecommendations(result.dominantTemperament);
    }
  }
  
  private static getLocalCareerRecommendations(temperament: Temperament) {
    const recommendations = {
      [Temperament.SANGUINEO]: [
        "Vendas e Marketing",
        "Relações Públicas", 
        "Recursos Humanos",
        "Entretenimento"
      ],
      [Temperament.COLERICO]: [
        "Gestão Executiva",
        "Empreendedorismo",
        "Consultoria Estratégica",
        "Liderança de Projetos"
      ],
      [Temperament.MELANCOLICO]: [
        "Pesquisa e Desenvolvimento",
        "Arquitetura",
        "Design",
        "Análise de Dados"
      ],
      [Temperament.FLEUMATICO]: [
        "Mediação e Diplomacia",
        "Educação",
        "Serviço Social",
        "Administração"
      ]
    };
    
    return recommendations[temperament] || [];
  }
}

// ================================
// EXEMPLO 6: Validação e testes
// ================================

// Função para testar uma configuração de resultado
function testResultConfiguration(responses: any[], age: number, expectedResultId: string) {
  const result = QuizResultEngine.calculateResult(responses, age);
  
  console.log(`Idade: ${age}`);
  console.log(`Temperamento dominante: ${result.dominantTemperament}`);
  console.log(`Título: ${result.title}`);
  console.log(`Descrição: ${result.description.substring(0, 100)}...`);
  
  // Verificar se o resultado está correto
  return result.title.toLowerCase().includes(expectedResultId.toLowerCase());
}

// Casos de teste
const testCases = [
  {
    name: "Sanguíneo puro jovem",
    responses: Array(12).fill({ temperament: Temperament.SANGUINEO }),
    age: 22,
    expectedTitle: "comunicador"
  },
  {
    name: "Combinação Sanguíneo-Colérico adulto", 
    responses: [
      ...Array(6).fill({ temperament: Temperament.SANGUINEO }),
      ...Array(5).fill({ temperament: Temperament.COLERICO }),
      { temperament: Temperament.FLEUMATICO }
    ],
    age: 35,
    expectedTitle: "líder inspirador"
  }
];

// Executar testes
testCases.forEach(testCase => {
  console.log(`\nTestando: ${testCase.name}`);
  const passed = testResultConfiguration(
    testCase.responses, 
    testCase.age, 
    testCase.expectedTitle
  );
  console.log(`Resultado: ${passed ? 'PASSOU' : 'FALHOU'}`);
});

export { 
  EnhancedQuizResultEngine,
  customRule,
  techProfessionalRules,
  brazilianCulturalAdaptations 
};
