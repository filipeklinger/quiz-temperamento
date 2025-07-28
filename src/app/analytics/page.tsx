"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsData, UserResult } from "@/types/analytics";
import { formatTime } from "@/lib/utils";
import { ArrowLeft, Users, TrendingUp, Calendar, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
          <p className="text-gray-900 dark:text-gray-100">Carregando analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-900 dark:text-gray-100">Erro ao carregar dados de analytics.</p>
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
    // Usar formatação consistente que não varia entre servidor e cliente
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Calcular paginação
  const totalResults = analytics?.results.length || 0;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = analytics?.results.slice(startIndex, endIndex) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Button onClick={handleBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Analytics do Quiz</h1>
              <p className="text-gray-600 dark:text-gray-300">Análise dos resultados dos usuários</p>
            </div>
          </div>
          
          {/* {analytics && analytics.totalUsers > 0 && (
            <Button 
              onClick={() => setShowClearConfirm(true)} 
              variant="destructive"
              className="self-start sm:self-auto"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar Dados
            </Button>
          )} */}
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(() => {
                  const timesWithCompletion = analytics.results.filter(r => r.timeToComplete);
                  if (timesWithCompletion.length === 0) return 'N/A';
                  const avgTime = timesWithCompletion.reduce((sum, r) => sum + (r.timeToComplete || 0), 0) / timesWithCompletion.length;
                  return formatTime(Math.round(avgTime));
                })()}
              </div>
              <p className="text-xs text-muted-foreground">
                Tempo médio para completar o quiz
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(() => {
                  const totalWithQuestions = analytics.results.filter(r => r.totalQuestions);
                  if (totalWithQuestions.length === 0) return 'N/A';
                  const avgQuestions = totalWithQuestions.reduce((sum, r) => sum + (r.totalQuestions || 0), 0) / totalWithQuestions.length;
                  return `${Math.round((avgQuestions / 12) * 100)}%`;
                })()}
              </div>
              <p className="text-xs text-muted-foreground">
                Porcentagem média de conclusão
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
              Lista completa de todos os usuários que fizeram o quiz ({totalResults} resultados)
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
                    <th className="text-left p-2">Perguntas Respondidas</th>
                    <th className="text-left p-2">Tempo para Completar</th>
                    <th className="text-left p-2">Pontuações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentResults.map((result) => (
                    <tr key={result.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
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
                      <td className="p-2">{result.totalQuestions || 'N/A'}</td>
                      <td className="p-2">{formatTime(result.timeToComplete)}</td>
                      <td className="p-2 text-sm">
                        {Object.entries(result.temperamentScores).map(([temp, score]) => (
                          <span key={temp} className="mr-2">
                            {temperamentLabels[temp as keyof typeof temperamentLabels]}: {score}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                  {totalResults === 0 && (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-gray-500 dark:text-gray-400">
                        Nenhum resultado encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Controles de Paginação */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, totalResults)} de {totalResults} resultados
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Mostrar apenas algumas páginas para evitar muitos botões
                      const showPage = 
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 2 && page <= currentPage + 2);
                      
                      if (!showPage) {
                        // Mostrar "..." apenas uma vez entre grupos
                        if (page === currentPage - 3 || page === currentPage + 3) {
                          return (
                            <span key={page} className="px-2 py-1 text-gray-500">
                              ...
                            </span>
                          );
                        }
                        return null;
                      }
                      
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal de Confirmação para Limpar Dados */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <Trash2 className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Confirmar Exclusão</h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
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
