import { NextRequest } from 'next/server'
import { getBOSAIService } from '@/lib/ai-service'

// Edge Runtime конфигурация
export const runtime = 'edge'
export const preferredRegion = 'auto'
export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Увеличили до 60, чтобы Vercel не рубил соединение

export async function POST(req: NextRequest) {
  try {
    const { messages, model, stream = true, mode = 'founder' } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages array is required' }), { status: 400 })
    }

    const aiService = getBOSAIService()
    
    // Оптимальный лимит токенов для быстрой генерации без зависаний
    const optimalTokens = 3000 

    if (stream) {
      return await aiService.streamCompletion({
        messages,
        model,
        temperature: 0.7,
        max_tokens: optimalTokens,
        mode,
        useCognitionLayer: true
      })
    } else {
      const content = await aiService.completion({
        messages,
        model,
        temperature: 0.7,
        max_tokens: optimalTokens,
        mode,
        useCognitionLayer: true
      })

      return new Response(
        JSON.stringify({ message: content, status: 'connected' }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

  } catch (error: any) {
    console.error('❌ [API /chat] Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}
