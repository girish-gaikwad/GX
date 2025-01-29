import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

interface SummaryResponse {
  mainSummary: string;
  keyPoints: string[];
  topics: string[];
}

type SummaryStyle = 'concise' | 'detailed' | 'technical' | 'simplified';
type SummaryLength = '10' | '50' | '90';

const STYLE_PROMPTS: Record<SummaryStyle, string> = {
  concise: 'Focus on the main points only.',
  detailed: 'Include supporting details and context.',
  technical: 'Use technical language and focus on technical aspects.',
  simplified: 'Use simple language and explain concepts clearly.'
};

const LENGTH_PROMPTS: Record<SummaryLength, string> = {
  '10': 'very brief',
  '50': 'moderate length',
  '90': 'very detailed'
};

const getGeminiModel = (): GenerativeModel => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
};

async function extractTextFromBuffer(file: Buffer): Promise<string> {
  return file.toString();
}

async function parseGeminiResponse(responseText: string): Promise<SummaryResponse> {
  try {
    // Try to parse the response directly first
    return JSON.parse(responseText) as SummaryResponse;
  } catch (error) {
    // If direct parsing fails, try to extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]) as SummaryResponse;
      } catch {
        throw new Error('Failed to parse JSON from response');
      }
    }
    
    // If no JSON found, construct a response from the text
    return {
      mainSummary: responseText,
      keyPoints: [],
      topics: []
    };
  }
}

async function generateSummary(
  text: string,
  style: SummaryStyle,
  length: SummaryLength,
  model: GenerativeModel
): Promise<SummaryResponse> {
  const prompt = `
    Please provide a ${LENGTH_PROMPTS[length]} summary of the following document. ${STYLE_PROMPTS[style]}
    Additionally, extract key points and main topics.
    Your response MUST be valid JSON with exactly this structure:
    {
      "mainSummary": "the main summary text",
      "keyPoints": ["point 1", "point 2", ...],
      "topics": ["topic 1", "topic 2", ...]
    }
    Do not include any other text or formatting outside the JSON structure.
    
    Document text: ${text}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return parseGeminiResponse(response.text());
}

export async function POST(req: Request) {
  try {
    const model = getGeminiModel();
    const formData = await req.formData();
    
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const summaryLength = formData.get('summaryLength') as SummaryLength;
    if (!Object.keys(LENGTH_PROMPTS).includes(summaryLength)) {
      return NextResponse.json(
        { error: 'Invalid summary length' },
        { status: 400 }
      );
    }

    const summaryStyle = formData.get('summaryStyle') as SummaryStyle;
    if (!Object.keys(STYLE_PROMPTS).includes(summaryStyle)) {
      return NextResponse.json(
        { error: 'Invalid summary style' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const text = await extractTextFromBuffer(buffer);

    const summary = await generateSummary(text, summaryStyle, summaryLength, model);
    
    return NextResponse.json(summary);

  } catch (error) {
    console.error('Error processing document:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API_KEY')) {
        return NextResponse.json(
          { error: 'API configuration error' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}