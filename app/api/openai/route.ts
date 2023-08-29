import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: any) {
  const { userText } = await request.json();

  const response = await openai.chat.completions.create({
    messages: [{ role: 'user', content: userText }],
    model: 'gpt-3.5-turbo',
  });

  const generatedText = response?.choices?.[0]?.message?.content?.trim();

  return NextResponse.json({ response: generatedText }, { status: 200 });
}
