"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BirthDateInput } from "@/components/birth-date-input";

export default function Home() {
  const router = useRouter();

  const handleDateSubmit = (date: Date, age: number) => {
    // Armazenar dados no localStorage temporariamente
    localStorage.setItem("quizUserData", JSON.stringify({ 
      birthDate: date.toISOString(), 
      age 
    }));
    
    // Navegar para o quiz
    router.push("/quiz");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <BirthDateInput onDateSubmit={handleDateSubmit} />
    </div>
  );
}
