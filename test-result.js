// Script para testar o resultado do quiz com gráfico
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

// Redirecionar para a página de resultado
window.location.href = "/result";
