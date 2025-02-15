import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const schema = z.object({
    companyName: z.string().min(1),
    industry: z.string().min(1),
    goals: z.string().min(1),
    context: z.string().optional(), 
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { companyName, industry, goals, context } = schema.parse(body);

        const prompt = `Create a comprehensive sustainability training program for ${companyName}, operating in the ${industry} industry.
    
CONTEXT
Company Goals: ${goals}

Additional Context: ${context}

REQUIREMENTS
Generate a structured training outline with the following sections:

1. Program Overview
- Title of the training program
- Brief description (2-3 sentences)
- Target audience and prerequisites

2. Learning Objectives
- List 3-5 key learning outcomes
- Align with company's sustainability goals
- Focus on practical, measurable results

3. Training Modules
For each module, provide:
- Module title
- Brief description
- 3-5 key topics to be covered
- Practical exercise or case study example
- Industry-specific application

4. Implementation Guidelines
- Recommended duration for each module
- Delivery method suggestions
- Assessment methods
- Success metrics

IMPORTANT CONSIDERATIONS
- Make content industry-specific to Technology
- Include relevant regulations and standards
- Focus on practical, actionable steps
- Incorporate real-world examples
- Address specific sustainability goals mentioned
- Consider both short-term and long-term impact

Please format the response in clear sections with headers and bullet points for readability.
`;
        const apiKey = process.env.NEXT_APP_GEMINI_API_KEY || "";
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const output = await model.generateContent(prompt);
        const result = output.response.text();

        const savedTraining = await prisma.trainingRequest.create({
            data: {
                companyName,
                industry,
                goals,
                context: context || "",
                trainingOutline: result
            }
        });

        return NextResponse.json({ trainingOutline: savedTraining.trainingOutline });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to generate training' }, { status: 500 });
    }
}