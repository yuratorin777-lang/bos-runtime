'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useRuntimeStore } from '@/store/runtime'
import { t } from '@/lib/i18n'
import { Activity, TrendingUp, Briefcase, Settings } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()
  const { language, setLanguage } = useRuntimeStore()
  
  const links = [
    { href: '/dashboard', label: t(language, 'nav.dashboard'), icon: Activity },
    { href: '/investor', label: t(language, 'nav.investor'), icon: TrendingUp },
    { href: '/founder', label: t(language, 'nav.founder'), icon: Briefcase },
    { href: '/operator', label: t(language, 'nav.operator'), icon: Settings },
  ]
  
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bos-cognition to-bos-topology flex items-center justify-center">
                <span className="text-white font-bold text-sm">BOS</span>
              </div>
              <span className="font-bold text-xl">BOS</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              {links.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center space-x-2 px-4 py-2 rounded-md transition-colors',
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
              className="px-3 py-1 rounded-md border border-border hover:bg-accent transition-colors text-sm"
            >
              {language === 'ru' ? 'EN' : 'RU'}
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">Runtime Active</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
