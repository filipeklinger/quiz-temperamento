"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizResult, Temperament } from "@/types";
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
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className={`w-24 h-24 ${dominantInfo.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
            <span className="text-white text-2xl font-bold">
              {dominantInfo.title.charAt(0)}
            </span>
          </div>
          <CardTitle className="text-3xl">{result.title}</CardTitle>
          <CardDescription className="text-lg">
            Seu temperamento dominante é <strong>{dominantInfo.title}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">{dominantInfo.description}</p>
            <p className="text-sm">{result.description}</p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold">Distribuição dos Temperamentos:</h4>
            {Object.entries(result.temperamentScores).map(([temperament, score]) => {
              const info = temperamentInfo[temperament as Temperament];
              const percentage = Math.round((score / Object.values(result.temperamentScores).reduce((a, b) => a + b, 0)) * 100);
              
              return (
                <div key={temperament} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 ${info.color} rounded`}></div>
                  <span className="flex-1">{info.title}</span>
                  <span className="text-sm text-muted-foreground">{percentage}%</span>
                </div>
              );
            })}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button onClick={onRestart} className="flex-1" variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refazer Quiz
            </Button>
            <Button onClick={handleShare} className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
