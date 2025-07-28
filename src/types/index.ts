export interface Question {
  id: string;
  title: string;
  group: TemperamentGroup;
  answers: Answer[];
}

export interface Answer {
  id: string;
  text: string;
  temperament: Temperament;
  questionId: string;
}

export enum Temperament {
  SANGUINEO = 'sanguineo',
  COLERICO = 'colerico',
  MELANCOLICO = 'melancolico',
  FLEUMATICO = 'fleumatico'
}

export enum TemperamentGroup {
  GROUP_A = 'group_a',
  GROUP_B = 'group_b',
  GROUP_C = 'group_c',
  GROUP_D = 'group_d'
}

export interface QuizResponse {
  questionId: string;
  answerId: string;
  temperament: Temperament;
}

export interface QuizResult {
  dominantTemperament: Temperament;
  temperamentScores: Record<Temperament, number>;
  age: number;
  description: string;
  title: string;
  totalQuestions?: number;
  timeToComplete?: number; // em segundos
  startedAt?: Date;
}

export interface User {
  id: string;
  birthDate: Date;
  age: number;
  createdAt: Date;
}

export interface QuizSession {
  id: string;
  userId: string;
  responses: QuizResponse[];
  currentQuestionIndex: number;
  isCompleted: boolean;
  result?: QuizResult;
  createdAt: Date;
  completedAt?: Date;
}
