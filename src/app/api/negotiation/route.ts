import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req) {
  try {
    const { currentOffer, targetPrice, role, context } = await req.json();

    // Input validation
    if (!currentOffer || !targetPrice || !role) {
      return new Response(JSON.stringify({ 
        error: 'Missing required negotiation parameters' 
      }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const systemPrompt = `You are an expert negotiation coach providing real-time strategic advice. 
    Analyze offers, suggest counter-offers, and provide tactical recommendations.
    Focus on:
    - Identifying leverage points
    - Suggesting specific counter-offers with rationale
    - Highlighting potential risks and opportunities
    - Maintaining professionalism and ethics
    Be concise, direct, and practical in your advice.`;

    const userPrompt = `
    Based on:
    - other party's Current offer: $${currentOffer}
    - budget(if i am a buyer)/Target price(if i am a seller): $${targetPrice}
    - I am: ${role}
    - Context: ${context || 'No specific context'}
    Provide:
    1. Specific counter-offer amount and persuasive reason that i should say to the other party to agree on my price.
    Note that if i am a buyer i want to get the product at as low price as possible from the budget and therefore i would like to reduce the current price. And if i am a seller i want to sell the product at as high price as possible from the target price and therefore i would like increase the current price.`;


    try {
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        model: "llama3-8b-8192",
        temperature: 0.7,
        max_tokens: 1000
      });

      const suggestion = completion.choices[0].message.content;

      return new Response(
        JSON.stringify({ suggestion }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (aiError) {
      console.error('AI Generation Error:', aiError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to generate negotiation strategy', 
          details: aiError.message 
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('Route Handler Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}