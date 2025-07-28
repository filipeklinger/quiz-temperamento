# Sistema de Resultados do Quiz de Temperamentos

Este documento explica como usar e configurar o novo sistema de resultados extraído para arquivos separados.

## 📁 Estrutura dos Arquivos

```
src/lib/
├── quiz-utils.ts           # Funções principais do quiz (simplificadas)
├── result-engine.ts        # Engine principal de cálculo de resultados
├── result-config.ts        # Configurações personalizáveis
└── result-examples.ts      # Exemplos de uso e configurações
```

## 🚀 Uso Básico

```typescript
import { QuizResultEngine } from './result-engine';

const responses = [
  { questionId: "1", answerId: "a", temperament: Temperament.SANGUINEO },
  // ... mais respostas
];

const result = QuizResultEngine.calculateResult(responses, 28);
console.log(result.title);        // "O Comunicador Natural"
console.log(result.description);  // Descrição personalizada
```

## ⚙️ Configurações Principais - Novas Regras

### 1. Thresholds de Temperamentos (`result-config.ts`)

```typescript
export const TEMPERAMENT_THRESHOLDS = {
  // Regra 1: Temperamento Puro
  PURE_MIN_PERCENTAGE: 50,           // >= 50% = temperamento puro
  PURE_MIN_DIFFERENCE: 20,           // >= 20% de diferença para o segundo = temperamento puro
  
  // Regra 2: Temperamento Misto (dupla dominante)
  MIXED_MAX_DIFFERENCE: 15,          // <= 15% de diferença entre primeiro e segundo = misto
  MIXED_MIN_TOTAL: 70,               // >= 70% somados = misto válido
  
  // Regra 3: Temperamento Equilibrado  
  BALANCED_MAX_RANGE: 20,            // <= 20% de diferença entre maior e menor = equilibrado
  
  // Regra 4: Predominância parcial
  PARTIAL_MIN_FIRST: 40,             // >= 40% no primeiro
  PARTIAL_MAX_FIRST: 50,             // <= 50% no primeiro  
  PARTIAL_MIN_SECOND: 25,            // >= 25% no segundo
  PARTIAL_MAX_SECOND: 35             // <= 35% no segundo
};
```

### 2. Lógica de Classificação

#### **Regra 1: Temperamento Puro**
```typescript
if (maiorPercentual > 50 || (maior - segundoMaior) >= 20) {
  return "Puro (" + tipoMaiorPercentual + ")";
}
```
**Exemplo**: Sanguíneo 60% = Puro OU Colérico 45% vs Sanguíneo 20% (diferença 25%) = Puro

#### **Regra 2: Temperamento Misto (dupla dominante)**
```typescript
if ((maior - segundoMaior) <= 15 && (maior + segundoMaior) >= 70) {
  return "Misto: " + tipoMaior + " + " + tipoSegundo;
}
```
**Exemplo**: Sanguíneo 40% + Colérico 35% (diferença 5%, soma 75%) = Misto

#### **Regra 3: Temperamento Equilibrado**
```typescript
if (maior - menor <= 20) {
  return "Equilibrado";
}
```
**Exemplo**: Todos os temperamentos entre 20% e 30% = Equilibrado

#### **Regra 4: Predominância Parcial**
```typescript
if (maior >= 40 && maior <= 50 && segundoMaior >= 25 && segundoMaior <= 35) {
  return "Predominantemente " + tipoMaior + " com traços de " + tipoSegundo;
}
```
**Exemplo**: Melancólico 45% + Fleumático 30% = Predominantemente Melancólico com traços de Fleumático

### 2. Faixas Etárias

```typescript
export const AGE_GROUPS = {
  YOUNG: { min: 0, max: 24, label: "jovem" },
  ADULT: { min: 25, max: 44, label: "adulto" },  
  MATURE: { min: 45, max: 150, label: "maduro" }
};
```

## 🎯 Adicionando Regras Personalizadas

### Exemplo: Jovem Empreendedor

```typescript
// Em result-config.ts, adicione ao array CUSTOM_RESULT_RULES:
{
  id: "young_entrepreneur",
  name: "Jovem Empreendedor",
  priority: 9,
  conditions: [
    { type: "age_range", minAge: 18, maxAge: 30 },
    { type: "minimum_percentage", temperament: Temperament.COLERICO, minPercentage: 45 },
    { type: "minimum_percentage", temperament: Temperament.SANGUINEO, minPercentage: 35 }
  ],
  result: {
    title: "O Jovem Empreendedor",
    description: "Você combina energia juvenil com liderança...",
    characteristics: ["Ambição empreendedora", "Facilidade para networking"],
    strengths: ["Identificação de oportunidades", "Construção de relacionamentos"],
    developmentAreas: ["Desenvolver paciência", "Melhorar análise financeira"]
  }
}
```

## 🔧 Tipos de Condições

### 1. `pure_temperament` - Temperamento Puro
```typescript
{ type: "pure_temperament", temperament: Temperament.SANGUINEO }
```
Aplica regra: >50% OU diferença ≥20% para o segundo lugar

### 2. `mixed_dominant` - Temperamento Misto  
```typescript
{ type: "mixed_dominant" }
```
Aplica regra: diferença ≤15% entre os 2 primeiros E soma ≥70%

