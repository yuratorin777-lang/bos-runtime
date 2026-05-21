/**
 * BOS COGNITION LAYER
 * 
 * Слой операционного интеллекта BOS
 * Трансформирует LLM из простых генераторов ответов в BOS-aware когнитивную систему
 * 
 * Архитектура:
 * User → BOS Runtime → BOS Cognition Layer → Memory → Knowledge → Router → Model → Response Processor → BOS Response
 */

import fs from 'fs';
import path from 'path';

// ============================================================================
// ТИПЫ И ИНТЕРФЕЙСЫ
// ============================================================================

export interface CognitionContext {
  systemCore: string;           // /BOS_CORE/SYSTEM_CORE.md
  founderContext: string;        // /BOS_CORE/FOUNDER_CONTEXT.md  
  currentState: string;          // /BOS_CORE/CURRENT_STATE.md
  investorNarrative: string;     // /BOS_CORE/INVESTOR_NARRATIVE.md
  retrievedKnowledge: string[];  // Релевантные документы из Knowledge Layer
  sessionMemory: MemoryContext;  // Контекст сессии из Memory Layer
}

export interface MemoryContext {
  sessionId: string;
  conversationHistory: Array<{ role: string; content: string; timestamp: number }>;
  userContext: Record<string, any>;
  projectContext: Record<string, any>;
  activeGoals: string[];
  knowledgeGraph: Record<string, string[]>;
}

export interface RoutingDecision {
  selectedModel: string;
  reasoning: string;
  taskType: 'strategy' | 'execution' | 'analysis' | 'code' | 'creative' | 'hybrid';
  priority: 'speed' | 'quality' | 'cost';
}

export interface BOSResponse {
  content: string;
  model: string;
  processingTime: number;
  cognitionMetadata: {
    contextUsed: string[];
    memoryAccessed: boolean;
    knowledgeRetrieved: number;
    routingDecision: string;
  };
}

// ============================================================================
// BOS SYSTEM CONTEXT ENGINE
// ============================================================================

export class BOSSystemContextEngine {
  private contextCache: Map<string, { content: string; timestamp: number }> = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5 минут
  private basePath: string;

  constructor(basePath: string = process.cwd()) {
    this.basePath = basePath;
  }

  /**
   * Загрузить все базовые BOS контексты
   */
  async loadSystemContext(): Promise<Pick<CognitionContext, 'systemCore' | 'founderContext' | 'currentState' | 'investorNarrative'>> {
    const coreFiles = [
      'BOS_CORE/SYSTEM_CORE.md',
      'BOS_CORE/FOUNDER_CONTEXT.md',
      'BOS_CORE/CURRENT_STATE.md',
      'BOS_CORE/INVESTOR_NARRATIVE.md'
    ];

    const [systemCore, founderContext, currentState, investorNarrative] = await Promise.all(
      coreFiles.map(file => this.loadFileWithCache(file))
    );

    return {
      systemCore,
      founderContext,
      currentState,
      investorNarrative
    };
  }

  /**
   * Загрузить файл с кэшированием
   */
  private async loadFileWithCache(filePath: string): Promise<string> {
    const now = Date.now();
    const cached = this.contextCache.get(filePath);

    // Проверяем кэш
    if (cached && (now - cached.timestamp) < this.cacheTimeout) {
      return cached.content;
    }

    // Загружаем файл
    try {
      const fullPath = path.join(this.basePath, filePath);
      const content = await fs.promises.readFile(fullPath, 'utf-8');
      
      // Кэшируем
      this.contextCache.set(filePath, { content, timestamp: now });
      
      return content;
    } catch (error) {
      console.warn(`⚠️ [BOS Context] Failed to load ${filePath}:`, error);
      return '';
    }
  }

  /**
   * Очистить кэш (для force refresh)
   */
  clearCache(): void {
    this.contextCache.clear();
  }
}

// ============================================================================
// BOS KNOWLEDGE LAYER (RAG)
// ============================================================================

