# Edge Runtime Migration — Инструкции

## ✅ Что было сделано

### Проблема
При сборке на Vercel возникала ошибка:
```
Module not found: Can't resolve 'fs' и 'path' в lib/bos-cognition-layer.ts
```

Это происходило потому, что API работает на **Edge Runtime**, где модули Node.js (`fs`, `path`) недоступны.

### Решение

Систему BOS Cognition Layer переписали для работы на Edge Runtime:

#### 1. **Создан файл со статическими константами** [`lib/bos-core-static.ts`](lib/bos-core-static.ts:1)
- Все контексты из `BOS_CORE/` теперь импортируются как статические константы
- Нет зависимости от файловой системы
- Контексты загружаются в момент импорта модуля

#### 2. **Переписан `BOSSystemContextEngine`**
- Убран `fs.readFileSync` и `fs.promises.readFile`
- Контексты читаются из статических констант `BOS_CORE_STATIC`
- Полностью совместимо с Edge Runtime

#### 3. **Переписан `BOSKnowledgeLayer`**
- Убрана работа с файловой системой (walkDirectory, indexDirectory)
- База знаний инициализируется из статических данных
- Keyword-based поиск работает в памяти

#### 4. **Переписан `BOSMemoryLayer`**
- Убрана запись на диск (`fs.promises.writeFile`, `fs.promises.mkdir`)
- Память хранится **только in-memory** на время работы Edge Function
- Добавлены методы для cleanup старых сессий
- Добавлен метод `getMemoryStats()` для мониторинга

#### 5. **Добавлены управление памятью**
- Метод `cleanup()` в `BOSCognitionLayer` для очистки неиспользуемых данных
- Автоматическая очистка старых сессий (старше 24 часов)
- Оптимизация для работы на serverless Edge Functions

---

## 🚀 Текущая конфигурация

### Edge Runtime (текущая)

**Файл:** [`app/api/chat/route.ts`](app/api/chat/route.ts:5)

```typescript
export const runtime = 'edge'
export const preferredRegion = 'auto'
export const dynamic = 'force-dynamic'
export const maxDuration = 30
```

**Преимущества:**
- ⚡ Быстрый холодный старт (<100ms)
- 🌍 Автоматическое глобальное распределение
- 💰 Более низкая стоимость на Vercel
- 🔄 Масштабируется инстанционально

**Ограничения:**
- ❌ Нет доступа к Node.js модулям (fs, path, child_process)
- ⚠️ Память сессий сохраняется только на время выполнения функции
- ⚠️ Нет персистентного хранилища на диске

---

## 🔄 Как переключиться на Node.js Runtime

Если вам нужен доступ к `fs`, `path` или персистентное хранилище на диске:

### Шаг 1: Изменить runtime в API route

**Файл:** `app/api/chat/route.ts`

```typescript
// БЫЛО (Edge Runtime):
export const runtime = 'edge'

// СТАЛО (Node.js Runtime):
export const runtime = 'nodejs'
// ИЛИ просто удалите эту строку (Node.js используется по умолчанию)
```

### Шаг 2: Обновить конфигурацию

Также можете настроить:

```typescript
// app/api/chat/route.ts
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Node.js поддерживает больше времени
```

### Шаг 3: (Опционально) Вернуть оригинальный cognition layer

Если хотите использовать чтение из файлов:

1. Создайте резервную копию текущего `lib/bos-cognition-layer.ts`
2. Восстановите версию с `fs` и `path` из git истории:
   ```bash
   git log --oneline lib/bos-cognition-layer.ts
   git show <commit-hash>:lib/bos-cognition-layer.ts > lib/bos-cognition-layer.ts
   ```

### Шаг 4: Развернуть изменения

```bash
git add .
git commit -m "Switch to Node.js runtime"
git push
```

---

## 📊 Сравнение Edge vs Node.js Runtime

| Критерий | Edge Runtime | Node.js Runtime |
|----------|--------------|-----------------|
| **Холодный старт** | ~50-100ms | ~200-500ms |
| **Доступ к fs/path** | ❌ Нет | ✅ Да |
| **Глобальное распределение** | ✅ Автоматически | ⚠️ Только в выбранных регионах |
| **Максимальное время выполнения** | 30 сек | 60 сек (Hobby), 300 сек (Pro) |
| **Память** | In-memory только | In-memory + файловая система |
| **Стоимость (Vercel)** | Дешевле | Дороже |
| **npm пакеты** | ⚠️ Ограниченные | ✅ Все |

---

## 🎯 Рекомендации

### Используйте Edge Runtime если:
- ✅ Нужна минимальная latency (скорость критична)
- ✅ Глобальная аудитория
- ✅ Простая логика без Node.js зависимостей
- ✅ Не нужно персистентное хранилище на диске
- ✅ Оптимизация стоимости

### Используйте Node.js Runtime если:
- ✅ Нужен доступ к файловой системе
- ✅ Используете Node.js специфичные библиотеки
- ✅ Нужна персистентная память на диске
- ✅ Длительные операции (>30 сек)
- ✅ Интеграция с legacy системами

---

## 💾 Персистентное хранилище для Edge Runtime

Если нужна персистентная память на Edge Runtime, используйте внешние сервисы:

### Варианты для Memory Layer:

1. **Vercel KV (Redis)**
   ```typescript
   import { kv } from '@vercel/kv'
   
   // Сохранение сессии
   await kv.set(`session:${sessionId}`, context)
   
   // Загрузка сессии
   const context = await kv.get(`session:${sessionId}`)
   ```

2. **Upstash Redis**
   ```typescript
   import { Redis } from '@upstash/redis'
   
   const redis = new Redis({
     url: process.env.UPSTASH_REDIS_URL,
     token: process.env.UPSTASH_REDIS_TOKEN
   })
   ```

3. **Supabase (PostgreSQL)**
   ```typescript
   import { createClient } from '@supabase/supabase-js'
   
   const supabase = createClient(
     process.env.SUPABASE_URL,
     process.env.SUPABASE_KEY
   )
   ```

---

## 🧪 Тестирование

Проверьте, что все работает:

```bash
# Локально
npm run dev

# Открыть в браузере
http://localhost:3001

# Проверить API
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Привет"}]}'
```

---

## 📝 Дополнительная информация

- **Vercel Edge Runtime Docs:** https://vercel.com/docs/functions/edge-functions
- **Next.js Runtime Docs:** https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
- **Edge Runtime Limitations:** https://edge-runtime.vercel.app/features/available-apis

---

**Создано:** 2026-05-21  
**Версия:** 1.0  
**Статус:** ✅ Edge Runtime Ready
