import { z } from "zod";

export const EXPENSE_CATEGORIES = [
  "Utilities",
  "Food",
  "Software",
  "Housing",
  "Transport",
  "Entertainment",
  "Health",
  "Other",
] as const;

export const expenseSchema = z.object({
  vendor: z
    .string()
    .describe("The name of the company or store (e.g., AWS, Starbucks, Rent)"),
  amount: z.number().describe("The total final amount charged on the bill"),
  date: z
    .string()
    .describe("The date of the transaction in ISO format (YYYY-MM-DD)"),
  category: z
    .string()
    .describe(
      "The expense category (e.g., Utilities, Food, Software, Housing)",
    ),
  savingsFound: z
    .number()
    .describe(
      "Any discounts, promotions, or potential savings detected on the bill, default to 0 if none",
    ),
});

export type ExpenseScan = z.infer<typeof expenseSchema>;

export type ExtractResponse = { expense: ExpenseScan };
export type ExtractRequest = { image: string };
