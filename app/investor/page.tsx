'use client'

import React from 'react'
import { Navigation } from '@/components/Navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { useRuntimeStore } from '@/store/runtime'
import { t } from '@/lib/i18n'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Shield, DollarSign, Brain, Activity } from 'lucide-react'

export default function InvestorPage() {
  const { language, metrics } = useRuntimeStore()
  
  // Mock data for charts
  const resilienceData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    health: 85 + Math.random() * 15,
    uptime: 95 + Math.random() * 5,
  }))
  
  const economicsData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'][i],
    cost: 1000 + i * 200 + Math.random() * 300,
    value: 3000 + i * 500 + Math.random() * 1000,
  }))
  
  const intelligenceData = Array.from({ length: 20 }, (_, i) => ({
    request: i + 1,
    complexity: Math.random() * 100,
    resolution: 80 + Math.random() * 20,
  }))
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t(language, 'investor.title')}</h1>
          <p className="text-xl text-muted-foreground">{t(language, 'investor.subtitle')}</p>
        </div>
        
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Shield className="w-8 h-8 text-green-500" />
                  <span className="text-3xl font-bold">{Math.round(metrics.providerHealth)}%</span>
                </div>
                <p className="text-sm text-muted-foreground">Устойчивость</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-8 h-8 text-blue-500" />
                  <span className="text-3xl font-bold">3.2x</span>
                </div>
                <p className="text-sm text-muted-foreground">ROI множитель</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Brain className="w-8 h-8 text-purple-500" />
                  <span className="text-3xl font-bold">{metrics.cognitionDepth}</span>
                </div>
                <p className="text-sm text-muted-foreground">Глубина познания</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-8 h-8 text-orange-500" />
                  <span className="text-3xl font-bold">{metrics.failoverCount}</span>
                </div>
                <p className="text-sm text-muted-foreground">Автовосстановлений</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Resilience Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t(language, 'investor.resilience')}</CardTitle>
              <CardDescription>Показатели надежности и uptime за 24 часа</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={resilienceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="health" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.3}
                    name="Health"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="uptime" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.3}
                    name="Uptime"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Economics Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t(language, 'investor.economics')}</CardTitle>
              <CardDescription>Экономика runtime: затраты vs создаваемая стоимость</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={economicsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  />
                  <Bar dataKey="cost" fill="#ef4444" name="Затраты" />
                  <Bar dataKey="value" fill="#10b981" name="Стоимость" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Intelligence Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t(language, 'investor.intelligence')}</CardTitle>
              <CardDescription>Демонстрация стратегического интеллекта</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={intelligenceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="request" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="complexity" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Сложность"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="resolution" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="Разрешение"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
