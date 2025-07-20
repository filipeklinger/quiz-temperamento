import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { questions, answers } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: questionId } = await params;

    // Buscar pergunta com respostas
    const questionWithAnswers = await db
      .select()
      .from(questions)
      .leftJoin(answers, eq(questions.id, answers.questionId))
      .where(eq(questions.id, questionId));

    if (questionWithAnswers.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Question not found' },
        { status: 404 }
      );
    }

    const question = questionWithAnswers[0].questions;
    const questionAnswers = questionWithAnswers
      .filter(row => row.answers !== null)
      .map(row => row.answers!);

    return NextResponse.json({
      success: true,
      question: {
        id: question.id,
        title: question.title,
        group: question.group,
        answers: questionAnswers
      }
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch question' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: questionId } = await params;
    const data = await request.json();

    // Atualizar pergunta
    await db
      .update(questions)
      .set({
        title: data.title,
        group: data.group,
        updatedAt: new Date(),
      })
      .where(eq(questions.id, questionId));

    // Deletar respostas antigas
    await db.delete(answers).where(eq(answers.questionId, questionId));

    // Inserir novas respostas
    const answerPromises = data.answers.map((answer: any) =>
      db.insert(answers).values({
        questionId: questionId,
        text: answer.text,
        temperament: answer.temperament,
      })
    );

    await Promise.all(answerPromises);

    return NextResponse.json({
      success: true,
      id: questionId
    });
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: questionId } = await params;

    // Deletar respostas primeiro (foreign key constraint)
    await db.delete(answers).where(eq(answers.questionId, questionId));

    // Deletar pergunta
    await db.delete(questions).where(eq(questions.id, questionId));

    return NextResponse.json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}
