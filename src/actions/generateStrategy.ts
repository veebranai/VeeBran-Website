'use server';

import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
});

// Define the response structure for type safety
export type StrategyResult = {
    title: string;
    score: number; // 0-100
    insight: string;
    recommendation: string;
    reasoning?: string; // Optional field for the reasoning details
};

export async function generateStrategy(industry: string, goal: string): Promise<StrategyResult> {
    if (!process.env.OPENROUTER_API_KEY) {
        // Return high-quality mock if no API key
        return getMockStrategy(industry, goal);
    }

    const prompt = `
    Analyze the ${industry} industry with a focus on ${goal}.
    Generate a strategic insight for a company in this space.
    
    Return a JSON object with the following fields:
    - title: A catchy title for the strategy.
    - score: A viability score between 85 and 99 (integer).
    - insight: A 2-sentence deep dive into the opportunity.
    - recommendation: A short, actionable 3-5 word recommendation (e.g. "Adopt Agentic Workflows").

    Ensure the tone is professional, futuristic, and consulting-oriented.
  `;

    try {
        const response = await openai.chat.completions.create({
            model: 'arcee-ai/trinity-large-preview:free',
            messages: [
                { role: 'system', content: 'You are a high-end strategic AI consultant. You output only valid JSON.' },
                { role: 'user', content: prompt }
            ],
            // The user requested reasoning, so let's enable it if the model supports it via the flag
            // based on the user provided snippet: reasoning: { enabled: true }
            reasoning: { enabled: true },
            response_format: { type: 'json_object' } // Force JSON
        } as any); // Cast to any because the reasoning param might not be in the official types yet

        const content = response.choices[0].message.content;
        const reasoning = (response.choices[0].message as any).reasoning_details;

        if (!content) {
            throw new Error('No content generated');
        }

        const result = JSON.parse(content);

        return {
            title: result.title || `AI Strategy for ${industry}`,
            score: result.score || 88,
            insight: result.insight || 'Analysis complete.',
            recommendation: result.recommendation || 'Proceed with caution.',
            reasoning: reasoning ? JSON.stringify(reasoning) : undefined
        };

    } catch (error) {
        console.error('AI Strategy Generation Failed:', error);
        // Fallback in case of failure so the demo doesn't break
        return getMockStrategy(industry, goal);
    }
}

function getMockStrategy(industry: string, goal: string): StrategyResult {
    const insights: Record<string, string> = {
        'Finance': `Leveraging quantum-resistant ledger technologies to optimize ${goal.toLowerCase()} vectors while maintaining regulatory compliance. Autonomous arbitrage agents are showing 40% efficiency gains.`,
        'Healthcare': `Deploying federated learning models to enhance patient outcomes through predictive diagnositics. This approach maximizes ${goal.toLowerCase()} by reducing administrative overhead.`,
        'Manufacturing': `Implementing digital twin simulations to predict supply chain bottlenecks before they occur. Smart factories focusing on ${goal.toLowerCase()} are outperforming legacy systems by 300%.`,
        'Retail': `Hyper-personalization engines driven by behavioral transformers are redefining the customer journey. Verified impact on ${goal.toLowerCase()} metrics is substantial.`,
        'Tech': `Next-gen neural architectures are enabling ${goal.toLowerCase()} at scale. The shift towards agentic workflows is the primary driver of value in this sector.`
    };

    const recommendations: Record<string, string> = {
        'Efficiency': 'Automate Core Workflows',
        'Growth': 'Scale via AI Agents',
        'Innovation': 'Disrupt via Generative Models',
        'Sustainability': 'Optimize Resource Allocation'
    };

    return {
        title: `AI-Driven ${goal} Strategy for ${industry}`,
        score: Math.floor(Math.random() * 5) + 94, // High score for demo (94-98)
        insight: insights[industry] || `AI analysis indicates a strong opportunity for ${goal.toLowerCase()} optimization using advanced predictive models.`,
        recommendation: recommendations[goal] || 'Implement Adaptive Systems'
    };
}
