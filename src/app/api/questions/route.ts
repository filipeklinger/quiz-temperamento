import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { questions, answers } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    // Buscar todas as perguntas com suas respostas
    const questionsWithAnswers = await db
      .select()
      .from(questions)
      .leftJoin(answers, eq(questions.id, answers.questionId))
      .where(eq(questions.isActive, 1));

    // Agrupar respostas por pergunta
    const groupedQuestions = questionsWithAnswers.reduce((acc, row) => {
      const question = row.questions;
      const answer = row.answers;

      if (!acc[question.id]) {
        acc[question.id] = {
          id: question.id,
          title: question.title,
          group: question.group,
          answers: []
        };
      }

      if (answer) {
        acc[question.id].answers.push({
          id: answer.id,
          text: answer.text,
          temperament: answer.temperament,
          questionId: answer.questionId
        });
      }

      return acc;
    }, {} as Record<string, any>);

    const result = Object.values(groupedQuestions);

    return NextResponse.json({
      success: true,
      questions: result
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Inserir pergunta
    const [newQuestion] = await db.insert(questions).values({
      title: data.title,
      group: data.group,
      isActive: 1,
    }).returning();

    // Inserir respostas
    const answerPromises = data.answers.map((answer: any) =>
      db.insert(answers).values({
        questionId: newQuestion.id,
        text: answer.text,
        temperament: answer.temperament,
      })
    );

    await Promise.all(answerPromises);

    return NextResponse.json({
      success: true,
      id: newQuestion.id
    });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create question' },
      { status: 500 }
    );
  }
}
