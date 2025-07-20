"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'small' | 'medium' | 'large' | 'extra-large';

interface AccessibilityContextType {
  fontSize: FontSize;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  getFontSizeClass: () => string;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const fontSizeClasses = {
  small: 'text-sm',
  medium: 'text-base', 
  large: 'text-lg',
  'extra-large': 'text-xl'
};

const fontSizes: FontSize[] = ['small', 'medium', 'large', 'extra-large'];

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>('large'); // Aumentando padrão para 'large'

  useEffect(() => {
    // Carregar preferência salva
    const savedFontSize = localStorage.getItem('fontSize') as FontSize;
    if (savedFontSize && fontSizes.includes(savedFontSize)) {
      setFontSize(savedFontSize);
    }
  }, []);

  useEffect(() => {
    // Salvar preferência
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex < fontSizes.length - 1) {
      setFontSize(fontSizes[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(fontSizes[currentIndex - 1]);
    }
  };

  const getFontSizeClass = () => fontSizeClasses[fontSize];

  return (
    <AccessibilityContext.Provider value={{
      fontSize,
      increaseFontSize,
      decreaseFontSize,
      getFontSizeClass
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
