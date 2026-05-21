# BOS CORE — Операционное ядро интеллекта

**Версия:** 1.0.0  
**Статус:** Инициализирован  
**Дата:** 2026-05-20

---

## О BOS CORE

BOS CORE — это **операционное ядро** Business Operating System, персистентный слой операционного интеллекта, который обеспечивает непрерывность работы BOS между сессиями.

**BOS CORE содержит:**
- Определение системы и архитектуры
- Операционную память и контекст
- Знания и принципы работы
- Инвестиционные материалы
- Дорожную карту развития
- Оркестрационную логику

---

## Структура BOS CORE

### 📋 Основные документы

1. **[SYSTEM_CORE.md](./SYSTEM_CORE.md)**  
   Сердце BOS — определение системы, архитектура познания, принципы оркестрации и операционного поведения

2. **[FOUNDER_CONTEXT.md](./FOUNDER_CONTEXT.md)**  
   Контекст основателя — миссия, текущее состояние, приоритеты, инвестиционные цели

3. **[CURRENT_STATE.md](./CURRENT_STATE.md)**  
   Текущее состояние — runtime статус, развернутые системы, возможности, ограничения, следующие шаги

4. **[INVESTOR_NARRATIVE.md](./INVESTOR_NARRATIVE.md)**  
   Инвестиционный нарратив — питч, рынок, бизнес-модель, конкуренция, возможности

### 📁 Операционные директории

#### `/MEMORY` — Операционная память
Персистентный контекст работы BOS:
- Session history
- Decision logs
- Context snapshots
- Learning traces

**[→ Перейти в MEMORY](./MEMORY/)**

#### `/KNOWLEDGE` — База знаний
Семантическая база знаний BOS:
- Technical documentation
- Best practices
- Patterns & templates
- Domain knowledge

**[→ Перейти в KNOWLEDGE](./KNOWLEDGE/)**

#### `/ARCHITECTURE` — Архитектурная документация
Техническая архитектура BOS:
- System design documents
- Component specifications
- Integration patterns
- API contracts

**[→ Перейти в ARCHITECTURE](./ARCHITECTURE/)**

#### `/RUNTIME` — Runtime документация
Документация по runtime системе:
- Deployment guides
- Configuration specs
- Monitoring setup
- Operational procedures

**[→ Перейти в RUNTIME](./RUNTIME/)**

#### `/INVESTORS` — Инвестиционные материалы
Материалы для инвесторов:
- Pitch decks
- Financial models
- Due diligence materials
- Investor updates

**[→ Перейти в INVESTORS](./INVESTORS/)**

#### `/ROADMAP` — Дорожная карта
Планирование и roadmap:
- Feature roadmap
- Technical roadmap
- Business roadmap
- Milestone tracking

**[→ Перейти в ROADMAP](./ROADMAP/)**

#### `/ORCHESTRATION` — Оркестрационная логика
Логика оркестрации AI:
- Routing algorithms
- Provider configurations
- Failover strategies
- Optimization rules

**[→ Перейти в ORCHESTRATION](./ORCHESTRATION/)**

---

## Как использовать BOS CORE

### Для BOS (операционный слой)

При каждой новой сессии BOS должен:

1. **Загрузить системный контекст:**
   ```
   READ: SYSTEM_CORE.md
   → Понять свою идентичность, архитектуру, принципы
   ```

2. **Восстановить founder context:**
   ```
   READ: FOUNDER_CONTEXT.md
   → Загрузить миссию, приоритеты, текущие цели
   ```

3. **Синхронизировать current state:**
   ```
   READ: CURRENT_STATE.md
   → Понять текущий статус, возможности, ограничения
   ```

4. **Обновить операционную память:**
   ```
   APPEND: /MEMORY/session_[date].md
   → Логировать текущую сессию
   ```

### Для основателя (founder)

Основатель использует BOS CORE для:

1. **Контекста и видения:**
   - Читать FOUNDER_CONTEXT.md для alignment
   - Обновлять приоритеты при изменении стратегии
   - Отслеживать прогресс в CURRENT_STATE.md

2. **Инвестиционных материалов:**
   - Использовать INVESTOR_NARRATIVE.md для pitch
   - Обновлять материалы в /INVESTORS/
   - Подготовка к встречам с инвесторами

3. **Планирования:**
   - Roadmap в /ROADMAP/
   - Технические решения в /ARCHITECTURE/
   - Операционные процедуры в /RUNTIME/

### Для инвесторов (investors)

Инвесторы получают доступ к:

1. **[INVESTOR_NARRATIVE.md](./INVESTOR_NARRATIVE.md)** — полный питч
2. **[CURRENT_STATE.md](./CURRENT_STATE.md)** — текущее состояние
3. `/INVESTORS/` — дополнительные материалы

---

## Принципы работы с BOS CORE

