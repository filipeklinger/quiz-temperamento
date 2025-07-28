import { Temperament, QuizResult, QuizResponse } from "@/types";
import { 
  TEMPERAMENT_THRESHOLDS, 
  AGE_GROUPS, 
  AGE_SPECIFIC_MESSAGES,
  SPECIAL_COMBINATIONS,
  CUSTOM_RESULT_RULES 
} from "./result-config";

// Tipos para configuração de resultados
export interface TemperamentPercentage {
  temperament: Temperament;
  percentage: number;
}

export interface ResultRule {
  id: string;
  name: string;
  conditions: ResultCondition[];
  result: ResultTemplate;
  priority: number; // Maior prioridade = processado primeiro
}

export interface ResultCondition {
  type: 'dominant' | 'combination' | 'minimum_percentage' | 'age_range' | 'pure_temperament' | 'mixed_dominant' | 'balanced' | 'partial_dominance';
  temperament?: Temperament;
  temperaments?: Temperament[];
  minPercentage?: number;
  maxPercentage?: number;
  minAge?: number;
  maxAge?: number;
}

export interface ResultTemplate {
  title: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  developmentAreas: string[];
}

// Configurações de resultados baseadas nas novas regras
export const RESULT_CONFIGURATIONS: ResultRule[] = [
  // Temperamentos puros
  {
    id: "sanguineo_pure",
    name: "Sanguíneo Puro",
    priority: 10,
    conditions: [
      { type: "pure_temperament", temperament: Temperament.SANGUINEO }
    ],
    result: {
      title: "O Comunicador Natural",
      description: "Você possui um temperamento sanguíneo muito bem definido, sendo naturalmente otimista, sociável e energético.",
      characteristics: [
        "Extremamente sociável e comunicativo",
        "Otimista e entusiástico",
        "Espontâneo e expressivo",
        "Gosta de ser o centro das atenções"
      ],
      strengths: [
        "Capacidade excepcional de motivar outros",
        "Facilidade para fazer novos amigos",
        "Adaptabilidade em situações sociais",
        "Criatividade e inovação"
      ],
      developmentAreas: [
        "Desenvolver mais disciplina e foco",
        "Melhorar a gestão do tempo",
        "Praticar a escuta ativa",
        "Trabalhar a persistência em projetos longos"
      ]
    }
  },
  
  {
    id: "colerico_pure",
    name: "Colérico Puro", 
    priority: 10,
    conditions: [
      { type: "pure_temperament", temperament: Temperament.COLERICO }
    ],
    result: {
      title: "O Líder Nato",
      description: "Você possui um temperamento colérico muito bem definido, sendo naturalmente determinado, ambicioso e orientado a resultados.",
      characteristics: [
        "Liderança natural e assertividade",
        "Orientado a objetivos e resultados",
        "Decisivo e confiante",
        "Gosta de desafios e competição"
      ],
      strengths: [
        "Capacidade de tomar decisões rápidas",
        "Habilidade para inspirar e dirigir equipes",
        "Determinação inabalável",
        "Visão estratégica clara"
      ],
      developmentAreas: [
        "Desenvolver mais paciência com outros",
        "Melhorar habilidades de escuta",
        "Praticar delegação efetiva",
        "Trabalhar a flexibilidade"
      ]
    }
  },

  {
    id: "melancolico_pure",
    name: "Melancólico Puro",
    priority: 10,
    conditions: [
      { type: "pure_temperament", temperament: Temperament.MELANCOLICO }
    ],
    result: {
      title: "O Pensador Profundo",
      description: "Você possui um temperamento melancólico muito bem definido, sendo naturalmente analítico, criativo e perfeccionista.",
      characteristics: [
        "Analítico e detalhista",
        "Criativo e artístico",
        "Perfeccionista e organizado",
        "Reflexivo e introspectivo"
      ],
      strengths: [
        "Capacidade de análise profunda",
        "Atenção excepcional aos detalhes",
        "Criatividade e sensibilidade artística",
        "Planejamento cuidadoso"
      ],
      developmentAreas: [
        "Reduzir o perfeccionismo excessivo",
        "Desenvolver mais confiança social",
        "Trabalhar a flexibilidade com mudanças",
        "Praticar o otimismo"
      ]
    }
  },

  {
    id: "fleumatico_pure",
    name: "Fleumático Puro",
    priority: 10,
    conditions: [
      { type: "pure_temperament", temperament: Temperament.FLEUMATICO }
    ],
    result: {
      title: "O Pacificador",
      description: "Você possui um temperamento fleumático muito bem definido, sendo naturalmente calmo, leal e equilibrado.",
      characteristics: [
        "Calmo e equilibrado",
        "Leal e confiável",
        "Diplomático e pacificador",
        "Estável e consistente"
      ],
      strengths: [
        "Excelente mediador de conflitos",
        "Lealdade e confiabilidade",
        "Estabilidade emocional",
        "Capacidade de trabalhar em equipe"
      ],
      developmentAreas: [
        "Desenvolver mais iniciativa",
        "Melhorar a tomada de decisões",
        "Praticar a assertividade",
        "Trabalhar a motivação pessoal"
      ]
    }
  },

  // Temperamentos mistos (dupla dominante)
  {
    id: "mixed_temperament",
    name: "Temperamento Misto",
    priority: 8,
    conditions: [
      { type: "mixed_dominant" }
    ],
    result: {
      title: "Temperamento Misto", // Será personalizado dinamicamente
      description: "Você possui uma combinação equilibrada de dois temperamentos dominantes, o que lhe proporciona versatilidade e adaptabilidade únicas.",
      characteristics: [
        "Versatilidade comportamental",
        "Adaptação situacional",
        "Equilíbrio entre diferentes aspectos",
        "Compreensão múltipla de perspectivas"
      ],
      strengths: [
        "Flexibilidade em diferentes contextos",
        "Capacidade de liderar e colaborar",
        "Comunicação adaptável",
        "Resolução criativa de problemas"
      ],
      developmentAreas: [
        "Definir prioridades claras",
        "Fortalecer características principais",
        "Desenvolver consistência",
        "Focar em pontos fortes específicos"
      ]
    }
  },

  // Temperamento equilibrado
  {
    id: "balanced_temperament",
    name: "Temperamento Equilibrado",
    priority: 6,
    conditions: [
      { type: "balanced" }
    ],
    result: {
      title: "Personalidade Equilibrada",
      description: "Você possui um equilíbrio notável entre todos os temperamentos, demonstrando grande versatilidade e capacidade de adaptação.",
      characteristics: [
        "Equilíbrio entre todos os aspectos",
        "Versatilidade excepcional",
        "Adaptabilidade situacional",
        "Compreensão ampla de diferentes perspectivas"
      ],
      strengths: [
        "Mediação natural de conflitos",
        "Adaptação a diversos ambientes",
        "Compreensão empática de outros",
        "Flexibilidade comportamental"
      ],
      developmentAreas: [
        "Desenvolver especialização em área de interesse",
        "Fortalecer características dominantes",
        "Definir objetivos mais específicos",
        "Buscar liderança em área de paixão"
      ]
    }
  },

  // Predominância parcial
  {
    id: "partial_dominance",
    name: "Predominância Parcial",
    priority: 4,
    conditions: [
      { type: "partial_dominance" }
    ],
    result: {
      title: "Predominância Parcial", // Será personalizado dinamicamente
      description: "Você demonstra uma tendência clara para um temperamento específico, complementado por características secundárias bem definidas.",
      characteristics: [
        "Tendência comportamental clara",
        "Características secundárias definidas",
        "Flexibilidade situacional",
        "Adaptação contextual"
      ],
      strengths: [
        "Direcionamento claro de personalidade",
        "Flexibilidade quando necessário",
        "Compreensão de diferentes abordagens",
        "Adaptação a situações variadas"
      ],
      developmentAreas: [
        "Fortalecer características dominantes",
        "Desenvolver aspectos secundários",
        "Buscar clareza em objetivos",
        "Ampliar zona de conforto"
      ]
    }
  },

  // Resultado genérico para casos não cobertos
  {
    id: "undefined_pattern",
    name: "Padrão Indefinido",
    priority: 1,
    conditions: [], // Sem condições específicas - será usado como fallback
    result: {
      title: "Perfil em Desenvolvimento",
      description: "Seu perfil apresenta características únicas que não se encaixam nos padrões tradicionais, indicando uma personalidade em constante evolução.",
      characteristics: [
        "Personalidade única e individual",
        "Características em desenvolvimento",
        "Potencial de crescimento",
        "Flexibilidade natural"
      ],
      strengths: [
        "Originalidade e autenticidade",
        "Capacidade de crescimento",
        "Adaptabilidade natural",
        "Potencial inexplorado"
      ],
      developmentAreas: [
        "Explorar diferentes aspectos da personalidade",
        "Identificar pontos fortes naturais",
        "Experimentar diferentes abordagens",
        "Buscar autoconhecimento contínuo"
      ]
    }
  }
];

