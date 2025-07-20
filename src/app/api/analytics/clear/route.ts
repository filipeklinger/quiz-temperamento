import { NextResponse } from 'next/server';
import { db } from '@/db';
import { quizResults } from '@/db/schema';

export async function DELETE() {
  try {
    // Deletar todos os resultados do quiz
    const deletedResults = await db.delete(quizResults);
    
    console.log('🗑️ All quiz results deleted');
    
    return NextResponse.json({
      success: true,
      message: 'Todos os resultados foram deletados com sucesso'
    });
  } catch (error) {
    console.error('Error deleting quiz results:', error);
    return NextResponse.json(
      { success: false, error: 'Falha ao deletar os resultados' },
      { status: 500 }
    );
  }
}
