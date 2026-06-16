// Geographic area data: 1-hour service radius from Rugby
// Base: Rugby (CV21-23). Extended: Leicester, Northampton, Corby, Coventry, Warwick, Banbury
// For dynamic routes: /boiler-installation-in-rugby, /emergency-in-coventry, etc.

export type AreaSlug =
  | "rugby"
  | "leicester"
  | "northampton"
  | "corby"
  | "coventry"
  | "warwick"
  | "banbury";

export interface Area {
  slug: AreaSlug;
  name: string;
  postcodes: string[];
  distance_from_rugby_miles: number;
  response_time_hours: number;
}

export const AREAS: Area[] = [
  {
    slug: "rugby",
    name: "Rugby",
    postcodes: ["CV21", "CV22", "CV23"],
    distance_from_rugby_miles: 0,
    response_time_hours: 0.25,
  },
  {
    slug: "coventry",
    name: "Coventry",
    postcodes: ["CV1", "CV2", "CV3", "CV4", "CV5", "CV6", "CV7", "CV8"],
    distance_from_rugby_miles: 18,
    response_time_hours: 0.5,
  },
  {
    slug: "warwick",
    name: "Warwick",
    postcodes: ["CV34", "CV35", "CV36", "CV37"],
    distance_from_rugby_miles: 15,
    response_time_hours: 0.5,
  },
  {
    slug: "leicester",
    name: "Leicester",
    postcodes: ["LE1", "LE2", "LE3", "LE4", "LE5"],
    distance_from_rugby_miles: 22,
    response_time_hours: 1,
  },
  {
    slug: "northampton",
    name: "Northampton",
    postcodes: ["NN1", "NN2", "NN3", "NN4", "NN5"],
    distance_from_rugby_miles: 28,
    response_time_hours: 1,
  },
  {
    slug: "corby",
    name: "Corby",
    postcodes: ["NN17", "NN18"],
    distance_from_rugby_miles: 30,
    response_time_hours: 1,
  },
  {
    slug: "banbury",
    name: "Banbury",
    postcodes: ["OX15", "OX16"],
    distance_from_rugby_miles: 25,
    response_time_hours: 0.75,
  },
];

export const getAreaBySlug = (slug: AreaSlug): Area | undefined => 
  AREAS.find(a => a.slug === slug);

export const getAreaByPostcode = (postcode: string): Area | undefined =>
  AREAS.find(a => a.postcodes.some(pc => postcode.startsWith(pc)));
