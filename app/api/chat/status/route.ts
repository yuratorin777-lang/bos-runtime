import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.OPENROUTER_API_KEY
  const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o'
  
  if (!apiKey) {
    return NextResponse.json({
      status: 'disconnected',
      error: 'API key not configured',
      model: null,
    })
  }

  try {
    // Test connection with a minimal request
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    })

    if (response.ok) {
      return NextResponse.json({
        status: 'connected',
        model: model,
        timestamp: new Date().toISOString(),
      })
    } else {
      return NextResponse.json({
        status: 'degraded',
        error: 'API authentication failed',
        model: model,
      })
    }
  } catch (error) {
    return NextResponse.json({
      status: 'disconnected',
      error: 'Connection failed',
      model: null,
    })
  }
}
