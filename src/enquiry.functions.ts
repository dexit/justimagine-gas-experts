import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  postcode: z.string().trim().max(20).optional().or(z.literal("")),
  service: z.string().trim().max(120).optional().or(z.literal("")),
  area: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((d) => schema.parse(d))
  .handler(async ({ data }) => {
    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
    const smtpUrl = process.env.SMTP_WEBHOOK_URL;
    const targets = [webhookUrl, smtpUrl].filter(Boolean) as string[];

    const payload = {
      source: "justimagine.ltd",
      receivedAt: new Date().toISOString(),
      ...data,
    };

    if (targets.length === 0) {
      console.warn(
        "[enquiry] No ENQUIRY_WEBHOOK_URL/SMTP_WEBHOOK_URL configured. Payload:",
        payload,
      );
      return { ok: true as const, delivered: false };
    }

    const results = await Promise.allSettled(
      targets.map((url) =>
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).then(async (r) => {
          if (!r.ok) throw new Error(`Webhook ${url} ${r.status}`);
          return true;
        }),
      ),
    );

    const ok = results.some((r) => r.status === "fulfilled");
    if (!ok) {
      console.error("[enquiry] All webhooks failed", results);
      return { ok: false as const, error: "Delivery failed. Please call us." };
    }
    return { ok: true as const, delivered: true };
  });
