'use client'

import { useEffect } from 'react'

export default function TestPage() {
  useEffect(() => {
    // Simular dados do quiz
    localStorage.setItem("quizUserData", JSON.stringify({
      birthDate: "1990-01-15",
      age: 34
    }));

    localStorage.setItem("quizResult", JSON.stringify({
      title: "O Comunicador Natural",
      description: "Você possui um temperamento sanguíneo muito bem definido, sendo naturalmente otimista, sociável e energético.",
      dominantTemperament: "sanguineo",
      temperamentScores: {
        sanguineo: 12,
        colerico: 8,
        melancolico: 6,
        fleumatico: 4
      },
      age: 34,
      characteristics: [
        "Extremamente sociável e comunicativo",
        "Otimista e entusiástico",
        "Espontâneo e expressivo",
        "Gosta de ser o centro das atenções"
      ],
      strengths: [
        "Capacidade excepcional de motivar outros",
        "Facilidade para fazer novos amigos",
        "Adaptabilidade em situações sociais",
        "Criatividade e inovação"
      ],
      developmentAreas: [
        "Desenvolver mais disciplina e foco",
        "Melhorar a gestão do tempo",
        "Praticar a escuta ativa",
        "Trabalhar a persistência em projetos longos"
      ]
    }));

    // Redirecionar para a página de resultado após um pequeno delay
    setTimeout(() => {
      window.location.href = "/result";
    }, 100);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Preparando resultado do teste...</p>
    </div>
  );
}
