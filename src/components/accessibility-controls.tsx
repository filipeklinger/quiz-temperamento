"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Type, Plus, Minus } from 'lucide-react';

export function AccessibilityControls() {
  const { fontSize, increaseFontSize, decreaseFontSize } = useAccessibility();

  const canIncrease = fontSize !== 'extra-large';
  const canDecrease = fontSize !== 'small';

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border p-2 flex items-center gap-2">
      <Type className="w-4 h-4 text-gray-600" />
      <span className="text-xs text-gray-600 hidden sm:inline">Fonte:</span>
      
      <Button
        onClick={decreaseFontSize}
        disabled={!canDecrease}
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0"
        title="Diminuir fonte"
        aria-label="Diminuir tamanho da fonte"
      >
        <Minus className="w-3 h-3" />
      </Button>
      
      <span className="text-xs text-gray-600 px-1 min-w-[2rem] text-center">
        {fontSize === 'small' && 'A'}
        {fontSize === 'medium' && 'A'}
        {fontSize === 'large' && 'A+'}
        {fontSize === 'extra-large' && 'A++'}
      </span>
      
      <Button
        onClick={increaseFontSize}
        disabled={!canIncrease}
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0"
        title="Aumentar fonte"
        aria-label="Aumentar tamanho da fonte"
      >
        <Plus className="w-3 h-3" />
      </Button>
    </div>
  );
}
