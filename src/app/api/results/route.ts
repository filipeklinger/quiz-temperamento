import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { quizResults } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Obter informações da requisição para analytics
    const userAgent = request.headers.get('user-agent') || '';
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ipAddress = forwarded ? forwarded.split(',')[0] : realIp || 'unknown';

    const [result] = await db.insert(quizResults).values({
      birthDate: new Date(data.birthDate),
      age: data.age,
      dominantTemperament: data.dominantTemperament,
      temperamentScores: data.temperamentScores,
      userAgent,
      ipAddress,
    }).returning();

    return NextResponse.json({ 
      success: true, 
      id: result.id 
    });
  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save result' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const results = await db
      .select()
      .from(quizResults)
      .orderBy(desc(quizResults.completedAt));
    
    return NextResponse.json({
      success: true,
      results: results
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}
