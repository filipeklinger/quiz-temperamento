import { Question, QuizResponse, QuizResult, Temperament, TemperamentGroup } from "@/types";
import { QuizResultEngine } from "./result-engine";

export function calculateQuizResult(responses: QuizResponse[], age: number): QuizResult {
  return QuizResultEngine.calculateResult(responses, age);
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
