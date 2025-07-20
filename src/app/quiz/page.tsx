"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/question-card";
import { Button } from "@/components/ui/button";
import { AccessibilityControls } from "@/components/accessibility-controls";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { Question, Answer, QuizResponse } from "@/types";
import { mockQuestions } from "@/lib/mock-data";
import { selectQuestionsForQuiz, calculateQuizResult } from "@/lib/quiz-utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function QuizPage() {
  return (
    <AccessibilityProvider>
      <QuizContent />
    </AccessibilityProvider>
  );
}

function QuizContent() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [userData, setUserData] = useState<{ birthDate: string; age: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há dados do usuário
    const storedUserData = localStorage.getItem("quizUserData");
    if (!storedUserData) {
      router.push("/");
      return;
    }

    const parsedUserData = JSON.parse(storedUserData);
    setUserData(parsedUserData);

    // Selecionar perguntas para o quiz
    const selectedQuestions = selectQuestionsForQuiz(mockQuestions);
    setQuestions(selectedQuestions);
    setIsLoading(false);
  }, [router]);

  const handleAnswerSelect = (answer: Answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newResponse: QuizResponse = {
      questionId: currentQuestion.id,
      answerId: answer.id,
      temperament: answer.temperament
    };

    // Atualizar ou adicionar resposta
    const updatedResponses = responses.filter(r => r.questionId !== currentQuestion.id);
    updatedResponses.push(newResponse);
    setResponses(updatedResponses);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completo, calcular resultado
      if (userData) {
        const result = calculateQuizResult(responses, userData.age);
        localStorage.setItem("quizResult", JSON.stringify(result));
        router.push("/result");
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getCurrentResponse = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return responses.find(r => r.questionId === currentQuestion.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando perguntas...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Erro ao carregar perguntas.</p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentResponse = getCurrentResponse();
  const canProceed = currentResponse !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AccessibilityControls />
      
      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswerSelect={handleAnswerSelect}
        selectedAnswerId={currentResponse?.answerId}
      />
      
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-4">
          {currentQuestionIndex > 0 && (
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="lg"
              className="text-lg px-6 py-3"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Anterior
            </Button>
          )}
          
          {canProceed && (
            <Button
              onClick={handleNext}
              size="lg"
              className="text-lg px-6 py-3"
            >
              {currentQuestionIndex === questions.length - 1 ? "Finalizar" : "Próxima"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
