'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Activity, TrendingUp, Briefcase, Settings, Brain, Zap, Shield, GitBranch } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 runtime-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium">Живая когнитивная система</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-bos-cognition bg-clip-text text-transparent">
              BOS
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Business Operating System
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Первая когнитивная операционная система для бизнеса. Живой runtime с AI оркестрацией, 
              самовосстановлением и адаптивным интеллектом.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" variant="primary" className="text-lg px-8">
                  <Activity className="w-5 h-5 mr-2" />
                  Открыть Dashboard
                </Button>
              </Link>
              <Link href="/investor">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Режим инвестора
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Возможности BOS</h2>
          <p className="text-xl text-muted-foreground">
            Инновационная архитектура для масштабируемого бизнеса
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modes Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Режимы работы</h2>
            <p className="text-xl text-muted-foreground">
              Адаптивный интерфейс для каждой роли
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {modes.map((mode, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <Link href={mode.href}>
                  <Card className="h-full hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20">
                    <CardContent className="p-8">
                      <mode.icon className={`w-16 h-16 mb-6 ${mode.color}`} />
                      <h3 className="text-2xl font-bold mb-4">{mode.title}</h3>
                      <p className="text-muted-foreground mb-6">{mode.description}</p>
                      <ul className="space-y-2">
                        {mode.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center text-sm">
                            <div className={`w-1.5 h-1.5 rounded-full ${mode.color} mr-2`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6">
            Готовы увидеть BOS в действии?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Запустите живую систему прямо сейчас
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="primary" className="text-lg px-12">
              Запустить BOS Runtime
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: Brain,
    title: 'AI Оркестрация',
    description: 'Интеллектуальная координация между провайдерами с автоматической балансировкой',
    gradient: 'from-bos-cognition to-bos-ai',
  },
  {
    icon: Shield,
    title: 'Самовосстановление',
    description: 'Автоматическое обнаружение сбоев и переключение на резервные провайдеры',
    gradient: 'from-bos-topology to-bos-orchestration',
  },
  {
    icon: Zap,
    title: 'Реал-тайм телеметрия',
    description: 'Живой мониторинг всех процессов и метрик системы',
    gradient: 'from-bos-telemetry to-bos-runtime',
  },
  {
    icon: GitBranch,
    title: 'Когнитивные потоки',
    description: 'Визуализация процессов мышления и планирования AI агентов',
    gradient: 'from-bos-orchestration to-bos-cognition',
  },
]

const modes = [
  {
    icon: TrendingUp,
    title: 'Режим инвестора',
    description: 'Стратегическая аналитика и визуализация',
    href: '/investor',
    color: 'text-bos-topology',
    features: [
      'Метрики устойчивости',
      'Экономика runtime',
      'Демонстрация интеллекта',
      'Самовосстановление',
    ],
  },
  {
    icon: Briefcase,
    title: 'Режим основателя',
    description: 'Рабочее пространство для исполнения',
    href: '/founder',
    color: 'text-bos-cognition',
    features: [
      'Генерация workflows',
      'AI коллаборация',
      'Операционная память',
      'Управление оркестрацией',
    ],
  },
  {
    icon: Settings,
    title: 'Центр управления',
    description: 'Мониторинг и контроль runtime',
    href: '/operator',
    color: 'text-bos-telemetry',
    features: [
      'Мониторинг провайдеров',
      'Давление очередей',
      'Визуализация failover',
      'Восстановление системы',
    ],
  },
]
