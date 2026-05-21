# BOS Runtime Optimization Guide

## 🎯 Проблема

Production runtime на Vercel получал **504 FUNCTION_INVOCATION_TIMEOUT** из-за:
- Огромных системных промптов (356 строк)
- Отсутствия ограничений на размер контекста
- Отсутствия ограничений на историю сообщений
- Отсутствия оптимизации для serverless окружения

## ✅ Решение: FAST_RUNTIME_MODE

### Что изменено

#### 1. **Облегченные системные промпты**
   - **Было**: 356 строк с полной архитектурой BOS
   - **Стало**: ~20 строк с ключевой информацией
   - **Результат**: Снижение размера контекста на 90%

#### 2. **Ограничение истории сообщений**
   - В `FAST_RUNTIME_MODE=true`: максимум 10 последних сообщений
   - Предотвращает рост контекста при длинных беседах

#### 3. **Ограничение размера ответа**
   - `MAX_CONTEXT_TOKENS=2000` (вместо 4000)
   - Быстрые модели: `gpt-4o-mini` по умолчанию
   - Меньше генерации = быстрее ответ

#### 4. **Vercel оптимизации**
   - `maxDuration: 30` секунд для `/api/chat`
   - Edge Runtime для минимальной латентности
   - Отключена буферизация для streaming

## 🚀 Настройка для Production

### Шаг 1: Environment Variables в Vercel

Добавьте в настройки проекта на Vercel:

```bash
FAST_RUNTIME_MODE=true
MAX_CONTEXT_TOKENS=2000
OPENROUTER_FAST_MODEL=openai/gpt-4o-mini
```

### Шаг 2: Проверка конфигурации

1. Убедитесь что [`vercel.json`](vercel.json:1) присутствует в проекте
2. Проверьте что [`app/api/chat/route.ts`](app/api/chat/route.ts:8) имеет `maxDuration = 30`

### Шаг 3: Деплой

```bash
git add .
git commit -m "feat: runtime optimization with FAST_RUNTIME_MODE"
git push origin main
```

Vercel автоматически задеплоит изменения.

## 📊 Ожидаемые результаты

### До оптимизации
- ❌ Таймауты на простых вопросах
- ❌ 504 ошибки
- ❌ 10+ секунд до первого токена

### После оптимизации
- ✅ Ответ в течение 2-5 секунд
- ✅ Стабильная работа в production
- ✅ Быстрый первый токен (< 1 секунда)

## 🔧 Локальная разработка

### Полный режим (для разработки)
```bash
# .env.local
FAST_RUNTIME_MODE=false
MAX_CONTEXT_TOKENS=4000
OPENROUTER_MODEL=openai/gpt-4o
```

### Быстрый режим (тестирование production)
```bash
# .env.local
FAST_RUNTIME_MODE=true
MAX_CONTEXT_TOKENS=2000
OPENROUTER_FAST_MODEL=openai/gpt-4o-mini
```

## 🏗️ Архитектурные принципы

### ✅ Что НЕ изменилось
- BOS_CORE архитектура (полностью сохранена)
- Система оркестрации (доступна, но не загружается в runtime)
- OpenRouter интеграция
- Streaming ответов
- Fallback система
- Session continuity

### 🎯 Что оптимизировано
- Системные промпты (минимальный контекст в production)
- Размер контекста (ограничен для скорости)
- История сообщений (только последние N)
- Модели по умолчанию (быстрые в production)

## 🔍 Мониторинг

### Vercel Logs
```bash
vercel logs --follow
```

Ищите строки:
- `⚡ [FAST MODE]` — активен быстрый режим
- `🚀 [BOS AI] Starting` — начало запроса
- `✅ [BOS AI] Success` — успешный ответ

### Ключевые метрики
- **Time to First Token**: < 1 секунда
- **Total Response Time**: 2-5 секунд
- **Timeout Rate**: 0%

## 🐛 Troubleshooting

### Проблема: Все еще таймауты

**Решение 1**: Проверьте переменные окружения
```bash
vercel env ls
```

**Решение 2**: Еще больше ограничьте контекст
```bash
MAX_CONTEXT_TOKENS=1500
```

**Решение 3**: Используйте еще более быструю модель
```bash
OPENROUTER_FAST_MODEL=openai/gpt-3.5-turbo
```

### Проблема: Ответы слишком короткие

**Решение**: Увеличьте лимит токенов
```bash
MAX_CONTEXT_TOKENS=3000
```

### Проблема: Не хватает контекста

**Решение**: Отключите быстрый режим для конкретных запросов
```typescript
// В коде можно передать model явно для обхода быстрого режима
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    messages,
    model: 'openai/gpt-4o', // Явно указываем полную модель
  })
})
```

## 📚 Дополнительная информация

### Файлы изменены
- [`lib/ai-service.ts`](lib/ai-service.ts:125) — добавлен `generateFastSystemPrompt()`
- [`app/api/chat/route.ts`](app/api/chat/route.ts:9) — ограничение истории сообщений
- [`.env.local.example`](.env.local.example:24) — новые переменные окружения
- [`vercel.json`](vercel.json:1) — конфигурация таймаутов

### Переменные окружения

| Переменная | Значение по умолчанию | Описание |
|------------|----------------------|----------|
| `FAST_RUNTIME_MODE` | `false` | Включает облегченный режим runtime |
| `MAX_CONTEXT_TOKENS` | `4000` (или `2000` в FAST) | Максимальный размер ответа |
| `OPENROUTER_FAST_MODEL` | `openai/gpt-4o-mini` | Модель для быстрого режима |

## 🎓 Лучшие практики

1. **Production**: Всегда используйте `FAST_RUNTIME_MODE=true`
2. **Development**: Можно использовать полный режим для тестирования
3. **Staging**: Используйте быстрый режим для проверки performance
4. **Мониторинг**: Следите за Vercel Logs для обнаружения проблем

---

**Дата создания**: 2026-05-20  
**Версия**: 1.0  
**Статус**: ✅ Production Ready