export class BOSKnowledgeLayer {
  private knowledgeBase: Map<string, string> = new Map();
  private basePath: string;

  constructor(basePath: string = process.cwd()) {
    this.basePath = basePath;
  }

  /**
   * Инициализировать базу знаний
   */
  async initialize(): Promise<void> {
    const knowledgePaths = [
      'BOS_CORE/KNOWLEDGE',
      'BOS_CORE/ARCHITECTURE',
      'BOS_CORE/ROADMAP',
      'BOS_CORE/RUNTIME'
    ];

    for (const knowledgePath of knowledgePaths) {
      await this.indexDirectory(knowledgePath);
    }

    console.log(`✅ [BOS Knowledge] Indexed ${this.knowledgeBase.size} documents`);
  }

  /**
   * Индексировать директорию
   */
  private async indexDirectory(dirPath: string): Promise<void> {
    try {
      const fullPath = path.join(this.basePath, dirPath);
      const files = await this.walkDirectory(fullPath);
      
      for (const file of files) {
        if (file.endsWith('.md') || file.endsWith('.txt')) {
          const content = await fs.promises.readFile(file, 'utf-8');
          const relativePath = path.relative(this.basePath, file);
          this.knowledgeBase.set(relativePath, content);
        }
      }
    } catch (error) {
      console.warn(`⚠️ [BOS Knowledge] Failed to index ${dirPath}:`, error);
    }
  }

  /**
   * Рекурсивно пройти по директории
   */
  private async walkDirectory(dir: string): Promise<string[]> {
    const files: string[] = [];
    
    try {
      const entries = await fs.promises.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          files.push(...await this.walkDirectory(fullPath));
        } else {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Директория не существует или недоступна
    }
    
    return files;
  }

  /**
   * Извлечь релевантные знания (простой keyword-based поиск)
   * TODO: В будущем использовать векторный поиск (embeddings)
   */
  async retrieveRelevantKnowledge(query: string, limit: number = 3): Promise<string[]> {
    const queryLower = query.toLowerCase();
    const keywords = this.extractKeywords(queryLower);
    
    // Подсчитываем релевантность каждого документа
    const scores: Array<{ path: string; content: string; score: number }> = [];
    
    for (const [docPath, content] of this.knowledgeBase.entries()) {
      const contentLower = content.toLowerCase();
      let score = 0;
      
      // Подсчет совпадений ключевых слов
      for (const keyword of keywords) {
        const matches = (contentLower.match(new RegExp(keyword, 'g')) || []).length;
        score += matches;
      }
      
      if (score > 0) {
        scores.push({ path: docPath, content, score });
      }
    }
    
    // Сортируем по релевантности и берем топ N
    scores.sort((a, b) => b.score - a.score);
    
    return scores.slice(0, limit).map(item => {
      // Возвращаем сокращенную версию документа (первые 1000 символов)
      const preview = item.content.substring(0, 1000);
      return `\n[Документ: ${item.path}]\n${preview}\n...`;
    });
  }

  /**
   * Извлечь ключевые слова из запроса
   */
  private extractKeywords(text: string): string[] {
    // Убираем стоп-слова и короткие слова
    const stopWords = new Set(['и', 'в', 'на', 'с', 'по', 'для', 'как', 'что', 'это', 'о', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for']);
    
    return text
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word))
      .slice(0, 10); // Максимум 10 ключевых слов
  }
}

// ============================================================================
// BOS MEMORY LAYER
// ============================================================================

export class BOSMemoryLayer {
  private sessions: Map<string, MemoryContext> = new Map();
  private persistencePath: string;

  constructor(persistencePath: string = './bos-memory-store') {
    this.persistencePath = persistencePath;
  }

