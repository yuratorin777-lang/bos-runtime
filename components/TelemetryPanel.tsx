'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card'
import { useRuntimeStore } from '@/store/runtime'
import { t } from '@/lib/i18n'
import { ScrollArea } from './ui/ScrollArea'
import { AlertCircle, CheckCircle, Info, AlertTriangle, RefreshCw } from 'lucide-react'

export function TelemetryPanel() {
  const { telemetry, language } = useRuntimeStore()
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'recovery': return <RefreshCw className="w-4 h-4 text-orange-500" />
      default: return <Info className="w-4 h-4 text-blue-500" />
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(language, 'dashboard.telemetry')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {telemetry.map((event) => (
              <div
                key={event.id}
                className="p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {getIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        {event.source}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(event.timestamp).toLocaleTimeString(language)}
                      </span>
                    </div>
                    <p className="text-sm">{event.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
