export const translations = {
  ru: {
    nav: {
      dashboard: 'Панель управления',
      investor: 'Режим инвестора',
      founder: 'Режим основателя',
      operator: 'Центр управления',
    },
    dashboard: {
      title: 'Живая панель BOS',
      subtitle: 'Когнитивная операционная система в реальном времени',
      conversation: 'Беседа с AI',
      topology: 'Топология системы',
      cognition: 'Поток познания',
      agents: 'AI команда',
      telemetry: 'Телеметрия',
      metrics: 'Метрики',
    },
    investor: {
      title: 'Режим инвестора',
      subtitle: 'Стратегическая визуализация и аналитика',
      resilience: 'Устойчивость',
      economics: 'Экономика',
      intelligence: 'Интеллект',
      selfHealing: 'Самовосстановление',
    },
    founder: {
      title: 'Режим основателя',
      subtitle: 'Рабочее пространство для исполнения бизнеса',
      workspace: 'Рабочее пространство',
      workflows: 'Рабочие процессы',
      memory: 'Операционная память',
      collaboration: 'Коллаборация',
    },
    operator: {
      title: 'Центр управления оператора',
      subtitle: 'Мониторинг и управление runtime',
      monitoring: 'Мониторинг',
      providers: 'Провайдеры',
      queues: 'Очереди',
      failover: 'Failover',
      recovery: 'Восстановление',
    },
    metrics: {
      uptime: 'Время работы',
      requests: 'Запросов',
      agents: 'Агентов',
      depth: 'Глубина познания',
      latency: 'Задержка',
      memory: 'Память',
      health: 'Здоровье',
      failovers: 'Переключений',
    },
    agents: {
      architect: 'AI Архитектор',
      analyst: 'AI Аналитик',
      orchestrator: 'AI Оркестратор',
      guardian: 'AI Страж',
      coordinator: 'AI Координатор',
    },
    status: {
      idle: 'Ожидание',
      thinking: 'Размышление',
      executing: 'Исполнение',
      collaborating: 'Коллаборация',
      monitoring: 'Мониторинг',
      active: 'Активен',
      degraded: 'Деградация',
      failed: 'Отказ',
      recovering: 'Восстановление',
    },
  },
  en: {
    nav: {
      dashboard: 'Dashboard',
      investor: 'Investor Mode',
      founder: 'Founder Mode',
      operator: 'Control Center',
    },
    dashboard: {
      title: 'Live BOS Dashboard',
      subtitle: 'Cognitive Operating System in Real-Time',
      conversation: 'AI Conversation',
      topology: 'System Topology',
      cognition: 'Cognition Stream',
      agents: 'AI Team',
      telemetry: 'Telemetry',
      metrics: 'Metrics',
    },
    investor: {
      title: 'Investor Mode',
      subtitle: 'Strategic Visualization & Analytics',
      resilience: 'Resilience',
      economics: 'Economics',
      intelligence: 'Intelligence',
      selfHealing: 'Self-Healing',
    },
    founder: {
      title: 'Founder Mode',
      subtitle: 'Business Execution Workspace',
      workspace: 'Workspace',
      workflows: 'Workflows',
      memory: 'Operational Memory',
      collaboration: 'Collaboration',
    },
    operator: {
      title: 'Operator Control Center',
      subtitle: 'Runtime Monitoring & Management',
      monitoring: 'Monitoring',
      providers: 'Providers',
      queues: 'Queues',
      failover: 'Failover',
      recovery: 'Recovery',
    },
    metrics: {
      uptime: 'Uptime',
      requests: 'Requests',
      agents: 'Agents',
      depth: 'Cognition Depth',
      latency: 'Latency',
      memory: 'Memory',
      health: 'Health',
      failovers: 'Failovers',
    },
    agents: {
      architect: 'AI Architect',
      analyst: 'AI Analyst',
      orchestrator: 'AI Orchestrator',
      guardian: 'AI Guardian',
      coordinator: 'AI Coordinator',
    },
    status: {
      idle: 'Idle',
      thinking: 'Thinking',
      executing: 'Executing',
      collaborating: 'Collaborating',
      monitoring: 'Monitoring',
      active: 'Active',
      degraded: 'Degraded',
      failed: 'Failed',
      recovering: 'Recovering',
    },
  },
}

export type Language = 'ru' | 'en'

export function t(lang: Language, key: string): string {
  const keys = key.split('.')
  let value: any = translations[lang]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}
