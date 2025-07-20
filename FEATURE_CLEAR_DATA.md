# Funcionalidade: Limpar Dados do Analytics

## ✅ Nova Funcionalidade Adicionada

### 📍 Localização
- **Página**: `/analytics`
- **API**: `/api/analytics/clear` (método DELETE)

### 🔧 Funcionalidades

#### 1. **Botão "Limpar Dados"**
- Localizado no header da página de analytics (lado direito)
- Só aparece quando há dados no banco (totalUsers > 0)
- Ícone de lixeira (Trash2) para identificação visual
- Cor vermelha (variant="destructive") para indicar ação perigosa

#### 2. **Modal de Confirmação**
- Aparece quando o usuário clica em "Limpar Dados"
- Mostra o número exato de resultados que serão deletados
- Aviso em vermelho: "Esta ação não pode ser desfeita!"
- Dois botões:
  - **Cancelar**: Fecha o modal sem fazer nada
  - **Sim, Deletar Tudo**: Confirma e executa a exclusão

#### 3. **Estados da Interface**
- **Loading**: Mostra spinner e texto "Deletando..." durante a operação
- **Feedback**: Alert de sucesso ou erro após a operação
- **Atualização**: Recarrega automaticamente os dados após exclusão bem-sucedida

### 🔒 Segurança
- Requer autenticação de admin (verificado via localStorage)
- Confirmação dupla (clique no botão + confirmação no modal)
- Feedback visual claro sobre a irreversibilidade da ação

### 🛠️ Arquivos Modificados

1. **`src/app/analytics/page.tsx`**:
   - Adicionado estado para modal de confirmação
   - Adicionado função `handleClearData()`
   - Adicionado botão no header
   - Adicionado modal de confirmação

2. **`src/app/api/analytics/clear/route.ts`** (novo arquivo):
   - Endpoint DELETE para limpar todos os resultados
   - Usa Drizzle ORM para deletar da tabela `quiz_results`
   - Retorna resposta JSON com status da operação

### 📊 Comportamento
- Quando não há dados: botão não aparece
- Quando há dados: botão aparece
- Após limpeza bem-sucedida: página mostra "0 usuários" e gráficos vazios
- O botão desaparece automaticamente quando não há mais dados

### 🎯 UX/UI
- Interface intuitiva e consistente com o design existente
- Cores e ícones apropriados para ação destrutiva
- Feedback imediato ao usuário sobre o resultado da operação
- Modal responsivo que funciona em dispositivos móveis
