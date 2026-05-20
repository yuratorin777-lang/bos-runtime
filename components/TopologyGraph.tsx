'use client'

import React, { useCallback } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card'
import { useRuntimeStore } from '@/store/runtime'
import { t } from '@/lib/i18n'
import { getHealthColor } from '@/lib/utils'

export function TopologyGraph() {
  const { topology, language } = useRuntimeStore()
  
  // Convert topology data to ReactFlow format
  const initialNodes: Node[] = topology.nodes.map((node, idx) => ({
    id: node.id,
    type: 'default',
    position: { 
      x: (idx % 3) * 250 + 100, 
      y: Math.floor(idx / 3) * 150 + 50 
    },
    data: {
      label: (
        <div className="px-4 py-2">
          <div className="font-semibold text-sm">{node.label}</div>
          <div className="text-xs text-muted-foreground">{node.type}</div>
          <div className={`text-xs ${getHealthColor(node.health)}`}>
            {node.health}% • {node.status}
          </div>
        </div>
      ),
    },
    style: {
      background: 'hsl(var(--card))',
      border: `2px solid ${node.status === 'active' ? '#10b981' : node.status === 'degraded' ? '#f59e0b' : '#ef4444'}`,
      borderRadius: '8px',
      padding: 0,
    },
  }))
  
  const initialEdges: Edge[] = topology.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    animated: edge.active,
    style: {
      stroke: edge.active ? '#3b82f6' : '#64748b',
      strokeWidth: 2,
    },
  }))
  
  const [nodes] = useNodesState(initialNodes)
  const [edges] = useEdgesState(initialEdges)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(language, 'dashboard.topology')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] bg-secondary/30 rounded-lg border border-border">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            attributionPosition="bottom-left"
          >
            <Background color="#3b82f6" gap={16} />
            <Controls />
            <MiniMap 
              nodeColor={(node) => {
                const topologyNode = topology.nodes.find(n => n.id === node.id)
                if (!topologyNode) return '#666'
                if (topologyNode.status === 'active') return '#10b981'
                if (topologyNode.status === 'degraded') return '#f59e0b'
                return '#ef4444'
              }}
            />
          </ReactFlow>
        </div>
      </CardContent>
    </Card>
  )
}