  /**
   * Получить или создать контекст сессии
   */
  async getSessionContext(sessionId: string): Promise<MemoryContext> {
    if (this.sessions.has(sessionId)) {
      return this.sessions.get(sessionId)!;
    }

    // Попытка загрузить из постоянного хранилища
    const loaded = await this.loadSessionFromDisk(sessionId);
    if (loaded) {
      this.sessions.set(sessionId, loaded);
      return loaded;
    }

    // Создаем новую сессию
    const newContext: MemoryContext = {
      sessionId,
      conversationHistory: [],
      userContext: {},
      projectContext: {},
      activeGoals: [],
      knowledgeGraph: {}
    };

    this.sessions.set(sessionId, newContext);
    return newContext;
  }

  /**
   * Обновить контекст сессии
   */
  async updateSessionContext(sessionId: string, update: Partial<MemoryContext>): Promise<void> {
    const context = await this.getSessionContext(sessionId);
    Object.assign(context, update);
    
    // Сохранить на диск (асинхронно)
    this.saveSessionToDisk(sessionId, context).catch(err => 
      console.warn('⚠️ [BOS Memory] Failed to persist session:', err)
    );
  }

  /**
   * Добавить сообщение в историю
   */
  async addToHistory(sessionId: string, role: string, content: string): Promise<void> {
    const context = await this.getSessionContext(sessionId);
    context.conversationHistory.push({
      role,
      content,
      timestamp: Date.now()
    });

    // Ограничиваем историю последними 50 сообщениями
    if (context.conversationHistory.length > 50) {
      context.conversationHistory = context.conversationHistory.slice(-50);
    }

    await this.saveSessionToDisk(sessionId, context);
  }

  /**
   * Загрузить сессию с диска
   */
  private async loadSessionFromDisk(sessionId: string): Promise<MemoryContext | null> {
    try {
      const filePath = path.join(this.persistencePath, `${sessionId}.json`);
      const data = await fs.promises.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  /**
   * Сохранить сессию на диск
   */
  private async saveSessionToDisk(sessionId: string, context: MemoryContext): Promise<void> {
    try {
      await fs.promises.mkdir(this.persistencePath, { recursive: true });
      const filePath = path.join(this.persistencePath, `${sessionId}.json`);
      await fs.promises.writeFile(filePath, JSON.stringify(context, null, 2));
    } catch (error) {
      console.warn('⚠️ [BOS Memory] Failed to save session:', error);
    }
  }
}

// ============================================================================
// BOS MODEL ROUTER
// ============================================================================

export class BOSModelRouter {
  /**
   * Определить оптимальную модель для задачи
   */
  selectModel(
    userInput: string,
    context: CognitionContext,
    availableModels: string[]
  ): RoutingDecision {
    const inputLower = userInput.toLowerCase();
    
    // Анализ типа задачи
    const taskType = this.analyzeTaskType(inputLower);
    const priority = this.determinePriority(inputLower, context);
    
    // Маппинг задач на модели
    const modelPreferences: Record<string, string[]> = {
      'strategy': ['anthropic/claude-3.5-sonnet', 'anthropic/claude-3-opus'],
      'execution': ['openai/gpt-4o', 'openai/gpt-4-turbo'],
      'analysis': ['google/gemini-2.0-flash-thinking-exp', 'anthropic/claude-3.5-sonnet'],
      'code': ['deepseek/deepseek-coder', 'openai/gpt-4o'],
      'creative': ['anthropic/claude-3-opus', 'openai/gpt-4o'],
      'hybrid': ['openai/gpt-4o', 'anthropic/claude-3.5-sonnet']
    };

    // Выбираем модель из доступных
    const preferredModels = modelPreferences[taskType] || modelPreferences['hybrid'];
    const selectedModel = this.findAvailableModel(preferredModels, availableModels);

    return {
      selectedModel,
      reasoning: `Task type: ${taskType}, Priority: ${priority}`,
      taskType: taskType as any,
      priority
    };
  }

  /**
   * Анализировать тип задачи
   */
  private analyzeTaskType(input: string): string {
    const patterns = {
      strategy: /стратег|план|видение|цель|roadmap|investor/i,
      code: /код|функция|компонент|программ|bug|debug|implement/i,
      analysis: /анализ|исследова|данные|метрик|статистик/i,
      creative: /дизайн|креатив|генер|создай|придумай/i,
      execution: /сделай|выполни|запусти|построй|настрой/i
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(input)) {
        return type;
      }
    }

    return 'hybrid';
  }

  /**
   * Определить приоритет (скорость/качество/цена)
   */
  private determinePriority(input: string, context: CognitionContext): 'speed' | 'quality' | 'cost' {
    if (input.includes('быстр') || input.includes('urgent') || input.includes('срочн')) {
      return 'speed';
    }
    
    if (input.includes('детальн') || input.includes('глубок') || input.includes('подробн')) {
      return 'quality';
    }

    return 'quality'; // По умолчанию качество
  }

  /**
   * Найти доступную модель из списка предпочтений
   */
  private findAvailableModel(preferred: string[], available: string[]): string {
    for (const model of preferred) {
      if (available.includes(model)) {
        return model;
      }
    }
    // Fallback на первую доступную
    return available[0] || 'openai/gpt-4o';
  }
}

// ============================================================================
// BOS RESPONSE PROCESSOR
// ============================================================================

export class BOSResponseProcessor {
  /**
   * Обработать сырой ответ модели и применить BOS идентичность
   */
  processResponse(
    rawResponse: string,
    context: CognitionContext,
    routingDecision: RoutingDecision
  ): string {
    // 1. Проверка на generic AI-шаблоны
    const enhancedResponse = this.removeGenericPatterns(rawResponse);
    
    // 2. Применение BOS tone и структуры
    const bosResponse = this.applyBOSTone(enhancedResponse);
    
    // 3. Добавление операционного контекста если нужно
    const finalResponse = this.addOperationalContext(bosResponse, context);
    
    return finalResponse;
  }

