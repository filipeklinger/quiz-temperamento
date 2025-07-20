import { NextResponse } from 'next/server';
import { db } from '@/db';
import { quizResults } from '@/db/schema';
import { AnalyticsData } from '@/types/analytics';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    // Buscar todos os resultados do banco
    const results = await db
      .select()
      .from(quizResults)
      .orderBy(desc(quizResults.completedAt));

    // Calcular distribuição de temperamentos
    const temperamentDistribution: Record<string, number> = {
      'sanguineo': 0,
      'colerico': 0,
      'melancolico': 0,
      'fleumatico': 0
    };

    // Calcular distribuição de idades
    const ageDistribution: Record<string, number> = {
      '13-17': 0,
      '18-25': 0,
      '26-35': 0,
      '36-45': 0,
      '46-55': 0,
      '56+': 0
    };

    results.forEach((result) => {
      // Contar temperamentos
      temperamentDistribution[result.dominantTemperament]++;

      // Categorizar idades
      const age = result.age;
      if (age >= 13 && age <= 17) {
        ageDistribution['13-17']++;
      } else if (age >= 18 && age <= 25) {
        ageDistribution['18-25']++;
      } else if (age >= 26 && age <= 35) {
        ageDistribution['26-35']++;
      } else if (age >= 36 && age <= 45) {
        ageDistribution['36-45']++;
      } else if (age >= 46 && age <= 55) {
        ageDistribution['46-55']++;
      } else {
        ageDistribution['56+']++;
      }
    });

    const analyticsData: AnalyticsData = {
      totalUsers: results.length,
      temperamentDistribution,
      ageDistribution,
      results: results.map(result => ({
        id: result.id,
        birthDate: result.birthDate,
        age: result.age,
        dominantTemperament: result.dominantTemperament,
        temperamentScores: result.temperamentScores as Record<string, number>,
        completedAt: result.completedAt || result.createdAt || new Date(),
        createdAt: result.createdAt || new Date()
      }))
    };

    return NextResponse.json({
      success: true,
      data: analyticsData
    });
  } catch (error) {
    console.error('Error generating analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate analytics' },
      { status: 500 }
    );
  }
}
