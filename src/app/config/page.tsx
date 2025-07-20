"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Question, TemperamentGroup, Temperament } from "@/types";
import { mockQuestions } from "@/lib/mock-data";
import { Plus, Edit, Trash2, LogOut } from "lucide-react";

const temperamentLabels = {
  [Temperament.SANGUINEO]: "Sanguíneo",
  [Temperament.COLERICO]: "Colérico", 
  [Temperament.MELANCOLICO]: "Melancólico",
  [Temperament.FLEUMATICO]: "Fleumático"
};

const groupLabels = {
  [TemperamentGroup.GROUP_A]: "Grupo A - Situações sociais",
  [TemperamentGroup.GROUP_B]: "Grupo B - Tomada de decisões",
  [TemperamentGroup.GROUP_C]: "Grupo C - Reações emocionais", 
  [TemperamentGroup.GROUP_D]: "Grupo D - Preferências pessoais"
};

export default function ConfigPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticação
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      router.push("/login");
      return;
    }

    // Carregar perguntas (em produção seria uma API)
    setQuestions(mockQuestions);
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/login");
  };

  const handleNewQuestion = () => {
    router.push("/question");
  };

  const handleEditQuestion = (questionId: string) => {
    router.push(`/question?id=${questionId}`);
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (confirm("Tem certeza que deseja excluir esta pergunta?")) {
      // Em produção seria uma chamada para API
      setQuestions(questions.filter(q => q.id !== questionId));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando configurações...</p>
        </div>
      </div>
    );
  }

  // Agrupar perguntas por grupo
  const questionsByGroup = questions.reduce((acc, question) => {
    if (!acc[question.group]) {
      acc[question.group] = [];
    }
    acc[question.group].push(question);
    return acc;
  }, {} as Record<TemperamentGroup, Question[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Configuração de Perguntas</h1>
            <p className="text-gray-600">Gerencie as perguntas do quiz de temperamento</p>
          </div>
          <div className="flex space-x-4">
            <Button onClick={handleNewQuestion}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Pergunta
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {Object.entries(questionsByGroup).map(([group, groupQuestions]) => (
            <Card key={group}>
              <CardHeader>
                <CardTitle>{groupLabels[group as TemperamentGroup]}</CardTitle>
                <CardDescription>
                  {groupQuestions.length} pergunta(s) cadastrada(s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {groupQuestions.map((question) => (
                    <div
                      key={question.id}
                      className="border rounded-lg p-4 bg-white"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium text-lg">{question.title}</h3>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditQuestion(question.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteQuestion(question.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {question.answers.map((answer) => (
                          <div
                            key={answer.id}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <span className="inline-block w-3 h-3 rounded-full bg-gray-300"></span>
                            <span className="flex-1">{answer.text}</span>
                            <span className="text-xs text-gray-500 font-medium">
                              {temperamentLabels[answer.temperament]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
