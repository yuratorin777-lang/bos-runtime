# BOS MEMORY — Операционная память

**Назначение:** Персистентное хранилище операционного контекста и истории работы BOS

---

## О директории MEMORY

MEMORY содержит записи сессий, контекстные снапшоты, логи решений и накопленный опыт работы BOS. Это **рабочая память** операционной системы.

---

## Структура MEMORY

### Session Logs
Лог каждой операционной сессии BOS:
- Timestamp и длительность
- Выполненные задачи
- Принятые решения
- Результаты работы

**Формат:** `session_YYYY-MM-DD_HH-MM.md`

### Context Snapshots
Снапшоты контекста в ключевые моменты:
- State проекта
- Active priorities
- Pending decisions
- Important context

**Формат:** `context_YYYY-MM-DD.md`

### Decision Logs
Журнал важных решений:
- Technical decisions
- Strategic choices
- Trade-offs сделанные
- Rationale за решениями

**Формат:** `decisions_YYYY-MM.md`

### Learning Traces
Что BOS учится в процессе работы:
- Patterns identified
- Best practices discovered
- Mistakes and corrections
- Optimization insights

**Формат:** `learnings_YYYY-MM.md`

---

## Типы памяти

### Working Memory (Краткосрочная)
- Текущая сессия
- Active tasks
- Immediate context
- **Retention:** До завершения сессии

### Episodic Memory (Эпизодическая)
- Session logs
- Event history
- Task completion records
- **Retention:** 90 дней

### Semantic Memory (Семантическая)
- Extracted insights
- Coded knowledge
- Generalized patterns
- **Retention:** Постоянно (в /KNOWLEDGE/)

---

## Workflow памяти

### Запись (Write)

**В начале сессии:**
```markdown
# Session: 2026-05-20 14:30
## Status: STARTED
## Context loaded from: CURRENT_STATE.md, FOUNDER_CONTEXT.md
## Objectives: [задачи сессии]
```

**Во время работы:**
```markdown
## [14:35] - Task: Create investor pitch
- Decision: Structure as narrative
- Rationale: Better storytelling for investors
- Outcome: INVESTOR_NARRATIVE.md created
```

**При завершении:**
```markdown
## Status: COMPLETED
## Duration: 2h 15m
## Deliverables: [список результатов]
## Next session priorities: [что делать дальше]
```

### Чтение (Read)

**BOS читает MEMORY для:**
- Восстановления контекста прошлых сессий
- Понимания предыдущих решений
- Избежания повторения ошибок
- Продолжения незавершенных задач

---

## Индексация

### По дате
```
2026-05/
  session_2026-05-20_14-30.md
  session_2026-05-21_09-00.md
  context_2026-05-20.md
  decisions_2026-05.md
  learnings_2026-05.md
```

### По типу
```
sessions/    - Все session logs
contexts/    - Все context snapshots
decisions/   - Все decision logs
learnings/   - Все learning traces
```

---

## Примеры использования

### Восстановление контекста

```bash
# BOS при старте новой сессии:
1. READ: MEMORY/sessions/latest.md
2. EXTRACT: Last known state, pending tasks
3. RESTORE: Working context
4. CONTINUE: From last checkpoint
```

### Анализ паттернов

```bash
# BOS анализирует накопленный опыт:
1. READ: MEMORY/learnings/*.md
2. IDENTIFY: Recurring patterns
3. EXTRACT: Best practices
4. UPDATE: /KNOWLEDGE/ base
```

### Audit trail

```bash
# Проследить историю решения:
1. SEARCH: MEMORY/decisions/ для "AI provider choice"
2. REVIEW: Rationale и outcomes
3. LEARN: Что сработало, что нет
4. APPLY: К текущему решению
```

---

## Retention Policy

### Short-term (≤ 7 дней)
- Full session logs
- Detailed context
- All decisions
- **Storage:** MEMORY/

### Medium-term (7-90 дней)
- Compressed logs
- Key decisions only
- Important context
- **Storage:** MEMORY/archive/

### Long-term (> 90 дней)
- Extracted insights → KNOWLEDGE
- Critical decisions → ARCHITECTURE
- Session metadata only
- **Storage:** MEMORY/archive/YYYY/

---

## Текущее состояние

**Статус:** Инициализирован  
**Записей:** 0 (новая система)  
**Первая сессия:** TBD

---

## Следующие шаги

- [ ] Создать первый session log
- [ ] Настроить автоматическое логирование
- [ ] Реализовать context snapshots
- [ ] Построить индексацию для поиска

---

*BOS MEMORY — Персистентная операционная память*
