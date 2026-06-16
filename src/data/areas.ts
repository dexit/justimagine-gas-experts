// Geographic area data for dynamic service page routes
// Used: /boiler-installation-in-rugby, /emergency-in-coventry, etc.

export type AreaSlug =
  | "rugby"
  | "coventry"
  | "warwickshire"
  | "leicestershire"
  | "northamptonshire"
  | "birmingham"
  | "nuneaton"
  | "bedworth"
  | "kenilworth";

export interface Area {
  slug: AreaSlug;
  name: string;
  region: string;
  coverageDesc: string;
  postcodes?: string[];
  coordinates?: { lat: number; lng: number };
}

export const AREAS: Area[] = [
  {
    slug: "rugby",
    name: "Rugby",
    region: "Warwickshire",
    coverageDesc:
      "We're based in Rugby and cover the entire town and surrounding areas. Same-day or next-day appointments available.",
    postcodes: ["CV21", "CV22", "CV23"],
    coordinates: { lat: 52.3753, lng: -1.2703 },
  },
  {
    slug: "coventry",
    name: "Coventry",
    region: "Warwickshire",
    coverageDesc:
      "Fast response times across Coventry. Emergency callouts available 24/7. Coverage includes all postcodes from CV1–CV7.",
    postcodes: ["CV1", "CV2", "CV3", "CV4", "CV5", "CV6", "CV7"],
    coordinates: { lat: 52.408, lng: -1.5045 },
  },
  {
    slug: "warwickshire",
    name: "Warwickshire",
    region: "Warwickshire",
    coverageDesc:
      "Serving towns across Warwickshire including Leamington Spa, Stratford-upon-Avon, and Alcester. Quick response times throughout the county.",
    postcodes: ["CV", "B49", "B50"],
  },
  {
    slug: "leicestershire",
    name: "Leicestershire",
    region: "Leicestershire",
    coverageDesc: "Extended coverage into Leicestershire including Leicester, Hinckley, and Market Harborough.",
    postcodes: ["LE"],
  },
  {
    slug: "northamptonshire",
    name: "Northamptonshire",
    region: "Northamptonshire",
    coverageDesc:
      "We serve Northamptonshire including Northampton, Kettering, and Wellingborough with reliable gas and plumbing services.",
    postcodes: ["NN"],
  },
  {
    slug: "birmingham",
    name: "Birmingham",
    region: "West Midlands",
    coverageDesc: "Coverage extends to parts of Birmingham and the surrounding West Midlands area.",
    postcodes: ["B1", "B2", "B3", "B4", "B5"],
  },
  {
    slug: "nuneaton",
    name: "Nuneaton",
    region: "Warwickshire",
    coverageDesc: "Fast response across Nuneaton and Bedworth. Same-day appointments often available.",
    postcodes: ["CV10", "CV11", "CV12"],
  },
  {
    slug: "bedworth",
    name: "Bedworth",
    region: "Warwickshire",
    coverageDesc: "We cover Bedworth and the surrounding area with reliable heating and plumbing solutions.",
    postcodes: ["CV12"],
  },
  {
    slug: "kenilworth",
    name: "Kenilworth",
    region: "Warwickshire",
    coverageDesc: "Serving Kenilworth and nearby towns in central Warwickshire with Gas Safe certified engineers.",
    postcodes: ["CV8"],
  },
];

export const getAreaBySlug = (slug: AreaSlug): Area | undefined => AREAS.find((a) => a.slug === slug);
export const getAreaByPostcode = (postcode: string): Area | undefined =>
  AREAS.find((a) => a.postcodes?.some((pc) => postcode.startsWith(pc)));
