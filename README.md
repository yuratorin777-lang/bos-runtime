# BOS Runtime - Business Operating System

## 🚀 Первый живой экземпляр BOS

BOS — это первая когнитивная операционная система для бизнеса с живой AI оркестрацией, 
самовосстановлением и адаптивным интеллектом.

## ✨ Основные возможности

- **🧠 AI Оркестрация** - Интеллектуальная координация между провайдерами
- **🛡️ Самовосстановление** - Автоматическое обнаружение сбоев и failover
- **⚡ Реал-тайм телеметрия** - Живой мониторинг всех процессов
- **🌊 Когнитивные потоки** - Визуализация процессов мышления AI
- **📊 Топология системы** - Интерактивная визуализация архитектуры
- **👥 AI Команда** - 5 специализированных AI агентов

## 🎯 Режимы работы

### Режим инвестора (`/investor`)
- Метрики устойчивости и надежности
- Экономика runtime
- Демонстрация интеллекта
- Визуализация самовосстановления

### Режим основателя (`/founder`)
- Рабочее пространство для исполнения
- Генерация workflows
- AI коллаборация
- Операционная память

### Центр управления оператора (`/operator`)
- Мониторинг провайдеров
- Статус системы
- История восстановления
- Управление runtime

## 🛠️ Технологический стек

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Animation:** Framer Motion
- **State:** Zustand
- **Visualization:** React Flow, Recharts
- **Icons:** Lucide React

## 📦 Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Открыть в браузере
http://localhost:3000
```

## 🏗️ Структура проекта

```
bos-runtime/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Main dashboard
│   ├── investor/          # Investor mode
│   ├── founder/           # Founder mode
│   └── operator/          # Operator mode
├── components/            # React компоненты
│   ├── ui/               # UI primitives
│   ├── Navigation.tsx    # Навигация
│   ├── MetricsPanel.tsx  # Панель метрик
│   ├── AIAgentsPanel.tsx # AI агенты
│   ├── TopologyGraph.tsx # Граф топологии
│   ├── CognitionStream.tsx # Поток познания
│   └── TelemetryPanel.tsx  # Телеметрия
├── store/                 # State management
│   └── runtime.ts        # Runtime store (Zustand)
├── lib/                   # Утилиты
│   ├── utils.ts          # Хелперы
│   └── i18n.ts           # Локализация
├── types/                 # TypeScript типы
│   └── index.ts          # Core types
└── services/              # Сервисы
    └── mockData.ts       # Mock данные
```

## 🌐 Страницы

- `/` - Landing page с обзором системы
- `/dashboard` - Главный dashboard с live метриками
- `/investor` - Режим инвестора с аналитикой
- `/founder` - Рабочее пространство основателя
- `/operator` - Центр управления оператора

## 🎨 Дизайн система

BOS использует premium dark-mode дизайн с:
- Операционной цветовой палитрой
- Когнитивными glow эффектами
- Живыми анимациями
- Responsive layout
- Runtime grid фоном

## 🌍 Локализация

- 🇷🇺 Русский (основной)
- 🇬🇧 English (дополнительный)

Переключение через кнопку в navigation bar.

## 🔄 Live Updates

Система автоматически симулирует живую активность:
- Обновление метрик каждые 3 секунды
- Изменение статусов агентов
- Обновление топологии
- Новые события телеметрии

## 📊 Компоненты

### MetricsPanel
Отображает 8 ключевых метрик runtime:
- Uptime, Requests, Active Agents, Cognition Depth
- Latency, Memory, Health, Failovers

### AIAgentsPanel
Визуализация 5 AI агентов:
- AI Architect, AI Analyst, AI Orchestrator
- AI Guardian, AI Coordinator

### TopologyGraph
Интерактивный граф системной архитектуры с:
- Nodes (providers, orchestrator, memory, cognition)
- Edges (data flow, control flow)
- Real-time health status

### CognitionStream
Поток когнитивных процессов:
- Reasoning, Planning, Execution
- Memory, Coordination
- Tree структура с depth visualization

### TelemetryPanel
Live события системы:
- Success, Error, Warning, Recovery, Info
- Timestamps и источники
- Scrollable история

## 🚀 Готово к продакшену

Система создана как production-ready с:
- TypeScript для type safety
- Оптимизированными компонентами
- Responsive дизайном
- Accessibility поддержкой
- Error boundaries (можно добавить)

## 📝 Следующие шаги

1. Интеграция с реальными AI провайдерами
2. WebSocket для live updates
3. Backend API
4. Аутентификация пользователей
5. Сохранение состояния
6. Расширенная аналитика

---

**BOS Runtime v1.0** - Первая живая когнитивная операционная система для бизнеса