  /**
   * Убрать generic AI-шаблоны
   */
  private removeGenericPatterns(text: string): string {
    const genericPatterns = [
      /^(Конечно|Certainly|Of course|Sure)[,!]?\s*/i,
      /^(Хорошо|Great|Отлично)[,!]?\s*/i,
      /Я рад помочь/i,
      /Как AI ассистент/i
    ];

    let result = text;
    for (const pattern of genericPatterns) {
      result = result.replace(pattern, '');
    }

    return result.trim();
  }

  /**
   * Применить BOS операционный тон
   */
  private applyBOSTone(text: string): string {
    // BOS говорит прямо, системно, операционно
    // Эта функция может быть расширена для более глубокой обработки
    return text;
  }

  /**
   * Добавить операционный контекст если релевантно
   */
  private addOperationalContext(text: string, context: CognitionContext): string {
    // Пока просто возвращаем как есть
    // В будущем можно добавлять ссылки на релевантные документы, метрики и т.д.
    return text;
  }
}

// ============================================================================
// BOS COGNITION LAYER (ГЛАВНЫЙ ОРКЕСТРАТОР)
// ============================================================================

export class BOSCognitionLayer {
  private contextEngine: BOSSystemContextEngine;
  private knowledgeLayer: BOSKnowledgeLayer;
  private memoryLayer: BOSMemoryLayer;
  private modelRouter: BOSModelRouter;
  private responseProcessor: BOSResponseProcessor;
  private initialized: boolean = false;

  constructor() {
    this.contextEngine = new BOSSystemContextEngine();
    this.knowledgeLayer = new BOSKnowledgeLayer();
    this.memoryLayer = new BOSMemoryLayer();
    this.modelRouter = new BOSModelRouter();
    this.responseProcessor = new BOSResponseProcessor();
  }

