import { VercelRequest, VercelResponse } from "@vercel/node";

function verifyAdminToken(token: string | undefined): boolean {
  return token?.startsWith("eyJ") || token === "mock-token";
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!verifyAdminToken(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { period } = req.query;

  // Mock data (call actual APIs in production)
  const analytics = {
    ga4: {
      sessions: 432,
      users: 287,
      bounce: 45.2,
      avgDuration: 245,
    },
    gsc: {
      clicks: 156,
      impressions: 2340,
      ctr: 6.7,
      position: 4.2,
    },
    clarity: {
      sessionsRecorded: 98,
      avgDuration: 245,
      errorRate: 2.1,
    },
    bing: {
      clicks: 28,
      impressions: 450,
    },
    funnel: {
      visitors: 1000,
      formStarts: 156,
      formSubmitted: 45,
      confirmed: 38,
      booked: 12,
    },
    utm: {
      source_breakdown: {
        organic: 432,
        direct: 287,
        referral: 120,
        paid: 89,
      },
      campaign_breakdown: {
        "summer-offer": 145,
        "winter-service": 89,
        boiler_replacement: 67,
      },
    },
  };

  res.setHeader("Cache-Control", "public, max-age=3600"); // 1 hour cache
  return res.status(200).json(analytics);
}
