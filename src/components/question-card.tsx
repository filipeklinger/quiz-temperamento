"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question, Answer } from "@/types";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { shuffleArray, shuffleArrayWithSeed } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSelect: (answer: Answer) => void;
  selectedAnswerId?: string;
}

export function QuestionCard({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswerSelect,
  selectedAnswerId 
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(selectedAnswerId || null);
  const [shuffledAnswers, setShuffledAnswers] = useState<Answer[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { getFontSizeClass } = useAccessibility();

  // Garantir que estamos no cliente antes de fazer o shuffle
  useEffect(() => {
    setIsClient(true);
    // Usar shuffle determinístico baseado no ID da pergunta
    setShuffledAnswers(shuffleArrayWithSeed(question.answers, question.id));
  }, [question.id, question.answers]);

  const handleAnswerClick = (answer: Answer) => {
    setSelectedAnswer(answer.id);
    onAnswerSelect(answer);
  };

  // Se ainda não estamos no cliente, usar a ordem original para evitar hydration mismatch
  const answersToRender = isClient ? shuffledAnswers : question.answers;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <span className={`text-muted-foreground ${getFontSizeClass()}`}>
              Pergunta {questionNumber} de {totalQuestions}
            </span>
            <div className="flex space-x-1">
              {Array.from({ length: totalQuestions }).map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index < questionNumber ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
          <CardTitle className={`text-2xl leading-relaxed ${getFontSizeClass()}`}>
            {question.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {answersToRender.map((answer) => (
            <Button
              key={answer.id}
              variant={selectedAnswer === answer.id ? "default" : "outline"}
              className={`w-full text-left h-auto p-6 justify-start hover:scale-105 transition-transform ${getFontSizeClass()}`}
              onClick={() => handleAnswerClick(answer)}
            >
              <span className="text-wrap leading-relaxed">{answer.text}</span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
