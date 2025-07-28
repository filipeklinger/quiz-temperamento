export interface UserResult {
  id: string;
  birthDate: Date;
  age: number;
  dominantTemperament: string;
  temperamentScores: Record<string, number>;
  totalQuestions: number;
  timeToComplete: number | null; // em segundos
  startedAt: Date | null;
  completedAt: Date;
  createdAt: Date;
}

export interface AnalyticsData {
  totalUsers: number;
  temperamentDistribution: Record<string, number>;
  ageDistribution: Record<string, number>;
  results: UserResult[];
}
