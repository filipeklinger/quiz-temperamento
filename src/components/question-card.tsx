"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question, Answer } from "@/types";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { shuffleArray } from "@/lib/utils";

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
  const { getFontSizeClass } = useAccessibility();

  // Embaralhar as respostas uma única vez quando a pergunta mudar
  const shuffledAnswers = useMemo(() => {
    return shuffleArray(question.answers);
  }, [question.id]); // Dependência apenas do ID da pergunta

  const handleAnswerClick = (answer: Answer) => {
    setSelectedAnswer(answer.id);
    onAnswerSelect(answer);
  };

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
          {shuffledAnswers.map((answer) => (
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
