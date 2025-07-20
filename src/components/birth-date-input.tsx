"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { parseBrazilianDate, calculateAge } from "@/lib/utils";

interface BirthDateInputProps {
  onDateSubmit: (date: Date, age: number) => void;
}

export function BirthDateInput({ onDateSubmit }: BirthDateInputProps) {
  const [dateInput, setDateInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dateInput.trim()) {
      setError("Por favor, insira sua data de nascimento");
      return;
    }

    const date = parseBrazilianDate(dateInput);
    
    if (!date) {
      setError("Formato de data inválido. Use DD/MM/AAAA");
      return;
    }

    const today = new Date();
    if (date > today) {
      setError("A data de nascimento não pode ser no futuro");
      return;
    }

    const age = calculateAge(date);
    if (age < 13) {
      setError("Você deve ter pelo menos 13 anos para fazer o quiz");
      return;
    }

    if (age > 120) {
      setError("Por favor, verifique a data inserida");
      return;
    }

    setError("");
    onDateSubmit(date, age);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2);
    }
    if (value.length >= 5) {
      value = value.substring(0, 5) + "/" + value.substring(5, 9);
    }
    
    setDateInput(value);
    if (error) setError("");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Descubra seu Temperamento</CardTitle>
        <CardDescription>
          Responda ao nosso quiz personalizado e descubra qual é o seu temperamento dominante
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="birthDate" className="text-sm font-medium">
              Data de Nascimento
            </label>
            <Input
              id="birthDate"
              type="text"
              placeholder="DD/MM/AAAA"
              value={dateInput}
              onChange={handleInputChange}
              maxLength={10}
              className={error ? "border-red-500" : ""}
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Iniciar Quiz
          </Button>
        </form>
        <div className="text-center mt-4">
          <a 
            href="/login" 
            className="text-sm text-muted-foreground hover:text-primary underline"
          >
            Acesso Administrativo
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
