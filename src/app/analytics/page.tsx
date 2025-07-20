"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsData, UserResult } from "@/types/analytics";
import { ArrowLeft, Users, TrendingUp, Calendar, Trash2 } from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const temperamentColors = {
  'sanguineo': '#ef4444',
  'colerico': '#eab308', 
  'melancolico': '#3b82f6',
  'fleumatico': '#22c55e'
};

const temperamentLabels = {
  'sanguineo': 'Sanguíneo',
  'colerico': 'Colérico',
  'melancolico': 'Melancólico', 
  'fleumatico': 'Fleumático'
};

export default function AnalyticsPage() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    // Verificar autenticação
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      router.push("/login");
      return;
    }

    fetchAnalytics();
  }, [router]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      const data = await response.json();
      
      if (data.success) {
        setAnalytics(data.data);
      } else {
        console.error('Failed to fetch analytics:', data.error);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/config");
  };

  const handleClearData = async () => {
    setIsClearing(true);
    try {
      const response = await fetch('/api/analytics/clear', {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        // Recarregar os dados após limpar
        await fetchAnalytics();
        setShowClearConfirm(false);
        alert('Todos os resultados foram deletados com sucesso!');
      } else {
        alert('Erro ao deletar os resultados: ' + data.error);
      }
    } catch (error) {
      console.error('Error clearing data:', error);
      alert('Erro ao deletar os resultados');
    } finally {
      setIsClearing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Erro ao carregar dados de analytics.</p>
          <Button onClick={() => router.push("/config")} className="mt-4">
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  // Preparar dados para os gráficos
  const temperamentData = Object.entries(analytics.temperamentDistribution).map(([key, value]) => ({
    name: temperamentLabels[key as keyof typeof temperamentLabels],
    value,
    color: temperamentColors[key as keyof typeof temperamentColors]
  }));

  const ageData = Object.entries(analytics.ageDistribution).map(([key, value]) => ({
    name: key,
    value
  }));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button onClick={handleBack} variant="outline" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics do Quiz</h1>
              <p className="text-gray-600">Análise dos resultados dos usuários</p>
            </div>
          </div>
          
          {analytics && analytics.totalUsers > 0 && (
            <Button 
              onClick={() => setShowClearConfirm(true)} 
              variant="destructive"
              className="ml-4"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar Dados
            </Button>
          )}
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Usuários que completaram o quiz
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperamento Mais Comum</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {temperamentData.length > 0 ? 
                  temperamentData.reduce((prev, current) => (prev.value > current.value) ? prev : current).name
                  : 'N/A'
                }
              </div>
              <p className="text-xs text-muted-foreground">
                Temperamento dominante mais frequente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faixa Etária Mais Ativa</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ageData.length > 0 ? 
                  ageData.reduce((prev, current) => (prev.value > current.value) ? prev : current).name + ' anos'
                  : 'N/A'
                }
              </div>
              <p className="text-xs text-muted-foreground">
                Idade mais frequente nos testes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico de Temperamentos */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Temperamentos</CardTitle>
              <CardDescription>
                Temperamentos dominantes dos usuários que fizeram o quiz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={temperamentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {temperamentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Idades */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Idade</CardTitle>
              <CardDescription>
                Faixas etárias dos usuários que completaram o quiz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Resultados */}
        <Card>
          <CardHeader>
            <CardTitle>Todos os Resultados</CardTitle>
            <CardDescription>
              Lista completa de todos os usuários que fizeram o quiz
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Data do Teste</th>
                    <th className="text-left p-2">Data de Nascimento</th>
                    <th className="text-left p-2">Idade</th>
                    <th className="text-left p-2">Temperamento Dominante</th>
                    <th className="text-left p-2">Pontuações</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.results.map((result) => (
                    <tr key={result.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{formatDate(result.completedAt.toString())}</td>
                      <td className="p-2">{formatDate(result.birthDate.toString())}</td>
                      <td className="p-2">{result.age} anos</td>
                      <td className="p-2">
                        <span 
                          className="px-2 py-1 rounded text-white text-sm"
                          style={{ backgroundColor: temperamentColors[result.dominantTemperament as keyof typeof temperamentColors] }}
                        >
                          {temperamentLabels[result.dominantTemperament as keyof typeof temperamentLabels]}
                        </span>
                      </td>
                      <td className="p-2 text-sm">
                        {Object.entries(result.temperamentScores).map(([temp, score]) => (
                          <span key={temp} className="mr-2">
                            {temperamentLabels[temp as keyof typeof temperamentLabels]}: {score}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                  {analytics.results.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">
                        Nenhum resultado encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Confirmação para Limpar Dados */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <Trash2 className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Confirmar Exclusão</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja deletar <strong>todos os {analytics?.totalUsers} resultados</strong> do banco de dados? 
              <br /><br />
              <span className="text-red-600 font-medium">Esta ação não pode ser desfeita!</span>
            </p>
            
            <div className="flex gap-3 justify-end">
              <Button 
                onClick={() => setShowClearConfirm(false)} 
                variant="outline"
                disabled={isClearing}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleClearData} 
                variant="destructive"
                disabled={isClearing}
              >
                {isClearing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deletando...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Sim, Deletar Tudo
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
