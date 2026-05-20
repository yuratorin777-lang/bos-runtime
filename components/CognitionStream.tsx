'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card'
import { useRuntimeStore } from '@/store/runtime'
import { t } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { Brain, Lightbulb, Zap, Database, GitBranch } from 'lucide-react'
import { CognitionNode } from '@/types'

export function CognitionStream() {
  const { cognition, language } = useRuntimeStore()
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'reasoning': return <Brain className="w-4 h-4" />
      case 'planning': return <Lightbulb className="w-4 h-4" />
      case 'execution': return <Zap className="w-4 h-4" />
      case 'memory': return <Database className="w-4 h-4" />
      case 'coordination': return <GitBranch className="w-4 h-4" />
      default: return <Brain className="w-4 h-4" />
    }
  }
  
  const getColor = (type: string) => {
    switch (type) {
      case 'reasoning': return 'text-bos-cognition border-bos-cognition/30'
      case 'planning': return 'text-bos-orchestration border-bos-orchestration/30'
      case 'execution': return 'text-bos-telemetry border-bos-telemetry/30'
      case 'memory': return 'text-bos-runtime border-bos-runtime/30'
      case 'coordination': return 'text-bos-topology border-bos-topology/30'
      default: return 'text-bos-cognition border-bos-cognition/30'
    }
  }
  
  const renderNode = (node: CognitionNode, index: number) => (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-3"
      style={{ marginLeft: `${node.depth * 24}px` }}
    >
      <div className={`p-4 rounded-lg border-l-4 bg-secondary/30 ${getColor(node.type)}`}>
        <div className="flex items-start space-x-3">
          <div className={`mt-1 ${getColor(node.type).split(' ')[0]}`}>
            {getIcon(node.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium uppercase tracking-wider">
                {node.type}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(node.timestamp).toLocaleTimeString(language)}
              </span>
            </div>
            <p className="text-sm">{node.content}</p>
          </div>
        </div>
      </div>
      {node.children && node.children.map((child, idx) => (
        <div key={child.id}>
          {renderNode(child, index + idx + 1)}
        </div>
      ))}
    </motion.div>
  )
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-bos-cognition" />
          <span>{t(language, 'dashboard.cognition')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {cognition.map((node, idx) => renderNode(node, idx))}
        </div>
      </CardContent>
    </Card>
  )
}