// Engine principal para cálculo de resultados
export class QuizResultEngine {
  
  static calculateResult(responses: QuizResponse[], age: number): QuizResult {
    // Calcular porcentagens dos temperamentos
    const percentages = this.calculateTemperamentPercentages(responses);
    
    // Encontrar a regra aplicável
    const applicableRule = this.findApplicableRule(percentages, age);
    
    // Personalizar resultado baseado na idade
    const personalizedResult = this.personalizeForAge(applicableRule.result, age, percentages);
    
    // Encontrar temperamento dominante
    const dominantTemperament = this.getDominantTemperament(percentages);
    
    return {
      dominantTemperament,
      temperamentScores: this.convertPercentagesToScores(percentages, responses.length),
      age,
      title: personalizedResult.title,
      description: personalizedResult.description
    };
  }

  private static calculateTemperamentPercentages(responses: QuizResponse[]): Record<Temperament, number> {
    const counts: Record<Temperament, number> = {
      [Temperament.SANGUINEO]: 0,
      [Temperament.COLERICO]: 0,
      [Temperament.MELANCOLICO]: 0,
      [Temperament.FLEUMATICO]: 0
    };

    responses.forEach(response => {
      counts[response.temperament]++;
    });

    const total = responses.length;
    const percentages: Record<Temperament, number> = {
      [Temperament.SANGUINEO]: Math.round((counts[Temperament.SANGUINEO] / total) * 100),
      [Temperament.COLERICO]: Math.round((counts[Temperament.COLERICO] / total) * 100),
      [Temperament.MELANCOLICO]: Math.round((counts[Temperament.MELANCOLICO] / total) * 100),
      [Temperament.FLEUMATICO]: Math.round((counts[Temperament.FLEUMATICO] / total) * 100)
    };

    return percentages;
  }

