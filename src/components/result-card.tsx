"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizResult, Temperament } from "@/types";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Share2, RefreshCw } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ResultCardProps {
  result: QuizResult;
  onRestart: () => void;
  onShare?: () => void;
}

const temperamentInfo = {
  [Temperament.SANGUINEO]: {
    title: "Sanguíneo",
    color: "bg-red-500",
    chartColor: "#ef4444",
    description: "Pessoa extrovertida, otimista e sociável"
  },
  [Temperament.COLERICO]: {
    title: "Colérico", 
    color: "bg-yellow-500",
    chartColor: "#eab308",
    description: "Pessoa ambiciosa, enérgica e determinada"
  },
  [Temperament.MELANCOLICO]: {
    title: "Melancólico",
    color: "bg-blue-500",
    chartColor: "#3b82f6", 
    description: "Pessoa analítica, criativa e perfeccionista"
  },
  [Temperament.FLEUMATICO]: {
    title: "Fleumático",
    color: "bg-green-500",
    chartColor: "#22c55e",
    description: "Pessoa calma, leal e cooperativa"
  }
};

export function ResultCard({ result, onRestart, onShare }: ResultCardProps) {
  const { getFontSizeClass } = useAccessibility();
  const dominantInfo = temperamentInfo[result.dominantTemperament];
  
  // Preparar dados para o gráfico de pizza
  const chartData = Object.entries(result.temperamentScores).map(([temperament, score]) => {
    const info = temperamentInfo[temperament as Temperament];
    const total = Object.values(result.temperamentScores).reduce((a, b) => a + b, 0);
    const percentage = Math.round((score / total) * 100);
    
    return {
      name: info.title,
      value: percentage,
      color: info.chartColor,
      score: score
    };
  }).sort((a, b) => b.value - a.value); // Ordenar por valor decrescente
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Meu Resultado do Quiz de Temperamento",
          text: `Descobri que meu temperamento dominante é ${dominantInfo.title}! Faça você também o quiz.`,
          url: window.location.origin
        });
      } catch (error) {
        console.log("Erro ao compartilhar:", error);
      }
    } else {
      // Fallback para navegadores que não suportam Web Share API
      const text = `Descobri que meu temperamento dominante é ${dominantInfo.title}! Faça você também o quiz: ${window.location.origin}`;
      navigator.clipboard.writeText(text);
      alert("Link copiado para a área de transferência!");
    }
    
    onShare?.();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <div className={`w-28 h-28 ${dominantInfo.color} rounded-full mx-auto mb-6 flex items-center justify-center`}>
            <span className="text-white text-3xl font-bold">
              {dominantInfo.title.charAt(0)}
            </span>
          </div>
          <CardTitle className={`text-4xl mb-4 ${getFontSizeClass()}`}>{result.title}</CardTitle>
          <CardDescription className={`text-xl ${getFontSizeClass()}`}>
            Seu temperamento dominante é <strong>{dominantInfo.title}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center">
            <p className={`text-muted-foreground mb-6 leading-relaxed ${getFontSizeClass()}`}>
              {dominantInfo.description}
            </p>
            <p className={`leading-relaxed ${getFontSizeClass()}`}>{result.description}</p>
          </div>
          
          <div className="space-y-6">
            <h4 className={`font-semibold text-center ${getFontSizeClass()}`}>
              Distribuição dos Temperamentos
            </h4>
            
            {/* Gráfico de Pizza */}
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Porcentagem']}
                    labelFormatter={(label: string) => `${label}`}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value: string, entry: any) => (
                      <span className={getFontSizeClass()}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Lista detalhada */}
            <div className="grid grid-cols-2 gap-4">
              {chartData.map((item) => (
                <div key={item.name} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex-1">
                    <div className={`font-medium ${getFontSizeClass()}`}>{item.name}</div>
                    <div className={`text-muted-foreground text-sm ${getFontSizeClass()}`}>
                      {item.value}% ({item.score} pontos)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <Button onClick={onRestart} className={`flex-1 ${getFontSizeClass()} py-3`} variant="outline">
              <RefreshCw className="w-5 h-5 mr-2" />
              Refazer Quiz
            </Button>
            <Button onClick={handleShare} className={`flex-1 ${getFontSizeClass()} py-3`}>
              <Share2 className="w-5 h-5 mr-2" />
              Compartilhar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
