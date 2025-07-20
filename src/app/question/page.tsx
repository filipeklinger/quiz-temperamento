"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question, Answer, TemperamentGroup, Temperament } from "@/types";
import { mockQuestions } from "@/lib/mock-data";
import { ArrowLeft, Save } from "lucide-react";

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

export default function QuestionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const questionId = searchParams.get("id");
  
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState<TemperamentGroup>(TemperamentGroup.GROUP_A);
  const [answers, setAnswers] = useState<Omit<Answer, "id" | "questionId">[]>([
    { text: "", temperament: Temperament.SANGUINEO },
    { text: "", temperament: Temperament.COLERICO },
    { text: "", temperament: Temperament.MELANCOLICO },
    { text: "", temperament: Temperament.FLEUMATICO }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Verificar autenticação
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      router.push("/login");
      return;
    }

    // Se há um ID, carregar pergunta para edição
    if (questionId) {
      const question = mockQuestions.find(q => q.id === questionId);
      if (question) {
        setTitle(question.title);
        setGroup(question.group);
        setAnswers(question.answers.map(a => ({
          text: a.text,
          temperament: a.temperament
        })));
      }
    }

    setIsLoading(false);
  }, [router, questionId]);

  const handleAnswerChange = (index: number, text: string) => {
    const newAnswers = [...answers];
    newAnswers[index].text = text;
    setAnswers(newAnswers);
  };

  const handleSave = () => {
    // Validação
    if (!title.trim()) {
      setError("O título da pergunta é obrigatório");
      return;
    }

    if (answers.some(a => !a.text.trim())) {
      setError("Todas as respostas devem ser preenchidas");
      return;
    }

    // Em produção seria uma chamada para API
    console.log("Salvando pergunta:", {
      id: questionId || `new_${Date.now()}`,
      title,
      group,
      answers: answers.map((a, i) => ({
        ...a,
        id: `answer_${i}`,
        questionId: questionId || `new_${Date.now()}`
      }))
    });

    // Voltar para configuração
    router.push("/config");
  };

  const handleBack = () => {
    router.push("/config");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando pergunta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button onClick={handleBack} variant="outline" className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {questionId ? "Editar Pergunta" : "Nova Pergunta"}
            </h1>
            <p className="text-gray-600">
              {questionId ? "Modifique a pergunta e suas respostas" : "Crie uma nova pergunta para o quiz"}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Pergunta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Título da Pergunta *
              </label>
              <Input
                id="title"
                placeholder="Digite a pergunta..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="group" className="text-sm font-medium">
                Grupo da Pergunta *
              </label>
              <select
                id="group"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={group}
                onChange={(e) => setGroup(e.target.value as TemperamentGroup)}
              >
                {Object.entries(groupLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Respostas por Temperamento</h3>
              <p className="text-sm text-gray-600">
                Cada resposta deve refletir as características de um temperamento específico.
              </p>
              
              {answers.map((answer, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium">
                    {temperamentLabels[answer.temperament]} *
                  </label>
                  <Input
                    placeholder={`Resposta que representa o temperamento ${temperamentLabels[answer.temperament].toLowerCase()}...`}
                    value={answer.text}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <div className="flex justify-end space-x-4">
              <Button onClick={handleBack} variant="outline">
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
