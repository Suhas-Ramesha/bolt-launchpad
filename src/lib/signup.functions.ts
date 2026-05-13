import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { earlyAccessFormSchema } from "@/lib/signup-schema";

export const submitEarlyAccess = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => earlyAccessFormSchema.parse(data))
  .handler(async ({ data }) => {
    const userAgent = getRequestHeader("user-agent") ?? null;

    const { error } = await supabaseAdmin.from("early_access_signups").insert({
      email: data.email.trim().toLowerCase(),
      phone: data.phone.replace(/\s+/g, ""),
      user_agent: userAgent,
    });

    if (error) {
      if (error.code === "23505") {
        return { ok: true as const, duplicate: true };
      }
      console.error("Early access signup failed", error);
      throw new Error("Could not save your details. Please try again.");
    }

    return { ok: true as const, duplicate: false };
  });