  private static findApplicableRule(percentages: Record<Temperament, number>, age: number): ResultRule {
    // Combinar regras padrão com regras customizáveis
    const allRules = [...RESULT_CONFIGURATIONS, ...CUSTOM_RESULT_RULES.filter(rule => rule.id && rule.conditions && rule.result)] as ResultRule[];
    
    // Ordenar regras por prioridade (maior primeiro)
    const sortedRules = allRules.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    
    for (const rule of sortedRules) {
      if (this.evaluateConditions(rule.conditions, percentages, age)) {
        return rule;
      }
    }
    
    // Fallback para regra genérica
    return RESULT_CONFIGURATIONS.find(rule => rule.id === "balanced_temperament")!;
  }

  private static evaluateConditions(
    conditions: ResultCondition[], 
    percentages: Record<Temperament, number>, 
    age: number
  ): boolean {
    return conditions.every(condition => {
      switch (condition.type) {
        case 'dominant':
          return this.getDominantTemperament(percentages) === condition.temperament;
        
        case 'combination':
          if (!condition.temperaments) return false;
          return condition.temperaments.every(temp => 
            percentages[temp] >= (condition.minPercentage || 40)
          );
        
        case 'minimum_percentage':
          if (!condition.temperament) return false;
          return percentages[condition.temperament] >= (condition.minPercentage || 0);
        
        case 'age_range':
          const minAge = condition.minAge || 0;
          const maxAge = condition.maxAge || 150;
          return age >= minAge && age <= maxAge;
        
        case 'pure_temperament':
          if (!condition.temperament) return false;
          return this.isPureTemperament(percentages, condition.temperament);
        
        case 'mixed_dominant':
          return this.isMixedDominant(percentages);
        
        case 'balanced':
          return this.isBalanced(percentages);
        
        case 'partial_dominance':
          return this.isPartialDominance(percentages);
        
        default:
          return true;
      }
    });
  }

  // Regra 1: Temperamento Puro
  private static isPureTemperament(percentages: Record<Temperament, number>, temperament: Temperament): boolean {
    const sorted = this.getSortedPercentages(percentages);
    const [maior, segundoMaior] = sorted;
    
    // Verificar se o temperamento é o dominante
    if (maior.temperament !== temperament) return false;
    
    // Regra: mais de 50% OU diferença >= 20% para o segundo lugar
    return maior.percentage > TEMPERAMENT_THRESHOLDS.PURE_MIN_PERCENTAGE || 
           (maior.percentage - segundoMaior.percentage) >= TEMPERAMENT_THRESHOLDS.PURE_MIN_DIFFERENCE;
  }

  // Regra 2: Temperamento Misto (dupla dominante)
  private static isMixedDominant(percentages: Record<Temperament, number>): boolean {
    const sorted = this.getSortedPercentages(percentages);
    const [maior, segundoMaior] = sorted;
    
    // Diferença <= 15% entre primeiro e segundo
    const diffOk = (maior.percentage - segundoMaior.percentage) <= TEMPERAMENT_THRESHOLDS.MIXED_MAX_DIFFERENCE;
    
    // Soma >= 70%
    const totalOk = (maior.percentage + segundoMaior.percentage) >= TEMPERAMENT_THRESHOLDS.MIXED_MIN_TOTAL;
    
    return diffOk && totalOk;
  }

