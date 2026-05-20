'use client'

import React from 'react'
import { Navigation } from '@/components/Navigation'
import { MetricsPanel } from '@/components/MetricsPanel'
import { AIAgentsPanel } from '@/components/AIAgentsPanel'
import { TopologyGraph } from '@/components/TopologyGraph'
import { CognitionStream } from '@/components/CognitionStream'
import { TelemetryPanel } from '@/components/TelemetryPanel'
import { useRuntimeStore } from '@/store/runtime'
import { t } from '@/lib/i18n'

export default function DashboardPage() {
  const { language } = useRuntimeStore()
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t(language, 'dashboard.title')}</h1>
          <p className="text-xl text-muted-foreground">{t(language, 'dashboard.subtitle')}</p>
        </div>
        
        <div className="space-y-8">
          {/* Metrics */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t(language, 'dashboard.metrics')}</h2>
            <MetricsPanel />
          </section>
          
          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            <TopologyGraph />
            <AIAgentsPanel />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <CognitionStream />
            <TelemetryPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
