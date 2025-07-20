import { pgTable, serial, text, timestamp, integer, json, varchar, uuid } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// Tabela de usuários (para futuras expansões)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabela de perguntas
export const questions = pgTable('questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  group: varchar('group', { length: 50 }).notNull(), // 'GROUP_A', 'GROUP_B', etc.
  isActive: integer('is_active').default(1), // 1 = ativo, 0 = inativo
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabela de respostas das perguntas
export const answers = pgTable('answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  questionId: uuid('question_id').references(() => questions.id).notNull(),
  text: text('text').notNull(),
  temperament: varchar('temperament', { length: 50 }).notNull(), // 'sanguineo', 'colerico', etc.
  createdAt: timestamp('created_at').defaultNow(),
});

// Tabela de resultados dos quizzes
export const quizResults = pgTable('quiz_results', {
  id: uuid('id').primaryKey().defaultRandom(),
  birthDate: timestamp('birth_date').notNull(),
  age: integer('age').notNull(),
  dominantTemperament: varchar('dominant_temperament', { length: 50 }).notNull(),
  temperamentScores: json('temperament_scores').notNull(), // JSON com as pontuações
  userAgent: text('user_agent'), // Para analytics básicas
  ipAddress: varchar('ip_address', { length: 45 }), // IPv4 ou IPv6
  completedAt: timestamp('completed_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Tabela de sessões de quiz (para futura implementação de progresso)
export const quizSessions = pgTable('quiz_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: varchar('session_id', { length: 255 }).unique().notNull(),
  currentQuestionIndex: integer('current_question_index').default(0),
  responses: json('responses'), // Array de respostas
  isCompleted: integer('is_completed').default(0),
  resultId: uuid('result_id').references(() => quizResults.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tipos TypeScript inferidos
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Question = InferSelectModel<typeof questions>;
export type NewQuestion = InferInsertModel<typeof questions>;

export type Answer = InferSelectModel<typeof answers>;
export type NewAnswer = InferInsertModel<typeof answers>;

export type QuizResult = InferSelectModel<typeof quizResults>;
export type NewQuizResult = InferInsertModel<typeof quizResults>;

export type QuizSession = InferSelectModel<typeof quizSessions>;
export type NewQuizSession = InferInsertModel<typeof quizSessions>;
