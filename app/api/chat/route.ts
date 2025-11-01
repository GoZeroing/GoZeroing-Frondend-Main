import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface ChatRequest {
  message: string;
  conversationHistory?: Array<{ role: string; content: string }>;
}

interface Source {
  id: string;
  title: string;
  url: string;
  snippet: string;
  type: 'web' | 'memory' | 'document';
}

// Mock sources for demonstration - replace with actual search/retrieval logic
const getMockSources = (query: string): Source[] => {
  return [
    {
      id: '1',
      title: `Search results for: ${query}`,
      url: 'https://example.com/search',
      snippet: 'Relevant information retrieved from web search...',
      type: 'web',
    },
    {
      id: '2',
      title: 'Memory: Previous conversation',
      url: 'memory://conversation',
      snippet: 'Context from previous discussions...',
      type: 'memory',
    },
  ];
};

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { message, conversationHistory = [] } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // TODO: Implement actual AI service integration
    // Example integrations:
    // - OpenAI API
    // - Anthropic Claude
    // - Google Gemini
    // - Local LLM

    // Simulate search stages
    const stages = [
      { stage: 'memory', status: 'complete', message: 'Retrieved relevant memories', duration: 1200 },
      { stage: 'quick', status: 'complete', message: 'Quick search completed', duration: 1000 },
      { stage: 'deep', status: 'complete', message: 'Deep search completed', duration: 1500 },
      { stage: 'generating', status: 'complete', message: 'Response generated', duration: 500 },
    ];

    // Get sources
    const sources = getMockSources(message);

    // Generate response (replace with actual AI call)
    const response = {
      content: `I understand you're asking about "${message}". Based on my search across multiple sources, here's what I found: [1] This is a comprehensive response that addresses your query. [2] I've also considered relevant context from our previous conversations. The information has been synthesized from reliable sources to provide you with accurate insights.`,
      sources,
      searchProgress: stages,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Add GET endpoint for health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Chat API is running',
    timestamp: new Date().toISOString(),
  });
}
