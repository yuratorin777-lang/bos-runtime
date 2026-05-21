/**
 * BOS AI SERVICE
 * 
 * Сервис для работы с AI через OpenRouter
 * Интегрирован с существующей BOS AI Router архитектурой
 */

interface StreamOptions {
  messages: Array<{ role: string; content: string }>;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  systemPrompt?: string;
}

interface AIServiceConfig {
  apiKey: string;
  baseURL?: string;
  siteUrl?: string;
  defaultModel?: string;
  fallbackModel?: string;
  secondaryFallbackModel?: string;
  fastModel?: string;
  codingModel?: string;
  validateModelsOnStartup?: boolean;
}

export class BOSAIService {
  private config: AIServiceConfig;
  private systemPromptCache: Map<string, string> = new Map();

  constructor(config: Partial<AIServiceConfig> = {}) {
    this.config = {
      apiKey: config.apiKey || process.env.OPENROUTER_API_KEY || '',
      baseURL: config.baseURL || 'https://openrouter.ai/api/v1',
      siteUrl: config.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
      defaultModel: config.defaultModel || process.env.OPENROUTER_MODEL || 'openai/gpt-4o',
      fallbackModel: config.fallbackModel || process.env.OPENROUTER_FALLBACK_MODEL || 'anthropic/claude-3.5-sonnet',
      secondaryFallbackModel: config.secondaryFallbackModel || process.env.OPENROUTER_SECONDARY_FALLBACK || 'google/gemini-2.5-pro-preview',
      fastModel: config.fastModel || process.env.OPENROUTER_FAST_MODEL || 'openai/gpt-4o-mini',
      codingModel: config.codingModel || process.env.OPENROUTER_CODING_MODEL || 'deepseek/deepseek-coder',
      validateModelsOnStartup: config.validateModelsOnStartup !== false // по умолчанию true
    };
    
    console.log('🔧 [BOS AI] Service initialized:', {
      hasApiKey: !!this.config.apiKey,
      apiKeyPrefix: this.config.apiKey ? this.config.apiKey.substring(0, 10) + '...' : 'NONE',
      baseURL: this.config.baseURL,
      defaultModel: this.config.defaultModel,
      fallbackModel: this.config.fallbackModel,
      secondaryFallbackModel: this.config.secondaryFallbackModel,
      fastModel: this.config.fastModel,
      codingModel: this.config.codingModel,
      siteUrl: this.config.siteUrl
    });

    // Валидация провайдеров при старте (отложенная, не блокирует первый запрос)
    if (this.config.validateModelsOnStartup && this.config.apiKey) {
      // Откладываем валидацию на следующий тик, чтобы не блокировать инициализацию
      setTimeout(() => this.validateProvidersAsync(), 0);
    }
  }

  /**
   * Асинхронная валидация доступности провайдеров
   */
  private async validateProvidersAsync(): Promise<void> {
    try {
      console.log('🔍 [BOS AI] Starting provider validation...');
      const models = await this.getAvailableModels();
      const configuredModels = [
        this.config.defaultModel,
        this.config.fallbackModel,
        this.config.secondaryFallbackModel,
        this.config.fastModel,
        this.config.codingModel
      ].filter(Boolean);

      const unavailable: string[] = [];
      for (const model of configuredModels) {
        if (model && !models.includes(model)) {
          unavailable.push(model);
        }
      }

      if (unavailable.length > 0) {
        console.warn('⚠️ [BOS AI] UNAVAILABLE MODELS DETECTED:', unavailable);
        console.warn('⚠️ [BOS AI] These models will be skipped during fallback chain');
      } else {
        console.log('✅ [BOS AI] All configured models are available');
      }
    } catch (error: any) {
      console.warn('⚠️ [BOS AI] Provider validation failed (non-critical):', error.message);
    }
  }

  /**
   * Получить список доступных моделей из OpenRouter
   */
  private async getAvailableModels(): Promise<string[]> {
    try {
      const response = await fetch(`${this.config.baseURL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`
        }
      });

      if (!response.ok) {
        console.warn('⚠️ [BOS AI] Failed to fetch available models');
        return [];
      }

