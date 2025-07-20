"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizResult, Temperament } from "@/types";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Share2, RefreshCw } from "lucide-react";

interface ResultCardProps {
  result: QuizResult;
  onRestart: () => void;
  onShare?: () => void;
}

const temperamentInfo = {
  [Temperament.SANGUINEO]: {
    title: "Sanguíneo",
    color: "bg-red-500",
    description: "Pessoa extrovertida, otimista e sociável"
  },
  [Temperament.COLERICO]: {
    title: "Colérico", 
    color: "bg-yellow-500",
    description: "Pessoa ambiciosa, enérgica e determinada"
  },
  [Temperament.MELANCOLICO]: {
    title: "Melancólico",
    color: "bg-blue-500", 
    description: "Pessoa analítica, criativa e perfeccionista"
  },
  [Temperament.FLEUMATICO]: {
    title: "Fleumático",
    color: "bg-green-500",
    description: "Pessoa calma, leal e cooperativa"
  }
};

export function ResultCard({ result, onRestart, onShare }: ResultCardProps) {
  const { getFontSizeClass } = useAccessibility();
  const dominantInfo = temperamentInfo[result.dominantTemperament];
  
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
          
          <div className="space-y-4">
            <h4 className={`font-semibold ${getFontSizeClass()}`}>Distribuição dos Temperamentos:</h4>
            {Object.entries(result.temperamentScores).map(([temperament, score]) => {
              const info = temperamentInfo[temperament as Temperament];
              const percentage = Math.round((score / Object.values(result.temperamentScores).reduce((a, b) => a + b, 0)) * 100);
              
              return (
                <div key={temperament} className="flex items-center space-x-4">
                  <div className={`w-5 h-5 ${info.color} rounded`}></div>
                  <span className={`flex-1 ${getFontSizeClass()}`}>{info.title}</span>
                  <span className={`text-muted-foreground ${getFontSizeClass()}`}>{percentage}%</span>
                </div>
              );
            })}
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
