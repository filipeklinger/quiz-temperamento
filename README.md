# Quiz de Perfil com Base em Idade e Respostas
## 🎯 Objetivo do Projeto
Criar uma aplicação web responsiva usando Next.js que permita ao usuário responder a um quiz composto por múltiplas perguntas. Com base nas respostas escolhidas e na idade informada pelo usuário, será calculado um resultado personalizado (perfil), que será exibido ao final do quiz.

## Stack do Projeto
- Frontend: Next.js + Tailwind CSS
- Backend/API: API Routes do próprio Next.js
- Banco de Dados: PostgreSQL (via Vercel Postgres)
- Auth (simples): JWT (sem provedor externo por enquanto)
- ORM: Drizzle ORM

## 🧭 Fluxo de Navegação
- Página Inicial (/)
    - Breve explicação sobre o quiz.
    - Campo para o usuário digitar sua data de nascimento dd/mm/yyyy.
    - Botão "Iniciar Quiz".
- Página do Quiz (/quiz)
    - Lista de perguntas uma por uma (cada pergunta deve ocupar a tela toda com um botao de proxima questao).
    - Cada pergunta apresenta múltiplas alternativas (apenas 1 pode ser selecionada).
    - Botão para avançar ou concluir.
    - da lista de perguntas o usuario deve responder 3 de cada grupo.

- Página de Resultado (/result)
    - Resultado calculado com base nas respostas + idade.
    - Mensagem com título do perfil e breve descrição.
    - Botão para reiniciar o quiz ou compartilhar link.

Paginas protegidas
- Admin Login (/login)
    - Tela de login básica
- Pagina de edicao de perguntas (/config)
    - botao de cadastrar nova pergunta
    - lista de todas as perguntas cadastradas (com botao de editar e excluir)
- Pagina de cadastro de perguntas (/question)
- Campo de titulo da pergunta
- campo para inserção das respostas (sempre serao 4 respostas, uma para cada temperamento. a associacao de temperamento a resposta é a parte mais importante e deve ser visivel apenas para o administrador e sera usada para a geração do resultado final)