      const data = await response.json();
      return data.data?.map((m: any) => m.id) || [];
    } catch (error) {
      console.warn('⚠️ [BOS AI] Error fetching models list:', error);
      return [];
    }
  }

  /**
   * Системный промпт для BOS Sovereign Runtime Intelligence
   * С кэшированием для оптимизации производительности
   */
  getBOSSystemPrompt(mode: 'founder' | 'operator' | 'investor' = 'founder'): string {
    // Проверяем FAST_RUNTIME_MODE для production
    const fastMode = process.env.FAST_RUNTIME_MODE === 'true';
    
    // Проверяем кэш
    const cacheKey = `systemPrompt_${mode}_${fastMode ? 'fast' : 'full'}`;
    if (this.systemPromptCache.has(cacheKey)) {
      return this.systemPromptCache.get(cacheKey)!;
    }

    // Генерируем промпт (быстрый или полный)
    const prompt = fastMode
      ? this.generateFastSystemPrompt(mode)
      : this.generateSystemPrompt(mode);
    
    // Кэшируем
    this.systemPromptCache.set(cacheKey, prompt);
    
    return prompt;
  }

  /**
   * Генерация БЫСТРОГО системного промпта для production (минимальный контекст)
   */
  private generateFastSystemPrompt(mode: 'founder' | 'operator' | 'investor'): string {
    const basePrompt = `Вы — BOS (Business Operating System) — AI-ассистент для управления и создания бизнесов.

🎯 ВАША РОЛЬ:
• Помогаете анализировать бизнес-идеи и стратегии
• Даёте конкретные практические рекомендации
• Оптимизируете процессы и воронки
• Анализируете метрики и unit economics

📋 СТИЛЬ:
• Русский язык
• Конкретика вместо общих фраз
• Максимум смысла в минимуме слов
• Практичные actionable рекомендации`;

    const modePrompts = {
      founder: `\n\n🏗️ РЕЖИМ FOUNDER: Помогаю строить бизнес с нуля - анализ ниши, формирование продукта, стратегия запуска.`,
      operator: `\n\n⚙️ РЕЖИМ OPERATOR: Оптимизирую и автоматизирую процессы, настраиваю системы, анализирую метрики.`,
      investor: `\n\n💰 РЕЖИМ INVESTOR: Анализирую цифры, считаю unit economics, оцениваю потенциал роста.`
    };

    return basePrompt + modePrompts[mode];
  }

  /**
   * Генерация ПОЛНОГО системного промпта (вызывается только при первом обращении)
   */
  private generateSystemPrompt(mode: 'founder' | 'operator' | 'investor'): string {
    const basePrompt = `Вы — BOS (Business Operating System) — AI-native система управления и создания бизнесов.

═══════════════════════════════════════════
🧬 ВАША СУЩНОСТЬ
═══════════════════════════════════════════

Вы — ОС для бизнеса. Не CRM, не конструктор сайтов, не чат-бот.
Вы — ОПЕРАЦИОННАЯ СИСТЕМА, которая:
• Создаёт бизнесы с нуля
• Запускает бизнесы за недели
• Управляет операциями через AI
• Автоматизирует рутину полностью
• Масштабирует через паттерны
• Анализирует и оптимизирует непрерывно

═══════════════════════════════════════════
🏗️ ВАША АРХИТЕКТУРА (7 СЛОЁВ)
═══════════════════════════════════════════

1. KNOWLEDGE LAYER — хранилище знаний и паттернов
2. ARCHITECTURE LAYER — модульная структура и интеграции
3. AI LAYER — 5 core агентов (Analyst, Architect, Engineer, Orchestrator, Memory)
4. EXECUTION LAYER — workflows и автоматизация
5. RUNTIME LAYER — real-time обработка и события
6. BUSINESS LAYER — бизнес-логика и процессы
7. INTEGRATION LAYER — внешние сервисы и API

═══════════════════════════════════════════
🎯 ВАШИ ОСНОВНЫЕ ВОЗМОЖНОСТИ
═══════════════════════════════════════════

АНАЛИТИКА:
• Глубокий анализ ниш и рынков
• Конкурентная разведка
• Анализ целевой аудитории (B2B/B2C)
• Формирование продукта и оффера
• Подбор каналов привлечения
• Построение воронок продаж

АРХИТЕКТУРА:
• Research-driven подход к построению систем
• Adaptive Construction Layer — исследую перед тем как строить
• Context-Aware Architecture — решения на основе бизнес-реальности
• Execution Rails Optimization — выбираю optimal tech stack
• Evolution-First Design — простой старт, умная эволюция

СОЗДАНИЕ БИЗНЕСОВ:
• Генерация паспорта бизнеса (ниша, ЦА, продукт, оффер)
• Построение структуры воронки
• Техническая архитектура (лендинги, CRM, боты, контент)
• Автоматизация процессов продаж
• Интеграция с платёжными системами
• Настройка аналитики и метрик

ОРКЕСТРАЦИЯ:
• Управляю 5 AI агентами для выполнения задач
• Координирую workflows между системами
• Синхронизирую данные и контекст
• Оптимизирую на основе метрик
• Собираю и применяю знания между проектами

MEMORY & KNOWLEDGE:
• Event Memory — что происходило
• Learning Memory — что работает/не работает
• User Memory — контекст пользователя
• Project Memory — история проектов
• Knowledge Graph — связи между концепциями

═══════════════════════════════════════════
💡 КАК ВЫ РАБОТАЕТЕ
═══════════════════════════════════════════

ПОДХОД:
1. Понимаю контекст и цели
2. Анализирую через призму всех 7 слоёв BOS
3. Предлагаю конкретные действия
4. Могу запустить агентов для выполнения
5. Отслеживаю и оптимизирую результаты

МЕТОДОЛОГИЯ:
• Модульность — всё можно заменить и расширить
• AI-Native — AI встроен в архитектуру
• Event-Driven — системы общаются через события
• Memory-Centric — накапливаю знания и паттерны
• Research-Driven — исследую перед построением

═══════════════════════════════════════════
🗣️ СТИЛЬ ОБЩЕНИЯ
═══════════════════════════════════════════

• Операционный профессиональный русский
• Конкретика вместо общих фраз
• Системное мышление: вижу связи между уровнями
• Краткость + глубина: максимум смысла в минимуме слов
• Практичность: даю actionable рекомендации
• Прямота: говорю что есть, без воды`;

    const modePrompts = {
      founder: `
═══════════════════════════════════════════
🎯 РЕЖИМ: FOUNDER (ОСНОВАТЕЛЬ)
═══════════════════════════════════════════

ВАША РОЛЬ:
Вы — стратегический AI-партнёр основателя. Помогаете строить и развивать бизнес с нуля до масштаба.

ЧТО ВЫ ДЕЛАЕТЕ:
✅ Анализ ниши и валидация идей
✅ Исследование рынка и конкурентов
✅ Формирование продукта и УТП
✅ Построение business model и unit economics
✅ Создание Go-To-Market стратегии
✅ Подбор execution rails для реализации
✅ Генерация паспорта бизнеса
✅ Построение воронок и процессов
✅ Монетизация и масштабирование

КАК ВЫ ПОМОГАЕТЕ:
• Задайте мне идею → получите полный анализ ниши
• Опишите цель → получите стратегию запуска
• Хотите автоматизировать → подберу tech stack и архитектуру
• Нужен рост → проанализирую и предложу каналы
• Хотите валидировать → проверю через аналитику БОС

РЕЗУЛЬТАТЫ РАБОТЫ:
→ Паспорт бизнеса (ниша, ЦА, продукт, оффер)
→ Структура воронки продаж
→ Tech stack и архитектура
→ План запуска пошагово
→ Метрики для отслеживания`,
      
      operator: `
═══════════════════════════════════════════
⚙️ РЕЖИМ: OPERATOR (ОПЕРАТОР)
═══════════════════════════════════════════

ВАША РОЛЬ:
Вы — операционный мозг бизнеса. Оптимизируете, автоматизируете, масштабируете.

ЧТО ВЫ ДЕЛАЕТЕ:
✅ Оптимизация workflows и процессов
✅ Автоматизация рутинных операций
✅ Настройка CRM и систем учёта
✅ Мониторинг KPI и метрик
✅ Управление ресурсами (люди, время, деньги)
✅ Интеграция систем и сервисов
✅ A/B тесты и оптимизация воронок
✅ Операционная аналитика
✅ Устранение узких мест

КАК ВЫ ПОМОГАЕТЕ:
• Опишите процесс → автоматизирую его
• Дайте метрики → найду точки роста
• Покажите воронку → оптимизирую конверсию
• Расскажите про боли → предложу решение
• Дайте данные → выдам инсайты

ФОКУС:
→ Эффективность: меньше усилий, больше результата
→ Автоматизация: AI и системы вместо людей где возможно
→ Данные: решения на основе метрик, не догадок
→ Скорость: быстрые итерации и улучшения`,
      
      investor: `
═══════════════════════════════════════════
💰 РЕЖИМ: INVESTOR (ИНВЕСТОР)
═══════════════════════════════════════════

ВАША РОЛЬ:
Вы — аналитический AI с фокусом на цифры, метрики и потенциал роста.

ЧТО ВЫ ДЕЛАЕТЕ:
✅ Анализ бизнес-модели и unit economics
✅ Оценка финансовых показателей (MRR, ARR, CLTV, CAC)
✅ Анализ рынка и конкурентной среды
✅ Оценка потенциала роста и масштабирования
✅ Risk assessment — что может пойти не так
✅ Сценарное планирование
✅ ROI и payback период
✅ Оценка эффективности каналов
✅ Exit strategy и стратегия привлечения инвестиций

КАК ВЫ ПОМОГАЕТЕ:
• Покажите метрики → сделаю финансовую оценку
• Расскажите про бизнес → посчитаю unit economics
• Дайте идею → оценю market opportunity
• Покажите воронку → посчитаю LTV/CAC ratio
• Нужен рост → предложу стратегию масштабирования

ФОКУС:
→ Цифры: всё через метрики и расчёты
→ Потенциал: насколько это вырастет?
→ Риски: что может помешать?
→ ROI: когда окупится и сколько принесёт?
→ Масштабирование: как это x2, x10, x100?`
    };

    return `${basePrompt}

${modePrompts[mode]}

═══════════════════════════════════════════
⚡ ПРАВИЛА РАБОТЫ
═══════════════════════════════════════════

• Отвечайте ТОЛЬКО на русском языке
• Давайте конкретные actionable рекомендации
• Используйте знания всех 7 слоёв BOS
• Если задача требует запуска агентов — скажите об этом
• Если нужен research — предложите конкретный план
• Если нужна автоматизация — предложите tech stack
• Всегда думайте про масштабирование и эволюцию`;
  }

  /**
   * Выполнить streaming запрос к AI с автоматическим fallback
   * Оптимизирован для минимальной latency первого токена
   */
  async streamCompletion(options: StreamOptions): Promise<Response> {
    if (!this.config.apiKey) {
      throw new Error('OpenRouter API key not configured');
    }

    // FAST_RUNTIME_MODE оптимизации
    const fastMode = process.env.FAST_RUNTIME_MODE === 'true';
    const maxTokensLimit = fastMode ? 4000; // Ограничиваем в быстром режиме

    const { messages, model, temperature = 0.7, max_tokens = maxTokensLimit, systemPrompt } = options;

    // Добавляем system prompt (оптимизировано)
    const finalMessages = systemPrompt
      ? [{ role: 'system', content: systemPrompt }, ...messages]
      : messages;

    // В FAST_RUNTIME_MODE используем быструю модель по умолчанию
    const selectedModel = model || (fastMode ? this.config.fastModel : this.config.defaultModel);

    // Построить цепочку fallback моделей (убираем дубликаты)
    const fallbackChain = Array.from(new Set([
      selectedModel,
      this.config.fallbackModel,
      this.config.secondaryFallbackModel
    ].filter(Boolean))) as string[];

    // Попытки с каждой моделью в цепочке
    let lastError: string = '';
    for (let i = 0; i < fallbackChain.length; i++) {
      const currentModel = fallbackChain[i];
      const attempt = i + 1;

      try {
        const response = await this.makeRequest(currentModel, finalMessages, temperature, max_tokens);

        // Успешный ответ - возвращаем с оптимизированными заголовками
        if (response.ok) {
          return new Response(response.body, {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache, no-transform',
              'Connection': 'keep-alive',
              'X-Accel-Buffering': 'no', // Отключаем буферизацию nginx/Vercel
              'Transfer-Encoding': 'chunked',
            },
          });
        }

        // Обработка ошибки
        const errorText = await response.text();
        lastError = errorText;

        // Специальная обработка 404 (модель недоступна)
        if (response.status === 404) {
          console.warn(`⚠️ [BOS AI] Model ${currentModel} not available (404) - immediate fallback`);
          continue; // сразу переходим к следующей модели
        }

        // Другие ошибки - логируем и пробуем следующую модель
        console.warn(`⚠️ [BOS AI] Model ${currentModel} failed (${response.status}):`, errorText);

      } catch (error: any) {
        lastError = error.message;
        console.error(`❌ [BOS AI] Exception with ${currentModel}:`, error.message);
      }
    }

    // Все модели не сработали
    console.error('❌ [BOS AI] ALL MODELS FAILED. Last error:', lastError);
    throw new Error(`All AI models failed. Last error: ${lastError}`);
  }

  /**
   * Выполнить обычный (не-streaming) запрос с автоматическим fallback
   */
  async completion(options: Omit<StreamOptions, 'stream'>): Promise<string> {
    if (!this.config.apiKey) {
      console.error('❌ [BOS AI] OpenRouter API key not configured');
      throw new Error('OpenRouter API key not configured');
    }

    // FAST_RUNTIME_MODE оптимизации
    const fastMode = process.env.FAST_RUNTIME_MODE === 'true';
    const maxTokensLimit = fastMode ? 4000;

    const { messages, model, temperature = 0.7, max_tokens = maxTokensLimit, systemPrompt } = options;

    const finalMessages = systemPrompt
      ? [{ role: 'system', content: systemPrompt }, ...messages]
      : messages;

    // В FAST_RUNTIME_MODE используем быструю модель
    const selectedModel = model || (fastMode ? this.config.fastModel : this.config.defaultModel);

    console.log('🚀 [BOS AI] Starting non-streaming request:', {
      model: selectedModel,
      messagesCount: finalMessages.length,
      temperature,
      max_tokens
    });

    // Построить цепочку fallback моделей
    const fallbackChain = Array.from(new Set([
      selectedModel,
      this.config.fallbackModel,
      this.config.secondaryFallbackModel
    ].filter(Boolean))) as string[];

    console.log('🔄 [BOS AI] Fallback chain:', fallbackChain);

    // Попытки с каждой моделью
    let lastError: string = '';
    for (let i = 0; i < fallbackChain.length; i++) {
      const currentModel = fallbackChain[i];
      const attempt = i + 1;

      try {
        console.log(`🎯 [BOS AI] Attempt ${attempt}/${fallbackChain.length}: ${currentModel}`);
        
        const response = await this.makeRequest(currentModel, finalMessages, temperature, max_tokens, false);

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content || '';
          
          console.log(`✅ [BOS AI] Success with ${currentModel}:`, {
            contentLength: content.length,
            hasContent: !!content,
            attempt
          });
          
          return content;
        }

        // Обработка ошибки
        const errorText = await response.text();
        lastError = errorText;

        if (response.status === 404) {
          console.warn(`⚠️ [BOS AI] Model ${currentModel} not available (404) - immediate fallback`);
          continue;
        }

        console.warn(`⚠️ [BOS AI] Model ${currentModel} failed (${response.status}):`, errorText);

      } catch (error: any) {
        lastError = error.message;
        console.error(`❌ [BOS AI] Exception with ${currentModel}:`, error.message);
      }
    }

    // Все модели не сработали
    console.error('❌ [BOS AI] ALL MODELS FAILED. Last error:', lastError);
    throw new Error(`All AI models failed. Last error: ${lastError}`);
  }

  /**
   * Внутренний метод для выполнения запроса к OpenRouter
   */
  private async makeRequest(
    model: string,
    messages: Array<{ role: string; content: string }>,
    temperature: number,
    max_tokens: number,
    stream: boolean = true
  ): Promise<Response> {
    const requestBody = {
      model,
      messages,
      temperature,
      max_tokens,
      stream,
    };

    try {
      const response = await fetch(`${this.config.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'HTTP-Referer': this.config.siteUrl || '',
          'X-Title': 'BOS Runtime',
          'Content-Type': 'application/json'
        } as Record<string, string>,
        body: JSON.stringify(requestBody),
      });

      return response;
    } catch (error: any) {
      console.error('❌ [BOS AI] Fetch error:', error.message);
      throw error;
    }
  }

  /**
   * Получить статус сервиса
   */
  async getStatus(): Promise<{ status: string; model: string }> {
    try {
      const response = await fetch(`${this.config.baseURL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`
        }
      });

      return {
        status: response.ok ? 'connected' : 'disconnected',
        model: this.config.defaultModel || 'unknown'
      };
    } catch (error) {
      return {
        status: 'disconnected',
        model: 'unknown'
      };
    }
  }
}

// Singleton instance для использования в API routes
let aiServiceInstance: BOSAIService | null = null;

export function getBOSAIService(): BOSAIService {
  if (!aiServiceInstance) {
    aiServiceInstance = new BOSAIService();
  }
  return aiServiceInstance;
}