### 3. `balanced` - Temperamento Equilibrado
```typescript
{ type: "balanced" }
```
Aplica regra: diferença entre maior e menor ≤20%

### 4. `partial_dominance` - Predominância Parcial
```typescript
{ type: "partial_dominance" }
```
Aplica regra: primeiro 40-50% E segundo 25-35%

### 5. Condições Legadas (ainda suportadas)

#### `dominant` - Temperamento Dominante
```typescript
{ type: "dominant", temperament: Temperament.SANGUINEO }
```

#### `combination` - Combinação de Temperamentos
```typescript
{ 
  type: "combination", 
  temperaments: [Temperament.SANGUINEO, Temperament.COLERICO] 
}
```

#### `minimum_percentage` - Porcentagem Mínima
```typescript
{ 
  type: "minimum_percentage", 
  temperament: Temperament.COLERICO, 
  minPercentage: 45 
}
```

#### `age_range` - Faixa Etária
```typescript
{ type: "age_range", minAge: 18, maxAge: 30 }
```

## 📊 Sistema de Prioridades (Atualizado)

As regras são processadas por ordem de prioridade (maior = primeiro):

- **Prioridade 10**: Temperamentos puros (>50% OU diferença ≥20%)
- **Prioridade 8**: Temperamentos mistos (diferença ≤15% e soma ≥70%)
- **Prioridade 6**: Temperamento equilibrado (diferença ≤20% entre maior e menor)
- **Prioridade 4**: Predominância parcial (primeiro 40-50%, segundo 25-35%)
- **Prioridade 1**: Padrão indefinido (fallback)

## 🎨 Personalizações por Idade

O sistema automaticamente personaliza as descrições baseado na idade:

```typescript
// Jovem (0-24 anos)
"Como uma pessoa jovem, você tem uma grande oportunidade de desenvolver..."

// Adulto (25-44 anos)  
"Nesta fase adulta da vida, você pode aproveitar essas características..."

// Maduro (45+ anos)
"Com sua experiência de vida, você pode usar essas características..."
```

## 🧪 Testando Configurações

```typescript
// Teste uma configuração específica
function testConfiguration() {
  const responses = Array(8).fill({ temperament: Temperament.SANGUINEO })
    .concat(Array(4).fill({ temperament: Temperament.COLERICO }));
  
  const result = QuizResultEngine.calculateResult(responses, 25);
  
  console.log('Temperamento dominante:', result.dominantTemperament);
  console.log('Título:', result.title);
  console.log('Porcentagens:', result.temperamentScores);
}
```

## 📈 Exemplos de Resultados com Novas Regras

### 🎯 Temperamento Puro
#### Exemplo 1: Por Porcentagem
- **Cenário**: Sanguíneo 60%, Colérico 20%, Melancólico 10%, Fleumático 10%
- **Resultado**: "O Comunicador Natural (Puro)"
- **Regra aplicada**: >50%

#### Exemplo 2: Por Diferença
- **Cenário**: Colérico 45%, Sanguíneo 20%, Melancólico 18%, Fleumático 17%
- **Resultado**: "O Líder Nato (Puro)"
- **Regra aplicada**: Diferença 25% ≥ 20%

### 🤝 Temperamento Misto  
- **Cenário**: Sanguíneo 40%, Colérico 35%, Melancólico 15%, Fleumático 10%
- **Resultado**: "Misto: Sanguíneo + Colérico"
- **Regra aplicada**: Diferença 5% ≤ 15% E soma 75% ≥ 70%

### ⚖️ Temperamento Equilibrado
- **Cenário**: Todos os temperamentos entre 20% e 30%
- **Resultado**: "Personalidade Equilibrada"
- **Regra aplicada**: Diferença entre maior e menor ≤ 20%

### 📊 Predominância Parcial
- **Cenário**: Melancólico 45%, Fleumático 30%, Sanguíneo 15%, Colérico 10%
- **Resultado**: "Predominantemente Melancólico com traços de Fleumático"
- **Regra aplicada**: Primeiro 40-50% E segundo 25-35%

## 🔄 Migração do Sistema Antigo

O sistema antigo foi mantido como fallback. Para migrar completamente:

1. **Teste** todas as configurações novas
2. **Valide** que os resultados estão corretos
3. **Monitore** por inconsistências
4. **Ajuste** os thresholds se necessário

## 🚨 Considerações Importantes

1. **Performance**: O sistema processa regras em ordem de prioridade
2. **Fallback**: Sempre há uma regra genérica como backup
3. **Extensibilidade**: Fácil adicionar novas regras sem alterar código principal
4. **Configurabilidade**: Todos os thresholds e textos são configuráveis

## 📝 Próximos Passos

1. **Implementar** regras específicas por profissão/setor
2. **Adicionar** suporte a múltiplas combinações (3+ temperamentos)
3. **Integrar** com APIs externas para recomendações
4. **Criar** interface administrativa para configurar regras
5. **Implementar** A/B testing para diferentes configurações

## 🤝 Contribuindo

Para adicionar novas regras:

1. Defina a regra em `result-config.ts`
2. Teste com diferentes cenários
3. Documente a lógica e casos de uso
4. Valide com usuários reais

---

**Dica**: Use o arquivo `result-examples.ts` como referência para implementações mais complexas!
