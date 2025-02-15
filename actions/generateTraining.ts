import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateTraining() {
    const apiKey = process.env.NEXT_APP_GEMINI_API_KEY || "";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Create a comprehensive sustainability training program for Empacto, operating in the Technology industry.
    
CONTEXT
Company Goals: Reduce carbon footprint by 30% by 2026.

Additional Context: Currently implementing remote work policies.

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

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}