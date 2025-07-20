import { Question, Answer, Temperament, TemperamentGroup } from "@/types";

export const mockQuestions: Question[] = [
  // Grupo A - Situações sociais
  {
    id: "q1",
    title: "Em uma festa, você prefere:",
    group: TemperamentGroup.GROUP_A,
    answers: [
      {
        id: "a1_1",
        text: "Conversar com muitas pessoas diferentes",
        temperament: Temperament.SANGUINEO,
        questionId: "q1"
      },
      {
        id: "a1_2", 
        text: "Liderar jogos e atividades",
        temperament: Temperament.COLERICO,
        questionId: "q1"
      },
      {
        id: "a1_3",
        text: "Ter conversas profundas com poucas pessoas",
        temperament: Temperament.MELANCOLICO,
        questionId: "q1"
      },
      {
        id: "a1_4",
        text: "Observar e apoiar os outros",
        temperament: Temperament.FLEUMATICO,
        questionId: "q1"
      }
    ]
  },
  {
    id: "q2",
    title: "Quando conhece pessoas novas, você:",
    group: TemperamentGroup.GROUP_A,
    answers: [
      {
        id: "a2_1",
        text: "Se apresenta de forma animada e espontânea",
        temperament: Temperament.SANGUINEO,
        questionId: "q2"
      },
      {
        id: "a2_2",
        text: "Toma a iniciativa e faz perguntas diretas",
        temperament: Temperament.COLERICO,
        questionId: "q2"
      },
      {
        id: "a2_3",
        text: "Escuta mais do que fala no início",
        temperament: Temperament.MELANCOLICO,
        questionId: "q2"
      },
      {
        id: "a2_4",
        text: "Espera que os outros iniciem a conversa",
        temperament: Temperament.FLEUMATICO,
        questionId: "q2"
      }
    ]
  },
  {
    id: "q3",
    title: "Em grupos de trabalho, você tende a:",
    group: TemperamentGroup.GROUP_A,
    answers: [
      {
        id: "a3_1",
        text: "Animar o grupo e manter o astral",
        temperament: Temperament.SANGUINEO,
        questionId: "q3"
      },
      {
        id: "a3_2",
        text: "Assumir o papel de líder",
        temperament: Temperament.COLERICO,
        questionId: "q3"
      },
      {
        id: "a3_3",
        text: "Focar na qualidade e nos detalhes",
        temperament: Temperament.MELANCOLICO,
        questionId: "q3"
      },
      {
        id: "a3_4",
        text: "Ser o mediador e buscar consenso",
        temperament: Temperament.FLEUMATICO,
        questionId: "q3"
      }
    ]
  },
  {
    id: "q4",
    title: "Sua forma preferida de resolver conflitos é:",
    group: TemperamentGroup.GROUP_A,
    answers: [
      {
        id: "a4_1",
        text: "Usar humor para diminuir a tensão",
        temperament: Temperament.SANGUINEO,
        questionId: "q4"
      },
      {
        id: "a4_2",
        text: "Abordar o problema de frente",
        temperament: Temperament.COLERICO,
        questionId: "q4"
      },
      {
        id: "a4_3",
        text: "Analisar todos os aspectos antes de agir",
        temperament: Temperament.MELANCOLICO,
        questionId: "q4"
      },
      {
        id: "a4_4",
        text: "Buscar uma solução que agrade a todos",
        temperament: Temperament.FLEUMATICO,
        questionId: "q4"
      }
    ]
  },

  // Grupo B - Tomada de decisões
  {
    id: "q5",
    title: "Ao tomar decisões importantes, você:",
    group: TemperamentGroup.GROUP_B,
    answers: [
      {
        id: "a5_1",
        text: "Confia na intuição e no que sente",
        temperament: Temperament.SANGUINEO,
        questionId: "q5"
      },
      {
        id: "a5_2",
        text: "Decide rapidamente e parte para ação",
        temperament: Temperament.COLERICO,
        questionId: "q5"
      },
      {
        id: "a5_3",
        text: "Pesquisa e analisa todas as opções",
        temperament: Temperament.MELANCOLICO,
        questionId: "q5"
      },
      {
        id: "a5_4",
        text: "Busca opiniões de pessoas confiáveis",
        temperament: Temperament.FLEUMATICO,
        questionId: "q5"
      }
    ]
  },
  {
    id: "q6",
    title: "Quando precisa escolher entre opções, você:",
    group: TemperamentGroup.GROUP_B,
    answers: [
      {
        id: "a6_1",
        text: "Escolhe a que parece mais divertida",
        temperament: Temperament.SANGUINEO,
        questionId: "q6"
      },
      {
        id: "a6_2",
        text: "Escolhe a mais eficiente e prática",
        temperament: Temperament.COLERICO,
        questionId: "q6"
      },
      {
        id: "a6_3",
        text: "Escolhe após avaliar prós e contras",
        temperament: Temperament.MELANCOLICO,
        questionId: "q6"
      },
      {
        id: "a6_4",
        text: "Escolhe a que causa menos mudanças",
        temperament: Temperament.FLEUMATICO,
        questionId: "q6"
      }
    ]
  },
  {
    id: "q7",
    title: "Diante de um prazo apertado, você:",
    group: TemperamentGroup.GROUP_B,
    answers: [
      {
        id: "a7_1",
        text: "Trabalha melhor sob pressão e improvisa",
        temperament: Temperament.SANGUINEO,
        questionId: "q7"
      },
      {
        id: "a7_2",
        text: "Acelera o ritmo e foca no essencial",
        temperament: Temperament.COLERICO,
        questionId: "q7"
      },
      {
        id: "a7_3",
        text: "Se estressa mas mantém a qualidade",
        temperament: Temperament.MELANCOLICO,
        questionId: "q7"
      },
      {
        id: "a7_4",
        text: "Busca ajuda e divide as tarefas",
        temperament: Temperament.FLEUMATICO,
        questionId: "q7"
      }
    ]
  },
  {
    id: "q8",
    title: "Seu estilo de planejamento é:",
    group: TemperamentGroup.GROUP_B,
    answers: [
      {
        id: "a8_1",
        text: "Flexível e adaptável às circunstâncias",
        temperament: Temperament.SANGUINEO,
        questionId: "q8"
      },
      {
        id: "a8_2",
        text: "Orientado a objetivos e resultados",
        temperament: Temperament.COLERICO,
        questionId: "q8"
      },
      {
        id: "a8_3",
        text: "Detalhado e bem estruturado",
        temperament: Temperament.MELANCOLICO,
        questionId: "q8"
      },
      {
        id: "a8_4",
        text: "Cauteloso e conservador",
        temperament: Temperament.FLEUMATICO,
        questionId: "q8"
      }
    ]
  },

  // Grupo C - Reações emocionais
  {
    id: "q9",
    title: "Quando algo dá errado, você:",
    group: TemperamentGroup.GROUP_C,
    answers: [
      {
        id: "a9_1",
        text: "Procura o lado positivo da situação",
        temperament: Temperament.SANGUINEO,
        questionId: "q9"
      },
      {
        id: "a9_2",
        text: "Se irrita mas parte para a solução",
        temperament: Temperament.COLERICO,
        questionId: "q9"
      },
      {
        id: "a9_3",
        text: "Analisa o que causou o problema",
        temperament: Temperament.MELANCOLICO,
        questionId: "q9"
      },
      {
        id: "a9_4",
        text: "Aceita a situação com calma",
        temperament: Temperament.FLEUMATICO,
        questionId: "q9"
      }
    ]
  },
  {
    id: "q10",
    title: "Em momentos de estresse, você:",
    group: TemperamentGroup.GROUP_C,
    answers: [
      {
        id: "a10_1",
        text: "Busca distrações e companhia",
        temperament: Temperament.SANGUINEO,
        questionId: "q10"
      },
      {
        id: "a10_2",
        text: "Fica impaciente e quer resolver logo",
        temperament: Temperament.COLERICO,
        questionId: "q10"
      },
      {
        id: "a10_3",
        text: "Precisa de tempo sozinho para pensar",
        temperament: Temperament.MELANCOLICO,
        questionId: "q10"
      },
      {
        id: "a10_4",
        text: "Mantém a calma e espera passar",
        temperament: Temperament.FLEUMATICO,
        questionId: "q10"
      }
    ]
  },
  {
    id: "q11",
    title: "Sua reação a críticas é:",
    group: TemperamentGroup.GROUP_C,
    answers: [
      {
        id: "a11_1",
        text: "Aceita bem se feita de forma positiva",
        temperament: Temperament.SANGUINEO,
        questionId: "q11"
      },
      {
        id: "a11_2",
        text: "Defende seu ponto de vista",
        temperament: Temperament.COLERICO,
        questionId: "q11"
      },
      {
        id: "a11_3",
        text: "Leva muito a sério e reflete profundamente",
        temperament: Temperament.MELANCOLICO,
        questionId: "q11"
      },
      {
        id: "a11_4",
        text: "Escuta em silêncio e evita confronto",
        temperament: Temperament.FLEUMATICO,
        questionId: "q11"
      }
    ]
  },
  {
    id: "q12",
    title: "Como você expressa alegria:",
    group: TemperamentGroup.GROUP_C,
    answers: [
      {
        id: "a12_1",
        text: "De forma expressiva e contagiante",
        temperament: Temperament.SANGUINEO,
        questionId: "q12"
      },
      {
        id: "a12_2",
        text: "Com entusiasmo e energia",
        temperament: Temperament.COLERICO,
        questionId: "q12"
      },
      {
        id: "a12_3",
        text: "De forma mais reservada e íntima",
        temperament: Temperament.MELANCOLICO,
        questionId: "q12"
      },
      {
        id: "a12_4",
        text: "Com um sorriso tranquilo",
        temperament: Temperament.FLEUMATICO,
        questionId: "q12"
      }
    ]
  },

  // Grupo D - Preferências pessoais
  {
    id: "q13",
    title: "Seu ambiente de trabalho ideal é:",
    group: TemperamentGroup.GROUP_D,
    answers: [
      {
        id: "a13_1",
        text: "Dinâmico e cheio de interação",
        temperament: Temperament.SANGUINEO,
        questionId: "q13"
      },
      {
        id: "a13_2",
        text: "Desafiador e competitivo",
        temperament: Temperament.COLERICO,
        questionId: "q13"
      },
      {
        id: "a13_3",
        text: "Organizado e sem distrações",
        temperament: Temperament.MELANCOLICO,
        questionId: "q13"
      },
      {
        id: "a13_4",
        text: "Estável e harmonioso",
        temperament: Temperament.FLEUMATICO,
        questionId: "q13"
      }
    ]
  },
  {
    id: "q14",
    title: "Nas horas livres, você prefere:",
    group: TemperamentGroup.GROUP_D,
    answers: [
      {
        id: "a14_1",
        text: "Atividades sociais e eventos",
        temperament: Temperament.SANGUINEO,
        questionId: "q14"
      },
      {
        id: "a14_2",
        text: "Esportes ou atividades competitivas",
        temperament: Temperament.COLERICO,
        questionId: "q14"
      },
      {
        id: "a14_3",
        text: "Hobbies criativos ou leitura",
        temperament: Temperament.MELANCOLICO,
        questionId: "q14"
      },
      {
        id: "a14_4",
        text: "Relaxar em casa ou na natureza",
        temperament: Temperament.FLEUMATICO,
        questionId: "q14"
      }
    ]
  },
  {
    id: "q15",
    title: "Ao aprender algo novo, você:",
    group: TemperamentGroup.GROUP_D,
    answers: [
      {
        id: "a15_1",
        text: "Aprende melhor através de conversas",
        temperament: Temperament.SANGUINEO,
        questionId: "q15"
      },
      {
        id: "a15_2",
        text: "Quer logo colocar em prática",
        temperament: Temperament.COLERICO,
        questionId: "q15"
      },
      {
        id: "a15_3",
        text: "Estuda todos os detalhes primeiro",
        temperament: Temperament.MELANCOLICO,
        questionId: "q15"
      },
      {
        id: "a15_4",
        text: "Prefere observar antes de tentar",
        temperament: Temperament.FLEUMATICO,
        questionId: "q15"
      }
    ]
  },
  {
    id: "q16",
    title: "Seu maior motivador é:",
    group: TemperamentGroup.GROUP_D,
    answers: [
      {
        id: "a16_1",
        text: "Reconhecimento e aprovação social",
        temperament: Temperament.SANGUINEO,
        questionId: "q16"
      },
      {
        id: "a16_2",
        text: "Conquistas e superação de desafios",
        temperament: Temperament.COLERICO,
        questionId: "q16"
      },
      {
        id: "a16_3",
        text: "Fazer um trabalho de qualidade",
        temperament: Temperament.MELANCOLICO,
        questionId: "q16"
      },
      {
        id: "a16_4",
        text: "Contribuir para o bem-estar do grupo",
        temperament: Temperament.FLEUMATICO,
        questionId: "q16"
      }
    ]
  }
];
