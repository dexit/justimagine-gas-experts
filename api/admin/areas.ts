import { VercelRequest, VercelResponse } from "@vercel/node";

function verifyAdminToken(token: string | undefined): boolean {
  return token?.startsWith("eyJ") || token === "mock-token";
}

// Mock areas data (replace with D1 query)
const AREAS_DB = [
  {
    id: "rugby",
    name: "Rugby",
    description: "Coverage from Rugby town center to surrounding villages",
    postcode: "CV21-CV23",
    cta: "Get Rugby Quote",
    coverageZone: "Central",
    lat: 52.3667,
    lng: -1.2667,
  },
  {
    id: "coventry",
    name: "Coventry",
    description: "Full city coverage and surrounding areas",
    postcode: "CV1-CV6",
    cta: "Get Coventry Quote",
    coverageZone: "Central",
    lat: 52.4082,
    lng: -1.5141,
  },
];

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!verifyAdminToken(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    return res.status(200).json({ areas: AREAS_DB });
  }

  if (req.method === "PUT") {
    const { id } = req.query;
    const updates = req.body;

    const index = AREAS_DB.findIndex((a) => a.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Area not found" });
    }

    AREAS_DB[index] = { ...AREAS_DB[index], ...updates };
    return res.status(200).json(AREAS_DB[index]);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
