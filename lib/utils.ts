import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}д ${hours % 24}ч`
  if (hours > 0) return `${hours}ч ${minutes % 60}м`
  if (minutes > 0) return `${minutes}м ${seconds % 60}с`
  return `${seconds}с`
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

export function getHealthColor(health: number): string {
  if (health >= 80) return 'text-green-500'
  if (health >= 50) return 'text-yellow-500'
  if (health >= 20) return 'text-orange-500'
  return 'text-red-500'
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
    case 'idle':
      return 'text-green-500'
    case 'thinking':
    case 'executing':
      return 'text-blue-500'
    case 'degraded':
    case 'warning':
      return 'text-yellow-500'
    case 'failed':
    case 'error':
      return 'text-red-500'
    case 'recovering':
      return 'text-orange-500'
    default:
      return 'text-gray-500'
  }
}
