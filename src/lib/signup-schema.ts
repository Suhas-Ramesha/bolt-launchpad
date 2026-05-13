import { z } from "zod";

export const earlyAccessFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email")
    .email("Enter a valid email")
    .max(255, "Email is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter your WhatsApp number")
    .max(24, "Number is too long")
    .regex(/^[+]?[\d\s()-]{7,24}$/, "Use digits with optional + and spaces, e.g. +91 98765 43210")
    .refine((s) => s.replace(/\s/g, "").length <= 20, "Phone number is too long"),
});

export type EarlyAccessFormValues = z.infer<typeof earlyAccessFormSchema>;
