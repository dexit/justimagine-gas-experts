import { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const data = await req.json();

    // 1. HubSpot Submission
    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formGuid = process.env.HUBSPOT_FORM_GUID;
    
    let hubspotResult = { success: false, status: "skipped" };
    if (portalId && formGuid) {
      const hsUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;
      const hsPayload = {
        fields: [
          { name: "firstname", value: data.name },
          { name: "email", value: data.email },
          { name: "phone", value: data.phone },
          { name: "message", value: data.message },
          { name: "postcode", value: data.postcode },
          { name: "service", value: data.service },
          { name: "area", value: data.area }
        ],
        context: {
          pageUri: "https://justimagine.ltd",
          pageName: "Just Imagine Gas Experts Enquiry"
        }
      };

      const hsRes = await fetch(hsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hsPayload),
      });
      hubspotResult = { success: hsRes.ok, status: hsRes.status.toString() };
    }

    // 2. Cloudflare Worker / REST API Submission
    const cfUrl = process.env.CLOUDFLARE_WORKER_URL;
    let cfResult = { success: false, status: "skipped" };
    if (cfUrl) {
      const cfRes = await fetch(cfUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.CF_API_TOKEN || ""}`
        },
        body: JSON.stringify({
          source: "justimagine-vercel-edge",
          timestamp: new Date().toISOString(),
          ...data
        }),
      });
      cfResult = { success: cfRes.ok, status: cfRes.status.toString() };
    }

    return new Response(JSON.stringify({
      ok: true,
      hubspot: hubspotResult,
      cloudflare: cfResult
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({
      ok: false,
      error: error instanceof Error ? error.message : "Submission failed"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
