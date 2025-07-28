import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

export function formatBirthDate(date: Date): string {
  // Usar formatação consistente que não varia entre servidor e cliente
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDate(date: Date): string {
  // Usar formatação consistente que não varia entre servidor e cliente
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function parseBrazilianDate(dateStr: string): Date | null {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateStr.match(regex);
  
  if (!match) return null;
  
  const [, day, month, year] = match;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  
  // Verificar se a data é válida
  if (date.getDate() !== parseInt(day) || 
      date.getMonth() !== parseInt(month) - 1 || 
      date.getFullYear() !== parseInt(year)) {
    return null;
  }
  
  return date;
}

/**
 * Embaralha um array usando o algoritmo Fisher-Yates
 * @param array Array para embaralhar
 * @returns Novo array embaralhado
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Gerador de números pseudo-aleatórios baseado em seed
 * Implementação simples de LCG (Linear Congruential Generator)
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

/**
 * Embaralha um array usando uma seed determinística
 * @param array Array para embaralhar
 * @param seed Seed para determinismo
 * @returns Novo array embaralhado
 */
export function shuffleArrayWithSeed<T>(array: T[], seed: string): T[] {
  const shuffled = [...array];
  
  // Converter seed string em número
  let numericSeed = 0;
  for (let i = 0; i < seed.length; i++) {
    numericSeed = ((numericSeed << 5) - numericSeed + seed.charCodeAt(i)) & 0xffffffff;
  }
  
  const rng = new SeededRandom(Math.abs(numericSeed));
  
  // Fisher-Yates shuffle com seed
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * Formata tempo em segundos para uma string legível
 * @param seconds Tempo em segundos
 * @returns String formatada (ex: "2min 30s", "1h 15min")
 */
export function formatTime(seconds: number | null): string {
  if (!seconds || seconds <= 0) return "Não disponível";
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  } else if (minutes > 0) {
    return `${minutes}min ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
}