  // Regra 3: Temperamento Equilibrado
  private static isBalanced(percentages: Record<Temperament, number>): boolean {
    const sorted = this.getSortedPercentages(percentages);
    const maior = sorted[0].percentage;
    const menor = sorted[3].percentage;
    
    // Diferença máxima entre maior e menor <= 20%
    return (maior - menor) <= TEMPERAMENT_THRESHOLDS.BALANCED_MAX_RANGE;
  }

  // Regra 4: Predominância parcial
  private static isPartialDominance(percentages: Record<Temperament, number>): boolean {
    const sorted = this.getSortedPercentages(percentages);
    const [maior, segundoMaior] = sorted;
    
    // Primeiro entre 40% e 50%
    const firstOk = maior.percentage >= TEMPERAMENT_THRESHOLDS.PARTIAL_MIN_FIRST && 
                    maior.percentage <= TEMPERAMENT_THRESHOLDS.PARTIAL_MAX_FIRST;
    
    // Segundo entre 25% e 35%
    const secondOk = segundoMaior.percentage >= TEMPERAMENT_THRESHOLDS.PARTIAL_MIN_SECOND && 
                     segundoMaior.percentage <= TEMPERAMENT_THRESHOLDS.PARTIAL_MAX_SECOND;
    
    return firstOk && secondOk;
  }

  // Método auxiliar para ordenar temperamentos por porcentagem
  private static getSortedPercentages(percentages: Record<Temperament, number>): Array<{temperament: Temperament, percentage: number}> {
    return Object.entries(percentages)
      .map(([temperament, percentage]) => ({ temperament: temperament as Temperament, percentage }))
      .sort((a, b) => b.percentage - a.percentage);
  }

  private static getDominantTemperament(percentages: Record<Temperament, number>): Temperament {
    return Object.entries(percentages).reduce((a, b) => 
      percentages[a[0] as Temperament] > percentages[b[0] as Temperament] ? a : b
    )[0] as Temperament;
  }

  private static convertPercentagesToScores(
    percentages: Record<Temperament, number>, 
    totalResponses: number
  ): Record<Temperament, number> {
    const scores: Record<Temperament, number> = {
      [Temperament.SANGUINEO]: Math.round((percentages[Temperament.SANGUINEO] / 100) * totalResponses),
      [Temperament.COLERICO]: Math.round((percentages[Temperament.COLERICO] / 100) * totalResponses),
      [Temperament.MELANCOLICO]: Math.round((percentages[Temperament.MELANCOLICO] / 100) * totalResponses),
      [Temperament.FLEUMATICO]: Math.round((percentages[Temperament.FLEUMATICO] / 100) * totalResponses)
    };
    
    return scores;
  }

  private static personalizeForAge(
    template: ResultTemplate, 
    age: number, 
    percentages: Record<Temperament, number>
  ): ResultTemplate {
    // Determinar grupo etário
    let ageGroup: keyof typeof AGE_SPECIFIC_MESSAGES;
    if (age <= AGE_GROUPS.YOUNG.max) {
      ageGroup = 'YOUNG';
    } else if (age <= AGE_GROUPS.ADULT.max) {
      ageGroup = 'ADULT';
    } else {
      ageGroup = 'MATURE';
    }
    
    const ageMessages = AGE_SPECIFIC_MESSAGES[ageGroup];
    
    // Personalizar título e descrição baseado no tipo de resultado
    let personalizedTitle = template.title;
    let personalizedDescription = template.description;
    
    // Personalizar título para temperamentos mistos e predominância parcial
    if (template.title === "Temperamento Misto") {
      const sorted = this.getSortedPercentages(percentages);
      const [maior, segundoMaior] = sorted;
      personalizedTitle = `Misto: ${this.getTemperamentName(maior.temperament)} + ${this.getTemperamentName(segundoMaior.temperament)}`;
    } else if (template.title === "Predominância Parcial") {
      const sorted = this.getSortedPercentages(percentages);
      const [maior, segundoMaior] = sorted;
      personalizedTitle = `Predominantemente ${this.getTemperamentName(maior.temperament)} com traços de ${this.getTemperamentName(segundoMaior.temperament)}`;
    }
    
    // Adicionar personalização de idade
    personalizedDescription = `${personalizedDescription} ${ageMessages.prefix} ${ageMessages.suffix}`;
    
    return {
      ...template,
      title: personalizedTitle,
      description: personalizedDescription
    };
  }

  // Método auxiliar para obter nome amigável do temperamento
  private static getTemperamentName(temperament: Temperament): string {
    const names = {
      [Temperament.SANGUINEO]: "Sanguíneo",
      [Temperament.COLERICO]: "Colérico", 
      [Temperament.MELANCOLICO]: "Melancólico",
      [Temperament.FLEUMATICO]: "Fleumático"
    };
    return names[temperament];
  }
}
