import { createOpenAI } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { NextResponse } from "next/server";
import {
  type ExtractRequest,
  type ExtractResponse,
  expenseSchema,
} from "@/app/analyze/schema";

const MODEL_ID = "gpt-4o-mini";

function requireApiKey(): string {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY is not set");
  return key;
}

const PROMPT = [
  "Extract the following fields from the billing document in the image:",
  "- vendor: company or store name",
  "- amount: total final amount charged",
  "- date: transaction date in ISO YYYY-MM-DD",
  "- category: expense category (Utilities, Food, Software, Housing, etc.)",
  "- savingsFound: discounts/promotions detected, 0 if none",
].join("\n");

export async function POST(request: Request): Promise<Response> {
  const openai = createOpenAI({ apiKey: requireApiKey() });

  const body = (await request.json()) as ExtractRequest;
  if (!body.image?.startsWith("data:image/")) {
    return NextResponse.json(
      { error: "Invalid image payload" },
      { status: 400 },
    );
  }

  try {
    const { output } = await generateText({
      model: openai(MODEL_ID),
      output: Output.object({ schema: expenseSchema }),
      messages: [
        {
          role: "user",
          content: [
            { type: "file", mediaType: "image", data: body.image },
            { type: "text", text: PROMPT },
          ],
        },
      ],
    });

    return NextResponse.json({ expense: output } satisfies ExtractResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
