import { Question, QuizResponse, QuizResult, Temperament, TemperamentGroup } from "@/types";

export function calculateQuizResult(responses: QuizResponse[], age: number): QuizResult {
  // Contar pontuação por temperamento
  const temperamentScores: Record<Temperament, number> = {
    [Temperament.SANGUINEO]: 0,
    [Temperament.COLERICO]: 0,
    [Temperament.MELANCOLICO]: 0,
    [Temperament.FLEUMATICO]: 0
  };

  responses.forEach(response => {
    temperamentScores[response.temperament]++;
  });

  // Encontrar temperamento dominante
  const dominantTemperament = Object.entries(temperamentScores).reduce((a, b) => 
    temperamentScores[a[0] as Temperament] > temperamentScores[b[0] as Temperament] ? a : b
  )[0] as Temperament;

  // Gerar título e descrição baseados no temperamento e idade
  const { title, description } = generateResultContent(dominantTemperament, age);

  return {
    dominantTemperament,
    temperamentScores,
    age,
    title,
    description
  };
}

function generateResultContent(temperament: Temperament, age: number): { title: string; description: string } {
  const ageGroup = age < 25 ? "jovem" : age < 45 ? "adulto" : "maduro";
  
  const templates = {
    [Temperament.SANGUINEO]: {
      title: "O Comunicador Natural",
      description: `Como uma pessoa ${ageGroup} com temperamento sanguíneo, você é naturalmente otimista e sociável. Sua energia contagiante e capacidade de se conectar com as pessoas fazem de você um excelente comunicador. Você tende a ser espontâneo e adora estar cercado de pessoas.`
    },
    [Temperament.COLERICO]: {
      title: "O Líder Nato",
      description: `Sendo ${ageGroup} com temperamento colérico, você possui uma personalidade forte e determinada. Você é naturalmente ambicioso e tem facilidade para liderar projetos e pessoas. Sua energia e foco em resultados fazem de você alguém que não desiste facilmente dos seus objetivos.`
    },
    [Temperament.MELANCOLICO]: {
      title: "O Pensador Profundo",
      description: `Como uma pessoa ${ageGroup} com temperamento melancólico, você é naturalmente analítica e detalhista. Sua criatividade e busca pela perfeição fazem de você alguém que valoriza a qualidade em tudo que faz. Você tende a ser mais introspectivo e reflexivo.`
    },
    [Temperament.FLEUMATICO]: {
      title: "O Pacificador",
      description: `Sendo ${ageGroup} com temperamento fleumático, você é uma pessoa calma e equilibrada. Sua lealdade e capacidade de mediar conflitos fazem de você um excelente amigo e companheiro de equipe. Você valoriza a estabilidade e a harmonia nos relacionamentos.`
    }
  };

  return templates[temperament];
}

export function selectQuestionsForQuiz(allQuestions: Question[]): Question[] {
  // Agrupar perguntas por grupo
  const questionsByGroup = allQuestions.reduce((acc, question) => {
    if (!acc[question.group]) {
      acc[question.group] = [];
    }
    acc[question.group].push(question);
    return acc;
  }, {} as Record<TemperamentGroup, Question[]>);

  // Selecionar 3 perguntas de cada grupo aleatoriamente
  const selectedQuestions: Question[] = [];
  
  Object.values(TemperamentGroup).forEach(group => {
    const groupQuestions = questionsByGroup[group] || [];
    const shuffled = [...groupQuestions].sort(() => Math.random() - 0.5);
    selectedQuestions.push(...shuffled.slice(0, 3));
  });

  // Embaralhar a ordem final das perguntas
  return selectedQuestions.sort(() => Math.random() - 0.5);
}

export function validateQuizSession(responses: QuizResponse[]): boolean {
  // Verificar se há pelo menos 3 respostas de cada grupo
  const groupCounts: Record<TemperamentGroup, number> = {
    [TemperamentGroup.GROUP_A]: 0,
    [TemperamentGroup.GROUP_B]: 0,
    [TemperamentGroup.GROUP_C]: 0,
    [TemperamentGroup.GROUP_D]: 0
  };

  // Esta validação precisaria das perguntas originais para funcionar corretamente
  // Por enquanto, vamos apenas verificar se há pelo menos 12 respostas (3 de cada grupo)
  return responses.length >= 12;
}
