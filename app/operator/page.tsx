'use client'

import React from 'react'
import { Navigation } from '@/components/Navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { TopologyGraph } from '@/components/TopologyGraph'
import { TelemetryPanel } from '@/components/TelemetryPanel'
import { useRuntimeStore } from '@/store/runtime'
import { t } from '@/lib/i18n'
import { getHealthColor, getStatusColor } from '@/lib/utils'
import { Server, Activity, AlertTriangle, RefreshCw } from 'lucide-react'

export default function OperatorPage() {
  const { language, topology } = useRuntimeStore()
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t(language, 'operator.title')}</h1>
          <p className="text-xl text-muted-foreground">{t(language, 'operator.subtitle')}</p>
        </div>
        
        <div className="space-y-8">
          {/* Provider Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Server className="w-5 h-5" />
                <span>{t(language, 'operator.providers')}</span>
              </CardTitle>
              <CardDescription>Статус всех AI провайдеров</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topology.nodes
                  .filter(node => node.type === 'provider')
                  .map((provider) => (
                    <div
                      key={provider.id}
                      className="p-4 rounded-lg bg-secondary/30 border border-border"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{provider.label}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(provider.status)} bg-opacity-10`}>
                          {provider.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Health:</span>
                          <span className={`font-bold ${getHealthColor(provider.health)}`}>
                            {provider.health}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Latency:</span>
                          <span>{Math.round(provider.metrics.latency)}ms</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Throughput:</span>
                          <span>{Math.round(provider.metrics.throughput)}/s</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Error Rate:</span>
                          <span className={provider.metrics.errorRate > 2 ? 'text-red-500' : ''}>
                            {provider.metrics.errorRate.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                      
                      {/* Health bar */}
                      <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            provider.health >= 80 ? 'bg-green-500' :
                            provider.health >= 50 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${provider.health}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
          
          {/* System Overview */}
          <div className="grid lg:grid-cols-2 gap-8">
            <TopologyGraph />
            <TelemetryPanel />
          </div>
          
          {/* Recovery Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RefreshCw className="w-5 h-5" />
                <span>{t(language, 'operator.recovery')}</span>
              </CardTitle>
              <CardDescription>История восстановления и автоматических действий</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recoveryActions.map((action, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-secondary/30 border border-border"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start space-x-3">
                        {action.type === 'success' ? (
                          <RefreshCw className="w-5 h-5 text-green-500 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                        )}
                        <div>
                          <h4 className="font-semibold">{action.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                        {action.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

const recoveryActions = [
  {
    type: 'success',
    title: 'Автоматическое переключение провайдера',
    description: 'GPT Provider показал высокую задержку. Трафик перенаправлен на Claude Provider.',
    timestamp: '2 мин назад',
  },
  {
    type: 'success',
    title: 'Восстановление после сбоя',
    description: 'Backup Provider восстановлен и вернулся в пул доступных провайдеров.',
    timestamp: '15 мин назад',
  },
  {
    type: 'warning',
    title: 'Обнаружено повышение нагрузки',
    description: 'Система автоматически увеличила ресурсы оркестратора.',
    timestamp: '1 час назад',
  },
]