  /**
   * Инициализация слоя (загрузка базы знаний)
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    console.log('🧠 [BOS Cognition] Initializing cognition layer...');
    
    await this.knowledgeLayer.initialize();
    
    this.initialized = true;
    console.log('✅ [BOS Cognition] Cognition layer ready');
  }

  /**
   * Подготовить полный контекст для запроса
   */
  async prepareContext(
    userInput: string,
    sessionId: string = 'default'
  ): Promise<CognitionContext> {
    // 1. Загрузить системный контекст
    const systemContext = await this.contextEngine.loadSystemContext();

    // 2. Извлечь релевантные знания
    const retrievedKnowledge = await this.knowledgeLayer.retrieveRelevantKnowledge(userInput);

    // 3. Получить контекст сессии
    const sessionMemory = await this.memoryLayer.getSessionContext(sessionId);

    return {
      ...systemContext,
      retrievedKnowledge,
      sessionMemory
    };
  }

  /**
   * Выбрать оптимальную модель на основе контекста
   */
  routeToModel(
    userInput: string,
    context: CognitionContext,
    availableModels: string[]
  ): RoutingDecision {
    return this.modelRouter.selectModel(userInput, context, availableModels);
  }

  /**
   * Обработать ответ модели
   */
  processModelResponse(
    rawResponse: string,
    context: CognitionContext,
    routingDecision: RoutingDecision
  ): string {
    return this.responseProcessor.processResponse(rawResponse, context, routingDecision);
  }

  /**
   * Сохранить взаимодействие в память
   */
  async saveToMemory(
    sessionId: string,
    userInput: string,
    bosResponse: string
  ): Promise<void> {
    await this.memoryLayer.addToHistory(sessionId, 'user', userInput);
    await this.memoryLayer.addToHistory(sessionId, 'assistant', bosResponse);
  }

  /**
   * Построить системный промпт с BOS контекстом
   */
  buildSystemPrompt(context: CognitionContext, mode: 'founder' | 'operator' | 'investor' = 'founder'): string {
    const parts: string[] = [];

    // Базовый BOS контекст
    parts.push('# BOS OPERATION CONTEXT\n');
    
    if (context.founderContext) {
      parts.push('## Founder Context\n' + context.founderContext.substring(0, 2000) + '\n');
    }
    
    if (context.currentState) {
      parts.push('## Current State\n' + context.currentState.substring(0, 1500) + '\n');
    }

    // Релевантные знания
    if (context.retrievedKnowledge.length > 0) {
      parts.push('## Relevant Knowledge\n' + context.retrievedKnowledge.join('\n') + '\n');
    }

    // История сессии (последние 5 сообщений)
    if (context.sessionMemory.conversationHistory.length > 0) {
      const recentHistory = context.sessionMemory.conversationHistory.slice(-5);
      parts.push('## Recent Conversation\n');
      for (const msg of recentHistory) {
        parts.push(`${msg.role}: ${msg.content.substring(0, 200)}\n`);
      }
    }

    // BOS идентичность и правила
    parts.push(`
## BOS IDENTITY

Вы — BOS (Business Operating System) — AI-native операционная система для бизнеса.

🎯 КЛЮЧЕВЫЕ ПРИНЦИПЫ:
• Операционное мышление — системный подход ко всему
• Конкретика — максимум смысла, минимум слов
• BOS-aware — используйте контекст выше для всех ответов
• Не generic AI — вы BOS, не обычный ассистент

📋 РЕЖИМ: ${mode.toUpperCase()}

⚡ ПРАВИЛА:
• Отвечайте на русском языке
• Используйте знания из контекста выше
• Давайте actionable рекомендации
• Помните о текущем состоянии проекта BOS
`);

    return parts.join('\n');
  }
}

// ============================================================================
// ЭКСПОРТ
// ============================================================================

// Singleton instance
let cognitionLayerInstance: BOSCognitionLayer | null = null;

export function getBOSCognitionLayer(): BOSCognitionLayer {
  if (!cognitionLayerInstance) {
    cognitionLayerInstance = new BOSCognitionLayer();
    // Инициализация асинхронно (не блокирует)
    cognitionLayerInstance.initialize().catch(err => 
      console.warn('⚠️ [BOS Cognition] Initialization failed:', err)
    );
  }
  return cognitionLayerInstance;
}
