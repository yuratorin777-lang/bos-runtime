'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card'
import { useRuntimeStore } from '@/store/runtime'
import { t } from '@/lib/i18n'
import { getStatusColor } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Brain, Activity } from 'lucide-react'

export function AIAgentsPanel() {
  const { agents, language } = useRuntimeStore()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-bos-ai" />
          <span>{t(language, 'dashboard.agents')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agents.map((agent, idx) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)} animate-pulse`} />
                  <span className="font-semibold">{agent.name}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(agent.status)} bg-opacity-10`}>
                  {t(language, `status.${agent.status}`)}
                </span>
              </div>
              
              {agent.currentTask && (
                <p className="text-sm text-muted-foreground mb-2">
                  {agent.currentTask}
                </p>
              )}
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Activity className="w-3 h-3" />
                    <span>{agent.executionCount}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Brain className="w-3 h-3" />
                    <span>{agent.cognitionLevel}%</span>
                  </div>
                </div>
                <span className="text-muted-foreground">
                  {new Date(agent.lastActivity).toLocaleTimeString(language)}
                </span>
              </div>
              
              {/* Cognition level bar */}
              <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${agent.cognitionLevel}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className="h-full bg-gradient-to-r from-bos-cognition to-bos-ai"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
