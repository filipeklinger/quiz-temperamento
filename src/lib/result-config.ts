import { Temperament } from "@/types";
import { ResultRule } from "./result-engine";

/**
 * Configurações personalizáveis para os resultados do quiz.
 * Este arquivo permite ajustar facilmente os critérios e conteúdos dos resultados.
 */

// Thresholds para classificação de temperamentos baseado nas novas regras
export const TEMPERAMENT_THRESHOLDS = {
  // Regra 1: Temperamento Puro
  PURE_MIN_PERCENTAGE: 50,           // >= 50% = temperamento puro
  PURE_MIN_DIFFERENCE: 20,           // >= 20% de diferença para o segundo = temperamento puro
  
  // Regra 2: Temperamento Misto (dupla dominante)
  MIXED_MAX_DIFFERENCE: 15,          // <= 15% de diferença entre primeiro e segundo = misto
  MIXED_MIN_TOTAL: 70,               // >= 70% somados = misto válido
  
  // Regra 3: Temperamento Equilibrado  
  BALANCED_MAX_RANGE: 20,            // <= 20% de diferença entre maior e menor = equilibrado
  
  // Regra 4: Predominância parcial
  PARTIAL_MIN_FIRST: 40,             // >= 40% no primeiro
  PARTIAL_MAX_FIRST: 50,             // <= 50% no primeiro  
  PARTIAL_MIN_SECOND: 25,            // >= 25% no segundo
  PARTIAL_MAX_SECOND: 35             // <= 35% no segundo
} as const;

// Faixas etárias para personalização
export const AGE_GROUPS = {
  YOUNG: { min: 0, max: 24, label: "jovem" },
  ADULT: { min: 25, max: 44, label: "adulto" },  
  MATURE: { min: 45, max: 150, label: "maduro" }
} as const;

// Configurações específicas por temperamento
export const TEMPERAMENT_CONFIGS = {
  [Temperament.SANGUINEO]: {
    color: "#FF6B6B",
    icon: "🌟",
    keywords: ["sociável", "otimista", "energético", "comunicativo"]
  },
  [Temperament.COLERICO]: {
    color: "#4ECDC4", 
    icon: "⚡",
    keywords: ["líder", "determinado", "ambicioso", "decisivo"]
  },
  [Temperament.MELANCOLICO]: {
    color: "#45B7D1",
    icon: "🎨", 
    keywords: ["analítico", "criativo", "perfeccionista", "reflexivo"]
  },
  [Temperament.FLEUMATICO]: {
    color: "#96CEB4",
    icon: "🕊️",
    keywords: ["calmo", "leal", "equilibrado", "pacificador"]
  }
} as const;

// Regras customizáveis de resultado
export const CUSTOM_RESULT_RULES: Partial<ResultRule>[] = [
  // Você pode adicionar regras personalizadas aqui
  // Exemplo:
  // {
  //   id: "sanguineo_young_leader",
  //   name: "Jovem Líder Sanguíneo",
  //   priority: 9,
  //   conditions: [
  //     { type: "dominant", temperament: Temperament.SANGUINEO },
  //     { type: "age_range", minAge: 18, maxAge: 25 },
  //     { type: "minimum_percentage", temperament: Temperament.COLERICO, minPercentage: 30 }
  //   ],
  //   result: {
  //     title: "O Jovem Líder Carismático",
  //     description: "Sua combinação de energia juvenil com carisma natural...",
  //     // ... resto da configuração
  //   }
  // }
];

// Mensagens personalizadas por faixa etária
export const AGE_SPECIFIC_MESSAGES = {
  YOUNG: {
    prefix: "Como uma pessoa jovem,",
    suffix: "você tem uma grande oportunidade de desenvolver ainda mais essas características e explorar seu potencial.",
    developmentFocus: "Foque em construir bons hábitos e desenvolver suas habilidades naturais."
  },
  ADULT: {
    prefix: "Nesta fase adulta da vida,",
    suffix: "você pode aproveitar essas características para consolidar sua carreira e relacionamentos.",
    developmentFocus: "Use suas forças para liderar projetos e mentorear outros."
  },
  MATURE: {
    prefix: "Com sua experiência de vida,",
    suffix: "você pode usar essas características para ser um mentor e exemplo para outros.",
    developmentFocus: "Compartilhe sua sabedoria e continue crescendo pessoalmente."
  }
} as const;

// Configurações de combinações especiais
export const SPECIAL_COMBINATIONS = {
  "sanguineo_colerico": {
    name: "Líder Inspirador",
    description: "A combinação perfeita de carisma e determinação",
    strengthMultiplier: 1.2
  },
  "melancolico_fleumatico": {
    name: "Analista Sereno", 
    description: "Profundidade de pensamento com estabilidade emocional",
    strengthMultiplier: 1.1
  },
  "sanguineo_fleumatico": {
    name: "Comunicador Equilibrado",
    description: "Sociabilidade equilibrada com estabilidade",
    strengthMultiplier: 1.1
  },
  "colerico_melancolico": {
    name: "Estrategista Determinado",
    description: "Visão analítica com força de execução",
    strengthMultiplier: 1.2
  }
} as const;

// Configurações para desenvolvimento pessoal
export const DEVELOPMENT_SUGGESTIONS = {
  [Temperament.SANGUINEO]: {
    primary: ["Desenvolver disciplina", "Melhorar foco", "Praticar escuta ativa"],
    secondary: ["Gestão do tempo", "Persistência", "Organização"],
    books: ["Como Fazer Amigos e Influenciar Pessoas", "O Poder do Hábito"],
    activities: ["Networking", "Apresentações públicas", "Trabalho em equipe"]
  },
  [Temperament.COLERICO]: {
    primary: ["Desenvolver paciência", "Melhorar delegação", "Praticar empatia"],
    secondary: ["Escuta ativa", "Flexibilidade", "Gestão de conflitos"],
    books: ["Liderança Radical", "Inteligência Emocional"],
    activities: ["Mentoria", "Liderança de projetos", "Esportes competitivos"]
  },
  [Temperament.MELANCOLICO]: {
    primary: ["Reduzir perfeccionismo", "Aumentar confiança", "Praticar otimismo"],
    secondary: ["Networking", "Comunicação", "Adaptabilidade"],
    books: ["Mindset", "O Lado Bom do Mal Humor"],
    activities: ["Arte", "Pesquisa", "Planejamento estratégico"]
  },
  [Temperament.FLEUMATICO]: {
    primary: ["Desenvolver iniciativa", "Melhorar assertividade", "Acelerar decisões"],
    secondary: ["Liderança", "Motivação", "Comunicação direta"],
    books: ["Desperte o Gigante Interior", "A Coragem de Ser Imperfeito"],
    activities: ["Mediação", "Trabalho em equipe", "Voluntariado"]
  }
} as const;
