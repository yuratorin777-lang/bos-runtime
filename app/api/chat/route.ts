import { NextRequest } from 'next/server'
import { getBOSAIService } from '@/lib/ai-service'

// Edge Runtime конфигурация для минимальной латентности
export const runtime = 'edge'
export const preferredRegion = 'auto' // Автовыбор ближайшего региона
export const dynamic = 'force-dynamic' // Отключаем кэширование
export const maxDuration = 30 // Максимальная длительность выполнения (секунды)

export async function POST(req: NextRequest) {
  try {
    const { messages, model, stream = true, mode = 'founder' } = await req.json()

    // Быстрая валидация
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // ОПТИМИЗАЦИЯ: Ограничение размера контекста в FAST_RUNTIME_MODE
    const maxContextTokens = parseInt(process.env.MAX_CONTEXT_TOKENS || '2000', 10)
    const fastMode = process.env.FAST_RUNTIME_MODE === 'true'
    
    // Ограничиваем количество сообщений в истории (предотвращаем таймауты)
    let limitedMessages = messages
    if (fastMode && messages.length > 10) {
      // Сохраняем только последние 10 сообщений для быстрого режима
      limitedMessages = messages.slice(-10)
      console.log(`⚡ [FAST MODE] Ограничение истории: ${messages.length} → ${limitedMessages.length} сообщений`)
    }

    // Получаем сервис (singleton, быстро)
    const aiService = getBOSAIService()
    
    // Получаем system prompt (с кэшированием + быстрый режим)
    const systemPrompt = aiService.getBOSSystemPrompt(mode)

    // Выполняем запрос - минимизируем задержку перед стримом
    if (stream) {
      // Streaming response - оптимизирован для первого токена
      return await aiService.streamCompletion({
        messages: limitedMessages,
        model,
        systemPrompt,
        temperature: 0.7,
        max_tokens: 2000,
      })
    } else {
      // Non-streaming response
      const content = await aiService.completion({
        messages: limitedMessages,
        model,
        systemPrompt,
        temperature: 0.7,
        max_tokens: 2000,
      })

      return new Response(
        JSON.stringify({
          message: content,
          status: 'connected',
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

  } catch (error: any) {
    console.error('❌ [API /chat] Error:', error.message);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: error.message,
        status: 'disconnected',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
