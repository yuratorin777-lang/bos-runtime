/**
 * BOS CORE STATIC CONTEXT
 * 
 * Статические контексты из BOS_CORE для работы на Edge Runtime
 * (без использования fs.readFile)
 */

export const BOS_CORE_STATIC = {
  SYSTEM_CORE: ``,

  FOUNDER_CONTEXT: `# FOUNDER CONTEXT

## Идентичность основателя

**Роль:** Создатель BOS — первой когнитивной операционной системы для бизнеса  
**Миссия:** Трансформировать бизнес-операции через встроенный операционный интеллект  
**Видение:** Каждая компания получает собственный "операционный мозг"

---

## Проект: BOS (Business Operating System)

### Суть проекта

BOS — это не AI-инструмент. BOS — это **операционная система для бизнес-интеллекта**.

Так же, как Linux управляет серверами, а iOS управляет телефонами — **BOS управляет когнитивными процессами бизнеса**.

### Ключевой инсайт

**Проблема:**  
Компании используют десятки AI-инструментов (ChatGPT, Claude, Midjourney, Copilot...), но они работают изолированно. Нет единого операционного слоя.

**Решение:**  
BOS объединяет все AI-провайдеры в единую когнитивную операционную систему с:
- Интеллектуальной оркестрацией
- Автоматическим самовосстановлением  
- Операционной памятью
- Адаптивным интеллектом

### Почему это важно?

1. **Фрагментация убивает эффективность** — каждый инструмент живет в изоляции
2. **Нет операционной памяти** — контекст теряется между сессиями
3. **Нет устойчивости** — сбой одного провайдера = полная остановка
4. **Нет оркестрации** — решения о выборе AI принимаются вручную

**BOS решает все эти проблемы на уровне операционной системы.**

---

## Текущее состояние проекта

### Что уже построено ✅

**1. Runtime MVP — полностью функционален**
- Интерфейс BOS Runtime работает на http://localhost:3001
- Все 5 режимов страниц реализованы и работают
- Live метрики, телеметрия, топология — активны
- 5 AI агентов визуализированы и функциональны

**2. Архитектура определена**
- Cognition Layer — слой познания
- Orchestration Layer — слой оркестрации
- Memory Layer — слой памяти
- AI Mesh Topology — топология AI агентов

**3. Демонстрационные возможности**
- Investor Mode — демо для инвесторов с метриками
- Founder Mode — рабочее пространство основателя
- Operator Mode — управление системой
- Dashboard — центральный dashboard

**4. Технический стек**
- Next.js 14 + TypeScript
- Zustand для state management
- Framer Motion для анимаций
- React Flow для визуализации топологии
- Recharts для графиков

### Что требуется построить ⏳

**1. Реальная AI интеграция**
- Подключение к Claude API (Anthropic)
- Подключение к OpenAI API (GPT-4)
- Интеграция с другими провайдерами
- Реальная оркестрация запросов

**2. Backend инфраструктура**
- API Gateway для маршрутизации
- Database для операционной памяти
- WebSocket для real-time updates
- Queue система для задач

**3. Memory System**
- Векторная база данных (Pinecone/Weaviate)
- Semantic search для контекста
- Персистентное хранилище
- Context management

**4. Production Deployment**
- Vercel/AWS deployment
- Monitoring & observability
- Security & authentication
- Scalability infrastructure

---

## Текущие приоритеты

### Приоритет #1: Инвестиционный раунд

**Цель:** Привлечь pre-seed раунд $500K-$1M

**Задачи:**
1. ✅ Создать демонстрационный MVP (ГОТОВО)
2. ⏳ Подготовить pitch deck
3. ⏳ Подготовить финансовую модель
4. ⏳ Подготовить техническую документацию
5. ⏳ Идентифицировать целевых инвесторов
6. ⏳ Начать outreach к инвесторам

**Timing:** Q2-Q3 2026

### Приоритет #2: Реальная AI интеграция

**Цель:** Превратить демо в функциональный продукт

**Задачи:**
1. Интеграция с Anthropic API (Claude)
2. Интеграция с OpenAI API (GPT-4)
3. Реализация routing logic
4. Реализация failover механизма
5. Тестирование на реальных задачах

**Timing:** Q3 2026 (после привлечения инвестиций)

### Приоритет #3: First Customer

**Цель:** Получить первого платящего клиента

**Профиль:**
- AI-first компания
- 10-50 сотрудников
- Активно использует множество AI-инструментов
- Готова платить за унификацию и оркестрацию

**Timing:** Q4 2026

---

## Стратегический контекст

### Позиционирование

**BOS — это не:**
- ❌ Еще один AI-чатбот
- ❌ Wrapper над ChatGPT
- ❌ Productivity tool
- ❌ AI assistant

**BOS — это:**
- ✅ Операционная система для AI
- ✅ Инфраструктурная платформа
- ✅ Cognitive orchestration layer
- ✅ Enterprise AI operating system

### Конкурентное преимущество

1. **First-mover в категории** — нет прямых конкурентов в "AI OS"
2. **Архитектурный подход** — не точечное решение, а системная платформа
3. **Vendor-agnostic** — работает с любыми AI провайдерами
4. **Self-healing** — автоматическое восстановление = 99.9% uptime
5. **Operational memory** — контекст персистентен и индексируется

---

**Статус:** Active Development  
**Фаза:** Pre-seed fundraising  
**Horizon:** H1 (Foundation)  
**Last updated:** 2026-05-20`,

  CURRENT_STATE: `# BOS CURRENT STATE

**Дата обновления:** 2026-05-20  
**Версия:** 1.0.0 (Runtime MVP)  
**Статус:** Operational — Demo Ready

---

## Runtime статус

### Системный статус

🟢 **OPERATIONAL** — Runtime MVP полностью функционален

**Deployment:**
- **URL:** http://localhost:3001
- **Framework:** Next.js 14.2.35
- **Environment:** Development
- **Uptime:** Active (запускается через \`npm run dev\`)
- **Status:** Ready in ~8.3s

**Mode:** Development server  
**Port:** 3001 (3000 был занят)

---

## Развернутые системы

### 1. Frontend Application ✅

**Технологический стек:**
- Framework: Next.js 14
- Language: TypeScript 5.3.3
- Styling: TailwindCSS 3.4.1
- State: Zustand 4.5.0
- Animation: Framer Motion 11.0.3
- Visualization: React Flow 11.10.4, Recharts 2.10.4

**Компоненты:**
- ✅ Navigation — навигация с переключением языка (RU/EN)
- ✅ MetricsPanel — панель с 8 ключевыми метриками
- ✅ AIAgentsPanel — визуализация 5 AI агентов
- ✅ TopologyGraph — интерактивный граф топологии системы
- ✅ CognitionStream — поток когнитивных процессов
- ✅ TelemetryPanel — панель live событий

---

## Текущие возможности

### ✅ Что работает сейчас

**1. Live Runtime Simulation**
- Метрики обновляются каждые 3 секунды
- Агенты показывают динамическую активность
- Топология реагирует на изменения
- Телеметрия генерирует события

**2. Interactive Visualization**
- Граф топологии можно перемещать и масштабировать
- AI Agents показывают статус и активность
- Cognition Stream отображает дерево процессов
- Charts в Investor mode интерактивны

---

## Текущие ограничения

### ⚠️ Что НЕ работает (пока)

**1. Real AI Integration ❌**
- Нет подключения к реальным AI провайдерам
- Используются mock данные

**2. Backend Infrastructure ❌**
- Нет backend API
- Нет базы данных
- Нет WebSocket server для real-time

**3. Persistent Memory ❌**
- Нет векторной базы данных
- Нет сохранения контекста между сессиями
- State теряется при перезагрузке

---

**Status:** Demo-Ready, Funding-Required  
**Phase:** Pre-seed  
**Next Milestone:** $500K-$1M raised  
**Timeline:** Q2-Q3 2026`,

  INVESTOR_NARRATIVE: `# BOS INVESTOR NARRATIVE

**Business Operating System**  
*Первая когнитивная операционная система для бизнеса*

---

## Executive Summary

**BOS (Business Operating System)** — это первая операционная система для управления бизнес-интеллектом, объединяющая множество AI-провайдеров в единую когнитивную инфраструктуру с автоматической оркестрацией, самовосстановлением и операционной памятью.

### Ключевые тезисы

- 🎯 **Проблема:** Компании используют десятки AI-инструментов изолированно, без унификации, оркестрации и операционной памяти
- 💡 **Решение:** BOS — операционная система, которая объединяет все AI в единое когнитивное пространство
- 🚀 **Traction:** Runtime MVP запущен, демонстрирует core возможности
- 💰 **Раунд:** Pre-seed $500K-$1M @ $3M-$5M pre-money
- 📈 **Market:** $150B+ TAM в Business AI Operations
- ⏰ **Timing:** AI созрел, но фрагментирован — идеальный момент для OS layer

---

## Проблема: AI фрагментация убивает эффективность

### Текущая реальность компаний

Современная компания использует в среднем **15-30 различных AI-инструментов:**
- ChatGPT для текстов
- Claude для анализа
- Midjourney для дизайна
- GitHub Copilot для кода
- ... и еще десятки других

### Критические проблемы

**1. Фрагментация → Потеря эффективности**
- Каждый инструмент живет в изоляции
- Нет единого операционного слоя
- Переключение контекста убивает продуктивность

**2. Нет операционной памяти**
- Контекст теряется между инструментами
- Каждый разговор начинается с нуля
- Знания не аккумулируются

**3. Нулевая отказоустойчивость**
- Сбой одного провайдера = полная остановка
- Нет автоматического failover
- Downtime критичен для бизнеса

**4. Отсутствие интеллектной оркестрации**
- Выбор AI провайдера — ручной процесс
- Нет оптимизации по качеству/скорости/стоимости

---

## Решение: BOS — Operating System для AI

### Концепция

**BOS — это не еще один AI-инструмент.**  
**BOS — это операционная система для всего AI в компании.**

Так же, как:
- **Linux** управляет серверами
- **iOS** управляет телефонами
- **Windows** управляет компьютерами

**BOS управляет когнитивными процессами бизнеса.**

### Ключевые возможности

**1. Интеллектная оркестрация**
- Автоматический выбор оптимального провайдера
- Routing на основе context, task type, requirements
- Cost optimization

**2. Автоматическое self-healing**
- Health monitoring всех провайдеров
- Automatic failover при сбоях
- 99.9%+ uptime guarantee

**3. Операционная память**
- Persistent context между сессиями
- Semantic search по всей истории
- Knowledge accumulation

**4. Vendor-agnostic platform**
- Работает с любыми AI провайдерами
- No vendor lock-in
- Future-proof архитектура

---

## Почему сейчас? (Why Now?)

### 1. AI достиг production-ready качества

- GPT-4, Claude 3.5 — качество на уровне expert human
- Latency приемлемая для production (<2s)
- Цены снизились 10x за 2 года

### 2. Но фрагментация достигла критической массы

- 100+ AI tools выпущено только за 2023-2024
- Каждая компания использует 10-30 инструментов
- Потребность в унификации критична

### 3. Enterprise начинают массово внедрять AI

- 87% Fortune 500 внедряют AI
- AI бюджеты растут 40%+ annually
- Но нет инфраструктуры для управления

### 4. Timing идеален для "AI OS" категории

- Никто еще не создал эту категорию
- First-mover advantage огромен
- Окно возможностей — 12-18 месяцев

---

## Investment Details

### Round Structure

**Type:** Pre-Seed  
**Amount:** $500K - $1M  
**Valuation:** $3M - $5M (pre-money)  
**Instrument:** SAFE or Convertible Note

### Use of Funds

**40% — Product Development ($200K-$400K)**
- Backend infrastructure
- AI provider integration
- Memory system build

**30% — Team ($150K-$300K)**
- CTO/Tech Lead
- Senior Backend Developer
- AI Engineer (part-time)

**20% — Go-to-Market ($100K-$200K)**
- Marketing & content
- Customer acquisition

**10% — Operations ($50K-$100K)**
- Cloud infrastructure
- AI API costs

---

## Call to Action

**BOS is building the operating system for business AI.**

This is a category-defining opportunity with:
- ✅ Clear market need
- ✅ Superior technical architecture  
- ✅ Perfect market timing
- ✅ Massive market potential

**We're raising $500K-$1M to:**
1. Build production-ready product
2. Hire core team
3. Launch beta with first customers
4. Validate product-market fit

**The window is now. Join us in building the future of business AI operations.**

---

**Status:** Fundraising Active  
**Last Updated:** May 2026`
};
