import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [
            {
                role: "system",
                content:
                "You are a creative meme idea generator. Generate unique, vivid, and humorous meme concepts that are specific and visual. Each concept should be a short phrase describing a funny scenario, often involving unexpected combinations or situations.",
            },
            {
                role: "user",
                content:
                "Generate 5 creative meme scenarios. Each should be specific and visual, similar to these examples:\n- Cat wearing VR headset in space\n- Dog filing taxes with confusion\n- Robot learning to dance salsa\n\nProvide the response as a simple array of strings.",
            },
            ],
            temperature: 0.9,
            max_tokens: 200,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            `OpenAI API error: ${data.error?.message || "Unknown error"}`
        );
    }

    let suggestions: string[];

    if (!data.choices?.[0]?.message?.content) {
        throw new Error("Invalid response format from OpenAI API");
    }

    try {
        suggestions = JSON.parse(data.choices[0].message.content);
    } catch (e) {
      // If parsing fails, split by newlines and clean up
        suggestions = data.choices[0].message.content
            .split("\n")
            .filter(Boolean)
            .map((s: string) => s.replace(/^\d+\.\s*/, "").trim())
            .slice(0, 5);
        }

    return NextResponse.json({ suggestions });
    } catch (error) {
        console.error("Error generating suggestions:", error);
        return NextResponse.json(
        { error: "Failed to generate suggestions" },
        { status: 500 }
        );
    }
}
