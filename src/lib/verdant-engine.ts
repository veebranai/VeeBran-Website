
import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

// Initialize OpenRouter using OpenAI provider
const openrouter = createOpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
});

// Schema for structured AI response
const ProposalSchema = z.object({
    executiveSummary: z.string(),
    projectOverview: z.string(),
    objectives: z.array(z.string()),
    scopeOfWork: z.array(
        z.object({
            phase: z.string(),
            deliverables: z.array(z.string()),
            estimatedHours: z.number(),
            timeline: z.string()
        })
    ),
    assumptions: z.array(z.string()),
    nextSteps: z.array(z.string()),
    complexity: z.enum(['low', 'medium', 'high']),
    estimatedTotalHours: z.number()
});

export type ProposalData = z.infer<typeof ProposalSchema>;

/**
 * Verdant Intelligence Engine
 * Where project seeds grow into comprehensive proposals.
 */
export class VerdantEngine {
    private static modelId = 'meta-llama/llama-3-8b-instruct:free';

    /**
     * Generates a comprehensive proposal using the Verdant brand voice.
     */
    static async generateProposal(
        projectDetails: any,
        region: string,
        industry: string
    ): Promise<ProposalData> {
        try {
            const { object } = await generateObject({
                model: openrouter(this.modelId),
                schema: ProposalSchema,
                system: `You are the VeeBran Intelligence Engine, VeeBran's proprietary AI layer. Your philosophy is rooted in the belief that "Nature Meets Technology"—great proposals are not just built; they grow.
 
Your mission is to transform "project seeds" (requirements) into "thriving ecosystems of opportunity" (comprehensive proposals).
 
Brand Voice Guidelines:
1. Growth-Oriented: Use metaphors of nature and organic growth where appropriate (seeds, roots, blooming, scale, ecosystem).
2. Sophisticated & Professional: You sound like a senior McKinsey or BCG consultant who has an environmentalist heart.
3. Authoritative: You represent VeeBran, a leader in AI and business strategy.
4. Human-Centric: Avoid "AI-isms" like "As an AI model." Talk about "our approach," "our strategy," and "our shared growth."
 
Regional Context: Client is from ${region.toUpperCase()}. Adapt the "organic growth" philosophy to be compatible with this market's specific business culture.
Industry Context: ${industry || 'General Business'}
 
Storytelling Hook: "Just as a single seed becomes a thriving forest, your project scope grows into a comprehensive proposal through VeeBran intelligence."`,
                prompt: `Analyze this project scope and grow a professional VeeBran proposal:

                PROJECT SCOPE(The Seed):
                    ${JSON.stringify(projectDetails, null, 2)}

KEY GROWTH REQUIREMENTS:
                    - Executive Summary(State the vision of growth and initial impact)
- Project Overview(Describe the solution ecosystem we'll deliver)
                        - 3 - 5 Strategic Objectives(The roots: specific, measurable outcomes)
                    - Scope of Work(The Growth Stages) broken into 3 - 4 phases with:
  * Phase name and purpose
                * Specific deliverables(bullet points)
                    * Realistic estimated effort(hours)
                        * Timeline for each phase
                            - 3 - 4 Strategic Assumptions(The environment required for success)
                - 3 - 4 Scaling Steps(Immediate actions to begin the growth cycle)
                    - Overall Complexity Assessment(low / medium / high)
                        - Total Estimated Effort(Total hours across the ecosystem)

Write with the power of nature and the precision of technology.`
            });

            return object;
        } catch (error) {
            console.error('Verdant Engine failed to sprout:', error);
            // Fallback to organic template if AI fails
            return this.generateFallbackProposal(projectDetails, region);
        }
    }

    /**
     * Fallback proposal generator (Organic Template)
     */
    private static generateFallbackProposal(projectDetails: any, region: string): ProposalData {
        const projectName = projectDetails.projectTitle || 'Your Project';

        return {
            executiveSummary: `Just as a single seed becomes a thriving forest, your project with VeeBran represents the start of a significant growth cycle.We propose a comprehensive ${projectName.toLowerCase()} ecosystem designed to deliver sustainable business impact.`,
            projectOverview: `This engagement will nurture ${projectDetails.rawSummary ? 'your current operations' : 'your business'} through a structured, multi - stage growth process, specifically calibrated for the ${region.toUpperCase()} market ecosystem.`,
            objectives: [
                'Establish deep operational roots for the project',
                'Achieve measurable ROI bloom within 6 months',
                'Integrate seamlessly into your existing business environment',
                'Empower your team with sustainable knowledge transfer'
            ],
            scopeOfWork: [
                {
                    phase: 'Discovery & Soil Analysis',
                    deliverables: [
                        'Stakeholder interviews and requirement gathering',
                        'Current state assessment and growth gap analysis',
                        'Proposed technology architecture and roadmap',
                        'Detailed growth plan with phase milestones'
                    ],
                    estimatedHours: 40,
                    timeline: '2 weeks'
                },
                {
                    phase: 'Cultivation & Implementation',
                    deliverables: [
                        'UI/UX design and organic prototyping',
                        'Core system development and environment integration',
                        'AI model training and configuration',
                        'Quality assurance and environmental testing'
                    ],
                    estimatedHours: 120,
                    timeline: '6 weeks'
                },
                {
                    phase: 'Blooming & Optimization',
                    deliverables: [
                        'Production deployment and data migration',
                        'User empowerment training and documentation',
                        'Growth monitoring and performance optimization',
                        'Post-launch support and refinement'
                    ],
                    estimatedHours: 60,
                    timeline: '3 weeks'
                }
            ],
            assumptions: [
                'Client will provide timely feedback to maintain growth momentum',
                'Required resources and system access will be available',
                'Key stakeholders will be engaged in the planting process',
                'Scope environment remains stable during development'
            ],
            nextSteps: [
                'Schedule discovery workshop to prepare the project soil',
                'Finalize growth agreement and initial investment',
                'Kickoff meeting with the cultivation team',
                'Begin discovery phase within 3 business days'
            ],
            complexity: 'medium',
            estimatedTotalHours: 220
        };
    }
}
