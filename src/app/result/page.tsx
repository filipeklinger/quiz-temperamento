"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ResultCard } from "@/components/result-card";
import { Button } from "@/components/ui/button";
import { AccessibilityControls } from "@/components/accessibility-controls";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { QuizResult } from "@/types";

export default function ResultPage() {
  return (
    <AccessibilityProvider>
      <ResultContent />
    </AccessibilityProvider>
  );
}

function ResultContent() {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Recuperar resultado do localStorage
    const storedResult = localStorage.getItem("quizResult");
    const storedUserData = localStorage.getItem("quizUserData");
    
    if (!storedResult || !storedUserData) {
      router.push("/");
      return;
    }

    const parsedResult = JSON.parse(storedResult);
    const parsedUserData = JSON.parse(storedUserData);
    
    setResult(parsedResult);
    
    // Salvar resultado no banco de dados
    saveResultToDatabase(parsedResult, parsedUserData);
    
    setIsLoading(false);
  }, [router]);

  const saveResultToDatabase = async (result: QuizResult, userData: any) => {
    try {
      const response = await fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          birthDate: userData.birthDate,
          age: result.age,
          dominantTemperament: result.dominantTemperament,
          temperamentScores: result.temperamentScores,
          totalQuestions: result.totalQuestions,
          timeToComplete: result.timeToComplete,
          startedAt: result.startedAt
        })
      });

      const data = await response.json();
      
      if (!data.success) {
        console.error('Failed to save result:', data.error);
      }
    } catch (error) {
      console.error('Error saving result:', error);
    }
  };

  const handleRestart = () => {
    // Limpar dados do localStorage
    localStorage.removeItem("quizUserData");
    localStorage.removeItem("quizResult");
    
    // Voltar para o início
    router.push("/");
  };

  const handleShare = () => {
    // Lógica de compartilhamento já está no componente ResultCard
    console.log("Compartilhado!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Calculando seu resultado...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <p>Erro ao carregar resultado.</p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AccessibilityControls />
      <ResultCard 
        result={result} 
        onRestart={handleRestart} 
        onShare={handleShare}
      />
    </div>
  );
}
