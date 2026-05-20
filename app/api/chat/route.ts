import { NextRequest } from 'next/server'
import { getBOSAIService } from '@/lib/ai-service'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  console.log('🔷 [API /chat] Incoming request');
  
  try {
    const { messages, model, stream = true, mode = 'founder' } = await req.json()

    console.log('📨 [API /chat] Request params:', {
      messagesCount: messages?.length,
      model,
      stream,
      mode,
      hasMessages: !!messages
    });

    if (!messages || !Array.isArray(messages)) {
      console.error('❌ [API /chat] Invalid messages array');
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Получаем BOS AI Service (использует нашу внутреннюю прокси функцию)
    const aiService = getBOSAIService()
    
    // Получаем system prompt для режима (founder/operator/investor)
    const systemPrompt = aiService.getBOSSystemPrompt(mode)

    console.log('✅ [API /chat] AI Service ready, mode:', mode);

    // Выполняем запрос через BOS AI Service
    if (stream) {
      console.log('🌊 [API /chat] Starting streaming response');
      // Streaming response через наш прокси
      return await aiService.streamCompletion({
        messages,
        model,
        systemPrompt,
        temperature: 0.7,
        max_tokens: 4000,
      })
    } else {
      console.log('📄 [API /chat] Starting non-streaming response');
      // Non-streaming response
      const content = await aiService.completion({
        messages,
        model,
        systemPrompt,
        temperature: 0.7,
        max_tokens: 4000,
      })

      console.log('✅ [API /chat] Non-streaming completed');
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
    console.error('❌ [API /chat] Error:', {
      message: error.message,
      stack: error.stack,
      error: error
    });
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
