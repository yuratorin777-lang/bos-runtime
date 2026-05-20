'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { useRuntimeStore } from '@/store/runtime'
import { t } from '@/lib/i18n'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Send, MessageSquare, Brain, Zap, TrendingUp, Target, Lightbulb } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function FounderPage() {
  const { language, metrics } = useRuntimeStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    console.log('🚀 [Frontend] Sending chat request:', {
      messagesCount: messages.length + 1,
      userMessage: userMessage.content
    });

    try {
      const requestBody = {
        messages: [...messages, userMessage],
        stream: false,
        mode: 'founder',
      };

      console.log('📤 [Frontend] Request body:', requestBody);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      console.log('📥 [Frontend] Response received:', {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [Frontend] Error response:', errorText);
        throw new Error(`Failed to get response: ${response.status} ${errorText}`)
      }

      const data = await response.json()
      console.log('✅ [Frontend] Response data:', {
        hasMessage: !!data.message,
        messageLength: data.message?.length || 0
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message || 'Ошибка получения ответа',
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error: any) {
      console.error('❌ [Frontend] Chat error:', {
        message: error.message,
        stack: error.stack,
        error: error
      });
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Произошла ошибка при обработке запроса: ${error.message}`,
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Strategic intelligence data
  const strategyData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'][i],
    efficiency: 70 + i * 2 + Math.random() * 10,
    innovation: 60 + i * 2.5 + Math.random() * 15,
  }))

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t(language, 'founder.title')}</h1>
          <p className="text-xl text-muted-foreground">{t(language, 'founder.subtitle')}</p>
        </div>
        
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-8 h-8 text-blue-500" />
                  <span className="text-3xl font-bold">87%</span>
                </div>
                <p className="text-sm text-muted-foreground">Стратегическая точность</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Lightbulb className="w-8 h-8 text-yellow-500" />
                  <span className="text-3xl font-bold">{metrics.cognitionDepth}</span>
                </div>
                <p className="text-sm text-muted-foreground">Глубина анализа</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                  <span className="text-3xl font-bold">+24%</span>
                </div>
                <p className="text-sm text-muted-foreground">Рост эффективности</p>
              </CardContent>
            </Card>
          </div>

          {/* Strategic Intelligence Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Стратегический интеллект</CardTitle>
              <CardDescription>Динамика эффективности и инноваций</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={strategyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Эффективность"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="innovation" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Инновации"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Compact Chat Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Strategic AI Assistant
              </CardTitle>
              <CardDescription>Задавайте стратегические вопросы AI</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Messages Area - Compact */}
              {messages.length > 0 && (
                <div className="max-h-[300px] overflow-y-auto space-y-3 p-3 bg-secondary/20 rounded-lg">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                          msg.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                        <p className="text-muted-foreground">Думаю...</p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}

              {/* Input Form - Compact */}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Задайте вопрос BOS AI..."
                  disabled={isLoading}
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Chat Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {messages.length} сообщений
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    GPT-4o активен
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
