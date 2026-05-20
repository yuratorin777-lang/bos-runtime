import { AIAgent, TopologyNode, TopologyEdge, RuntimeMetrics, TelemetryEvent, CognitionNode } from '@/types'

export function generateMockAgents(): AIAgent[] {
  return [
    {
      id: 'agent-1',
      type: 'architect',
      name: 'AI Архитектор',
      status: 'thinking',
      currentTask: 'Проектирование системы оркестрации',
      cognitionLevel: 87,
      executionCount: 234,
      lastActivity: new Date(),
    },
    {
      id: 'agent-2',
      type: 'analyst',
      name: 'AI Аналитик',
      status: 'executing',
      currentTask: 'Анализ метрик производительности',
      cognitionLevel: 92,
      executionCount: 456,
      lastActivity: new Date(Date.now() - 30000),
    },
    {
      id: 'agent-3',
      type: 'orchestrator',
      name: 'AI Оркестратор',
      status: 'collaborating',
      currentTask: 'Координация между провайдерами',
      cognitionLevel: 95,
      executionCount: 789,
      lastActivity: new Date(Date.now() - 5000),
    },
    {
      id: 'agent-4',
      type: 'guardian',
      name: 'AI Страж',
      status: 'monitoring',
      currentTask: 'Мониторинг здоровья системы',
      cognitionLevel: 88,
      executionCount: 1203,
      lastActivity: new Date(Date.now() - 2000),
    },
    {
      id: 'agent-5',
      type: 'coordinator',
      name: 'AI Координатор',
      status: 'idle',
      cognitionLevel: 85,
      executionCount: 567,
      lastActivity: new Date(Date.now() - 120000),
    },
  ]
}

export function generateMockTopology(): { nodes: TopologyNode[], edges: TopologyEdge[] } {
  const nodes: TopologyNode[] = [
    {
      id: 'orchestrator-1',
      type: 'orchestrator',
      label: 'Главный оркестратор',
      status: 'active',
      health: 98,
      connections: ['provider-1', 'provider-2', 'memory-1'],
      metrics: { latency: 45, throughput: 850, errorRate: 0.2 },
    },
    {
      id: 'provider-1',
      type: 'provider',
      label: 'Claude Provider',
      status: 'active',
      health: 95,
      connections: ['orchestrator-1', 'cognition-1'],
      metrics: { latency: 120, throughput: 450, errorRate: 0.5 },
    },
    {
      id: 'provider-2',
      type: 'provider',
      label: 'GPT Provider',
      status: 'degraded',
      health: 65,
      connections: ['orchestrator-1', 'cognition-1'],
      metrics: { latency: 280, throughput: 200, errorRate: 5.2 },
    },
    {
      id: 'provider-3',
      type: 'provider',
      label: 'Backup Provider',
      status: 'recovering',
      health: 45,
      connections: ['orchestrator-1'],
      metrics: { latency: 350, throughput: 100, errorRate: 8.1 },
    },
    {
      id: 'memory-1',
      type: 'memory',
      label: 'Операционная память',
      status: 'active',
      health: 92,
      connections: ['orchestrator-1', 'execution-1'],
      metrics: { latency: 15, throughput: 1200, errorRate: 0.1 },
    },
    {
      id: 'cognition-1',
      type: 'cognition',
      label: 'Когнитивный слой',
      status: 'active',
      health: 96,
      connections: ['provider-1', 'provider-2', 'execution-1'],
      metrics: { latency: 80, throughput: 600, errorRate: 0.3 },
    },
    {
      id: 'execution-1',
      type: 'execution',
      label: 'Исполнительный слой',
      status: 'active',
      health: 94,
      connections: ['cognition-1', 'memory-1'],
      metrics: { latency: 55, throughput: 720, errorRate: 0.4 },
    },
  ]

  const edges: TopologyEdge[] = [
    { id: 'e1', source: 'orchestrator-1', target: 'provider-1', type: 'control', active: true, traffic: 85 },
    { id: 'e2', source: 'orchestrator-1', target: 'provider-2', type: 'control', active: true, traffic: 45 },
    { id: 'e3', source: 'orchestrator-1', target: 'provider-3', type: 'failover', active: false, traffic: 0 },
    { id: 'e4', source: 'orchestrator-1', target: 'memory-1', type: 'data', active: true, traffic: 92 },
    { id: 'e5', source: 'provider-1', target: 'cognition-1', type: 'data', active: true, traffic: 78 },
    { id: 'e6', source: 'provider-2', target: 'cognition-1', type: 'data', active: true, traffic: 42 },
    { id: 'e7', source: 'cognition-1', target: 'execution-1', type: 'data', active: true, traffic: 88 },
    { id: 'e8', source: 'memory-1', target: 'execution-1', type: 'data', active: true, traffic: 65 },
  ]

  return { nodes, edges }
}