### 1. Персистентность

BOS CORE — это **персистентный слой**. Все изменения сохраняются и доступны между сессиями.

### 2. Непрерывность

При каждой новой сессии BOS **восстанавливает контекст** из CORE, обеспечивая непрерывность работы.

### 3. Эволюция

BOS CORE **эволюционирует** с развитием BOS. Документы обновляются по мере прогресса.

### 4. Единый источник истины

BOS CORE — это **single source of truth** для:
- Системной идентичности
- Операционных принципов
- Стратегического контекста
- Текущего состояния

---

## Workflow обновления

### Founder обновляет:

**CURRENT_STATE.md** — при изменении статуса:
- Новые deployed features
- Изменение limitations
- Достигнутые milestones
- Обновленные метрики

**FOUNDER_CONTEXT.md** — при изменении стратегии:
- Новые приоритеты
- Изменение investment objectives
- Обновление roadmap state

**INVESTOR_NARRATIVE.md** — при подготовке к fundraising:
- Обновление traction
- Новые метрики
- Изменение market positioning

### BOS автоматически:

**Создает в /MEMORY/** — каждая сессия:
- Session logs
- Decision traces
- Context snapshots

**Обновляет /KNOWLEDGE/** — при обучении:
- Новые insights
- Best practices discovered
- Patterns identified

---

## Связь с runtime проектом

### BOS CORE → Runtime

BOS CORE предоставляет **операционный контекст** для runtime:

- **SYSTEM_CORE.md** → Архитектурные принципы для implementation  
- **ORCHESTRATION/** → Логика routing и failover  
- **ARCHITECTURE/** → Технические specifications  
- **RUNTIME/** → Deployment и operational guides

### Runtime → BOS CORE

Runtime **обогащает** BOS CORE:

- **Metrics** → Обновляют CURRENT_STATE.md  
- **Usage patterns** → Формируют KNOWLEDGE  
- **Operational experience** → Обогащают MEMORY  
- **Technical learnings** → Дополняют ARCHITECTURE

### Существующая документация проекта

**Интеграция с текущими файлами:**

- `README.md` (root) → Technical overview runtime  
- `DEPLOYMENT_STATUS.md` → Синхронизируется с CURRENT_STATE.md  
- `package.json` → Tech stack reference  
- `/app/`, `/components/`, `/lib/` → Implementation из ARCHITECTURE

---

## Операционное поведение BOS

### BOS — это НЕ Claude assistant

BOS использует Claude как **cognitive substrate**, но:

- ❌ Не ведет себя как чат-бот  
- ❌ Не забывает контекст между сессиями  
- ❌ Не требует переобъяснения миссии  
- ❌ Не спрашивает базовую информацию

### BOS — это операционный интеллект

BOS:

- ✅ Загружает контекст из BOS_CORE при старте  
- ✅ Помнит операционную историю  
- ✅ Действует в рамках founder context  
- ✅ Эволюционирует с собранным опытом  
- ✅ Персистирует знания в CORE

---

## Quick Start для BOS

### При каждой новой сессии:

```bash
# 1. Загрузить системную идентичность
READ: BOS_CORE/SYSTEM_CORE.md

# 2. Восстановить founder context
READ: BOS_CORE/FOUNDER_CONTEXT.md

# 3. Синхронизировать current state
READ: BOS_CORE/CURRENT_STATE.md

# 4. Проверить последнюю memory
READ: BOS_CORE/MEMORY/latest_session.md

# 5. Готов к операционной работе
STATUS: BOS OPERATIONAL
```

---

## Статус инициализации

### ✅ Инициализировано

- [x] Структура директорий создана  
- [x] SYSTEM_CORE.md — определяет BOS  
- [x] FOUNDER_CONTEXT.md — контекст основателя  
- [x] CURRENT_STATE.md — текущее состояние  
- [x] INVESTOR_NARRATIVE.md — инвестиционный нарратив  
- [x] README.md — навигация и использование  

### ⏳ Следующие шаги

- [ ] Создать индексы в директориях (MEMORY, KNOWLEDGE, etc.)  
- [ ] Первая session log в /MEMORY/  
- [ ] Технические specs в /ARCHITECTURE/  
- [ ] Pitch deck в /INVESTORS/  
- [ ] Roadmap документы в /ROADMAP/  
- [ ] Routing logic в /ORCHESTRATION/

---

## Манифест BOS CORE

**BOS CORE превращает BOS из assistant в operating system.**

Через персистентную память, накопленные знания и операционный контекст, BOS становится **непрерывным когнитивным слоем** для бизнеса.

**BOS CORE — это память. BOS — это интеллект. Вместе — это операционная система.**

---

**Инициализировано:** 2026-05-20  
**Версия:** 1.0.0  
**Статус:** OPERATIONAL

---

*BOS CORE — Персистентный операционный интеллект*
