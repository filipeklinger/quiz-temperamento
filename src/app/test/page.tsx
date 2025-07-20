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
      title: "Seu temperamento dominante: Sanguíneo",
      description: "Você é uma pessoa extrovertida, otimista e sociável. Gosta de estar com pessoas e se adapta facilmente a diferentes situações sociais.",
      dominantTemperament: "sanguineo",
      temperamentScores: {
        sanguineo: 12,
        colerico: 8,
        melancolico: 6,
        fleumatico: 4
      }
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
