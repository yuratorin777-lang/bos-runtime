'use client'

import React from 'react'
import { Card, CardContent } from './ui/Card'
import { useRuntimeStore } from '@/store/runtime'
import { t } from '@/lib/i18n'
import { formatDuration, formatNumber } from '@/lib/utils'
import { Activity, Zap, Brain, Clock, Database, Shield, AlertTriangle } from 'lucide-react'

export function MetricsPanel() {
  const { metrics, language } = useRuntimeStore()
  
  const metricCards = [
    { 
      label: t(language, 'metrics.uptime'), 
      value: formatDuration(Date.now() - metrics.uptime),
      icon: Clock,
      color: 'text-blue-500'
    },
    { 
      label: t(language, 'metrics.requests'), 
      value: formatNumber(metrics.requestsProcessed),
      icon: Activity,
      color: 'text-green-500'
    },
    { 
      label: t(language, 'metrics.agents'), 
      value: metrics.activeAgents.toString(),
      icon: Brain,
      color: 'text-purple-500'
    },
    { 
      label: t(language, 'metrics.depth'), 
      value: metrics.cognitionDepth.toString(),
      icon: Zap,
      color: 'text-emerald-500'
    },
    { 
      label: t(language, 'metrics.latency'), 
      value: `${Math.round(metrics.orchestrationLatency)}ms`,
      icon: Clock,
      color: 'text-yellow-500'
    },
    { 
      label: t(language, 'metrics.memory'), 
      value: `${Math.round(metrics.memoryUsage)}%`,
      icon: Database,
      color: 'text-cyan-500'
    },
    { 
      label: t(language, 'metrics.health'), 
      value: `${Math.round(metrics.providerHealth)}%`,
      icon: Shield,
      color: 'text-green-500'
    },
    { 
      label: t(language, 'metrics.failovers'), 
      value: metrics.failoverCount.toString(),
      icon: AlertTriangle,
      color: 'text-orange-500'
    },
  ]
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metricCards.map((metric, idx) => {
        const Icon = metric.icon
        return (
          <Card key={idx} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className={cn('p-2 rounded-lg bg-opacity-10', metric.color)}>
                  <Icon className={cn('w-5 h-5', metric.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
