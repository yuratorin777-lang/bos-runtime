// BOS Core Types

export type AIAgentType = 'architect' | 'analyst' | 'orchestrator' | 'guardian' | 'coordinator';

export type AIAgentStatus = 'idle' | 'thinking' | 'executing' | 'collaborating' | 'monitoring';

export interface AIAgent {
  id: string;
  type: AIAgentType;
  name: string;
  status: AIAgentStatus;
  currentTask?: string;
  cognitionLevel: number;
  executionCount: number;
  lastActivity: Date;
}

export type CognitionType = 'reasoning' | 'planning' | 'execution' | 'memory' | 'coordination';

export interface CognitionNode {
  id: string;
  type: CognitionType;
  content: string;
  timestamp: Date;
  agentId: string;
  depth: number;
  children?: CognitionNode[];
}

export interface TopologyNode {
  id: string;
  type: 'provider' | 'orchestrator' | 'memory' | 'cognition' | 'execution';
  label: string;
  status: 'active' | 'degraded' | 'failed' | 'recovering';
  health: number;
  connections: string[];
  metrics: {
    latency: number;
    throughput: number;
    errorRate: number;
  };
}

export interface TopologyEdge {
  id: string;
  source: string;
  target: string;
  type: 'data' | 'control' | 'failover';
  active: boolean;
  traffic: number;
}

export interface RuntimeMetrics {
  uptime: number;
  requestsProcessed: number;
  activeAgents: number;
  cognitionDepth: number;
  orchestrationLatency: number;
  memoryUsage: number;
  providerHealth: number;
  failoverCount: number;
}

export interface TelemetryEvent {
  id: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'error' | 'recovery' | 'success';
  source: string;
  message: string;
  metadata?: Record<string, any>;
}

export type UserMode = 'investor' | 'founder' | 'operator';

export type Language = 'ru' | 'en';

export interface RuntimeState {
  mode: UserMode;
  agents: AIAgent[];
  cognition: CognitionNode[];
  topology: {
    nodes: TopologyNode[];
    edges: TopologyEdge[];
  };
  metrics: RuntimeMetrics;
  telemetry: TelemetryEvent[];
  isConnected: boolean;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agentId?: string;
  cognitionNodes?: string[];
}
