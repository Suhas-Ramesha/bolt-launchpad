import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const listLeadsInput = z.object({
  adminSecret: z.string().min(1),
});

function adminSecretValid(provided: string, expected: string | undefined): boolean {
  if (!expected || provided.length !== expected.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < provided.length; i += 1) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export const listEarlyAccessLeads = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => listLeadsInput.parse(data))
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_DASHBOARD_SECRET;
    if (!adminSecretValid(data.adminSecret, expected)) {
      throw new Error("Invalid access. Check your dashboard secret.");
    }

    const { data: rows, error } = await supabaseAdmin
      .from("early_access_signups")
      .select("id, email, phone, created_at, user_agent")
      .order("created_at", { ascending: false })
      .limit(2000);

    if (error) {
      console.error("listEarlyAccessLeads", error);
      throw new Error("Could not load signups.");
    }

    return { leads: rows ?? [] };
  });
