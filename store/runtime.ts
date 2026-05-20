import { create } from 'zustand'
import { RuntimeState, UserMode, Language } from '@/types'
import { generateMockAgents, generateMockTopology, generateMockMetrics, generateMockTelemetry, generateMockCognition } from '@/services/mockData'

interface RuntimeStore extends RuntimeState {
  language: Language
  setMode: (mode: UserMode) => void
  setLanguage: (lang: Language) => void
  updateMetrics: () => void
  addTelemetryEvent: (event: any) => void
  simulateActivity: () => void
}

export const useRuntimeStore = create<RuntimeStore>((set, get) => ({
  mode: 'founder',
  language: 'ru',
  agents: generateMockAgents(),
  cognition: generateMockCognition(),
  topology: generateMockTopology(),
  metrics: generateMockMetrics(),
  telemetry: generateMockTelemetry(),
  isConnected: true,

  setMode: (mode) => set({ mode }),
  
  setLanguage: (language) => set({ language }),
  
  updateMetrics: () => {
    const current = get().metrics
    set({
      metrics: {
        ...current,
        requestsProcessed: current.requestsProcessed + Math.floor(Math.random() * 10),
        orchestrationLatency: 40 + Math.random() * 20,
        memoryUsage: 60 + Math.random() * 20,
        providerHealth: 80 + Math.random() * 15,
      }
    })
  },
  
  addTelemetryEvent: (event) => {
    const telemetry = get().telemetry
    set({
      telemetry: [event, ...telemetry].slice(0, 50)
    })
  },
  
  simulateActivity: () => {
    // Simulate agent activity
    const agents = get().agents.map(agent => {
      const rand = Math.random()
      if (rand < 0.1) {
        const statuses: any[] = ['idle', 'thinking', 'executing', 'collaborating', 'monitoring']
        return {
          ...agent,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          lastActivity: new Date(),
        }
      }
      return agent
    })
    
    // Simulate topology changes
    const topology = get().topology
    const nodes = topology.nodes.map(node => {
      if (Math.random() < 0.05) {
        const health = Math.max(20, Math.min(100, node.health + (Math.random() - 0.5) * 10))
        let status = node.status
        if (health >= 80) status = 'active'
        else if (health >= 50) status = 'degraded'
        else if (health >= 30) status = 'recovering'
        else status = 'failed'
        
        return {
          ...node,
          health,
          status,
          metrics: {
            latency: node.metrics.latency + (Math.random() - 0.5) * 20,
            throughput: Math.max(0, node.metrics.throughput + (Math.random() - 0.5) * 50),
            errorRate: Math.max(0, node.metrics.errorRate + (Math.random() - 0.5) * 2),
          }
        }
      }
      return node
    })
    
    set({ agents, topology: { ...topology, nodes } })
    get().updateMetrics()
  }
}))

// Simulate live updates
if (typeof window !== 'undefined') {
  setInterval(() => {
    useRuntimeStore.getState().simulateActivity()
  }, 3000)
}
