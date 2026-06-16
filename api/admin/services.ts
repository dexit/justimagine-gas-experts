import { VercelRequest, VercelResponse } from "@vercel/node";

function verifyAdminToken(token: string | undefined): boolean {
  return token?.startsWith("eyJ") || token === "mock-token";
}

// Mock service data (replace with D1 query in production)
const SERVICES_DB = [
  {
    id: "boiler-installation",
    name: "Boiler Installation",
    category: "Installation",
    keywords: "new boiler installation, gas boiler replacement, Worcester boiler",
    description:
      "Professional boiler installation service. We install Worcester, Ideal, Vaillant, and Baxi boilers. All work guaranteed.",
    cta: "Get Installation Quote",
    bulletPoints: [
      "Same-day quotes available",
      "10-year warranty on parts",
      "All brands supplied",
      "Professional fitting",
    ],
    pricing: "From £1,500",
    areas: ["Rugby", "Coventry", "Warwickshire"],
  },
  {
    id: "boiler-servicing",
    name: "Boiler Servicing",
    category: "Servicing",
    keywords: "annual boiler service, gas safety check, boiler maintenance",
    description:
      "Annual boiler servicing & gas safety checks. Keep your heating efficient and safe.",
    cta: "Book Service",
    bulletPoints: [
      "Full system check",
      "Gas safety certificate included",
      "Annual reminder service",
      "Emergency support line",
    ],
    pricing: "£120-150",
    areas: ["Rugby", "Coventry", "Warwickshire"],
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
    // Get all services
    return res.status(200).json({ services: SERVICES_DB });
  }

  if (req.method === "PUT") {
    // Update service
    const { id } = req.query;
    const updates = req.body;

    const index = SERVICES_DB.findIndex((s) => s.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Validate updates
    if (updates.keywords && updates.keywords.length > 160) {
      return res.status(400).json({ error: "Keywords too long" });
    }

    SERVICES_DB[index] = { ...SERVICES_DB[index], ...updates };
    return res.status(200).json(SERVICES_DB[index]);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
