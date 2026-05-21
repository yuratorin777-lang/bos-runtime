# BOS COGNITION LAYER — QUICK START

**Статус:** ✅ Реализовано  
**Версия:** 1.0.0

---

## Что это?

**BOS Cognition Layer** трансформирует BOS из простой AI обертки в настоящую операционную систему для бизнес-интеллекта.

### ДО:
```
User → Model → Generic Response ❌
```

### ПОСЛЕ:
```
User → BOS Cognition → Model → BOS Response ✅
```

**Результат:** Глубокие, контекстуальные, BOS-aware ответы вместо generic AI фраз.

---

## Быстрый старт

### 1. Использование в коде

```typescript
import { getBOSAIService } from '@/lib/ai-service';

const aiService = getBOSAIService();

// Streaming запрос с BOS Cognition
const response = await aiService.streamCompletion({
  messages: [
    { role: 'user', content: 'Помоги создать стратегию запуска' }
  ],
  sessionId: 'user-123',      // ID сессии для памяти
  useCognitionLayer: true,     // Включить BOS Cognition
  mode: 'founder',             // founder/operator/investor
});

// Non-streaming запрос
const content = await aiService.completion({
  messages: [
    { role: 'user', content: 'Проанализируй unit economics' }
  ],
  sessionId: 'user-123',
  useCognitionLayer: true,
  mode: 'investor',
});
```

### 2. Что происходит под капотом?

Когда `useCognitionLayer: true`:

1. 📚 **Загружается контекст BOS**
   - FOUNDER_CONTEXT.md
   - CURRENT_STATE.md
   - INVESTOR_NARRATIVE.md
   - SYSTEM_CORE.md

2. 🔍 **Извлекаются релевантные знания**
   - Из BOS_CORE/KNOWLEDGE
   - Из BOS_CORE/ARCHITECTURE
   - Из BOS_CORE/ROADMAP

3. 🧠 **Загружается память сессии**
   - Последние 50 сообщений
   - Контекст пользователя
   - Активные цели

4. 🎯 **Выбирается оптимальная модель**
   - Strategy задачи → Claude
   - Code задачи → DeepSeek
   - Analysis → Gemini
   - И т.д.

5. ✨ **Обрабатывается ответ**
   - Убираются generic фразы
   - Применяется BOS тон
   - Сохраняется в память

---

## Режимы работы

### Founder Mode
```typescript
mode: 'founder'
```
Фокус на: стратегии, бизнес-планировании, запуске продуктов

### Operator Mode
```typescript
mode: 'operator'
```
Фокус на: оптимизации, автоматизации, процессах

### Investor Mode
```typescript
mode: 'investor'
```
Фокус на: метриках, ROI, unit economics, рисках

---

## Отключение Cognition Layer

Для простых запросов или debugging:

```typescript
const response = await aiService.streamCompletion({
  messages: [{ role: 'user', content: 'Hello' }],
  useCognitionLayer: false,  // ← Отключить
});
```

---

## Файловая структура

```
bos-runtime/
  ├── lib/
  │   ├── ai-service.ts              ← AI Service с Cognition
  │   └── bos-cognition-layer.ts     ← Core Cognition Logic
  │
  ├── BOS_CORE/
  │   ├── FOUNDER_CONTEXT.md         ← Автоматически загружается
  │   ├── CURRENT_STATE.md           ← Автоматически загружается
  │   ├── INVESTOR_NARRATIVE.md      ← Автоматически загружается
  │   ├── SYSTEM_CORE.md             ← Автоматически загружается
  │   │
  │   ├── KNOWLEDGE/                 ← Индексируется для RAG
  │   ├── ARCHITECTURE/              ← Индексируется для RAG
  │   ├── ROADMAP/                   ← Индексируется для RAG
  │   └── RUNTIME/                   ← Индексируется для RAG
  │
  └── bos-memory-store/              ← Персистентная память (auto-created)
      ├── user-123.json
      └── default.json
```

---

## Логи

При включенном Cognition Layer вы увидите:

```bash
🧠 [BOS Cognition] Activating cognition pipeline...
📚 [BOS Cognition] Context prepared: { knowledgeRetrieved: 3, memoryLoaded: 12 }
🎯 [BOS Cognition] Model routing: { selected: 'claude-3.5-sonnet', taskType: 'strategy' }
✨ [BOS Cognition] Response processed through BOS filter
✅ [BOS AI] Success with claude-3.5-sonnet in 1234ms
```

---

## Производительность

| Сценарий | Дополнительное время |
|----------|---------------------|
| Первый запрос (cold start) | +200-500ms |
| Последующие (cache hit) | +50-100ms |
| Без Cognition | 0ms |

**Рекомендация:** Всегда используйте Cognition для важных запросов, отключайте для простых.

---

## Примеры использования

### Пример 1: Стратегия запуска

```typescript
const response = await aiService.completion({
  messages: [
    { role: 'user', content: 'Создай стратегию запуска SaaS продукта для малого бизнеса' }
  ],
  sessionId: 'founder-session',
  useCognitionLayer: true,
  mode: 'founder'
});

// BOS ответит с учетом:
// - Текущего состояния BOS проекта
// - Best practices из Knowledge base
// - Предыдущих обсуждений стратегии
// - Контекста основателя
```

### Пример 2: Анализ метрик

```typescript
const response = await aiService.completion({
  messages: [
    { role: 'user', content: 'Проанализируй: CAC $50, LTV $500, churn 5%' }
  ],
  sessionId: 'investor-session',
  useCognitionLayer: true,
  mode: 'investor'
});

// BOS ответит в investor tone:
// - Расчет LTV/CAC ratio
// - Оценка payback периода
// - Risk assessment
// - Рекомендации по оптимизации
```

### Пример 3: Код ревью

```typescript
const response = await aiService.completion({
  messages: [
    { role: 'user', content: 'Ревью этот код: [код]' }
  ],
  sessionId: 'dev-session',
  useCognitionLayer: true,
  // mode: 'founder' по умолчанию
});

// BOS автоматически выберет DeepSeek Coder
// для code-related задач
```

---

## Troubleshooting

### Проблема: "BOS_CORE files not found"

**Решение:** Создайте файл если его нет:
```bash
# Минимально нужен хотя бы один файл
echo "# BOS System Core" > BOS_CORE/SYSTEM_CORE.md
```

### Проблема: Медленные ответы

**Решения:**
1. Отключите Cognition для простых запросов: `useCognitionLayer: false`
2. Включите FAST_RUNTIME_MODE: `export FAST_RUNTIME_MODE=true`
3. Уменьшите knowledge retrieval limit в коде

### Проблема: Память не сохраняется

**Решение:** Убедитесь что директория `bos-memory-store/` доступна для записи:
```bash
mkdir -p bos-memory-store
chmod 755 bos-memory-store
```

---

## Документация

- 📖 **Полная архитектура:** [`BOS_CORE/ARCHITECTURE/COGNITION_LAYER.md`](BOS_CORE/ARCHITECTURE/COGNITION_LAYER.md)
- 📋 **Implementation details:** [`COGNITION_LAYER_IMPLEMENTATION.md`](COGNITION_LAYER_IMPLEMENTATION.md)
- 💻 **Исходный код:**
  - [`lib/bos-cognition-layer.ts`](lib/bos-cognition-layer.ts)
  - [`lib/ai-service.ts`](lib/ai-service.ts)

---

## Что дальше?

### Версия 1.1 (скоро)
- [ ] Векторный поиск (embeddings)
- [ ] Улучшенный Knowledge Graph
- [ ] Advanced response processing

### Версия 2.0 (2027)
- [ ] BOS Fine-tuned модели
- [ ] Autonomous agents
- [ ] Deep learning from feedback

---

## Ключевые преимущества

✅ **BOS Identity** — Ответы от лица BOS, не generic AI  
✅ **Operational Intelligence** — Всегда осознает контекст проекта  
✅ **Memory** — Помнит между сессиями  
✅ **Smart Routing** — Автоматический выбор лучшей модели  
✅ **Knowledge Access** — Доступ ко всей BOS документации

---

**ИТОГ:** BOS Cognition Layer превращает LLM из "ответчика на вопросы" в **операционный интеллект системы**.

Вместо поверхностных generic ответов — глубокие, контекстуальные, BOS-aware решения.
