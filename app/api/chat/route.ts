import { NextRequest } from 'next/server'
import { getBOSAIService } from '@/lib/ai-service'

// Edge Runtime конфигурация
export const runtime = 'edge'
export const preferredRegion = 'auto'
export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Оставляем 60 секунд, чтобы сервер не падал при глубоких ответах

export async function POST(req: NextRequest) {
  try {
    const { messages, model, stream = true, mode = 'founder' } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages array is required' }), { status: 400 })
    }

    const aiService = getBOSAIService()
    
    // ВАЖНО: Ставим 5000 токенов. Этого с головой хватит на огромный, 
    // подробный, экспертный ответ со всеми метриками и таблицами.
    const optimalTokens = 5000 

    if (stream) {
      return await aiService.streamCompletion({
        messages,
        model,
        temperature: 0.7,
        max_tokens: optimalTokens,
        mode,
        useCognitionLayer: true // Включаем полную когнитивную память
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
