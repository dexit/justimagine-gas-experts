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

/** Generate unique lead reference ID: JI-YYYYMMDD-XXXXX (e.g. JI-20260616-A7K9M) */
function generateLeadRefId(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // alphanumeric, no I/O/1/0
  const rand = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `JI-${dateStr}-${rand}`;
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((d) => schema.parse(d))
  .handler(async ({ data }) => {
    const refId = generateLeadRefId();
    
    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
    const smtpUrl = process.env.SMTP_WEBHOOK_URL;
    const edgeFunctionUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}/api/submit` 
      : "http://localhost:5173/api/submit";
      
    const targets = [webhookUrl, smtpUrl, edgeFunctionUrl].filter(Boolean) as string[];

    const payload = {
      refId,
      source: "justimagine.ltd",
      receivedAt: new Date().toISOString(),
      ...data,
    };

    if (targets.length === 0) {
      console.warn(
        "[enquiry] No ENQUIRY_WEBHOOK_URL/SMTP_WEBHOOK_URL configured. Payload:",
        payload,
      );
      return { ok: true as const, delivered: false, refId };
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
      return { ok: false as const, error: "Delivery failed. Please call us.", refId };
    }
    return { ok: true as const, delivered: true, refId };
  });