export function generateMockMetrics(): RuntimeMetrics {
  return {
    uptime: Date.now() - 86400000 * 7, // 7 days
    requestsProcessed: 125847,
    activeAgents: 5,
    cognitionDepth: 12,
    orchestrationLatency: 45,
    memoryUsage: 68,
    providerHealth: 85,
    failoverCount: 3,
  }
}

export function generateMockTelemetry(): TelemetryEvent[] {
  const events: TelemetryEvent[] = []
  const now = Date.now()
  
  const templates = [
    { type: 'success', source: 'Orchestrator', message: 'Успешная маршрутизация запроса к Claude' },
    { type: 'warning', source: 'Provider', message: 'Повышенная задержка у GPT Provider' },
    { type: 'info', source: 'Cognition', message: 'Начало обработки сложного запроса' },
    { type: 'recovery', source: 'Orchestrator', message: 'Автоматическое восстановление после ошибки' },
    { type: 'success', source: 'Memory', message: 'Контекст успешно сохранен' },
    { type: 'info', source: 'Agent', message: 'AI Архитектор начал планирование' },
    { type: 'warning', source: 'Provider', message: 'Rate limit приближается к пороговому значению' },
    { type: 'success', source: 'Execution', message: 'Задача выполнена успешно' },
  ]
  
  for (let i = 0; i < 20; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)]
    events.push({
      id: `event-${i}`,
      timestamp: new Date(now - i * 15000),
      type: template.type as any,
      source: template.source,
      message: template.message,
    })
  }
  
  return events
}

export function generateMockCognition(): CognitionNode[] {
  return [
    {
      id: 'cog-1',
      type: 'reasoning',
      content: 'Анализ входящего запроса пользователя',
      timestamp: new Date(Date.now() - 5000),
      agentId: 'agent-1',
      depth: 1,
      children: [
        {
          id: 'cog-2',
          type: 'planning',
          content: 'Декомпозиция задачи на подзадачи',
          timestamp: new Date(Date.now() - 4000),
          agentId: 'agent-1',
          depth: 2,
          children: [
            {
              id: 'cog-3',
              type: 'execution',
              content: 'Выполнение подзадачи 1: извлечение контекста',
              timestamp: new Date(Date.now() - 3000),
              agentId: 'agent-3',
              depth: 3,
            },
            {
              id: 'cog-4',
              type: 'execution',
              content: 'Выполнение подзадачи 2: формирование ответа',
              timestamp: new Date(Date.now() - 2000),
              agentId: 'agent-3',
              depth: 3,
            },
          ],
        },
      ],
    },
    {
      id: 'cog-5',
      type: 'memory',
      content: 'Сохранение результата в операционную память',
      timestamp: new Date(Date.now() - 1000),
      agentId: 'agent-5',
      depth: 1,
    },
    {
      id: 'cog-6',
      type: 'coordination',
      content: 'Координация между агентами для оптимизации',
      timestamp: new Date(),
      agentId: 'agent-3',
      depth: 1,
    },
  ]
}
