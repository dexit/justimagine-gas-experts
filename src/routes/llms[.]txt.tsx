import { createFileRoute } from "@tanstack/react-router";
import { SERVICES, AREAS, BUSINESS } from "@/data/seo";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const services = SERVICES.map((s) => `- [${s.name}](${BUSINESS.url}/services/${s.slug}): ${s.short}`).join("\n");
        const areas = AREAS.map((a) => `- [${a.name}](${BUSINESS.url}/areas/${a.slug}) — ${a.postcodes.join(", ")}`).join("\n");

        const body = `# ${BUSINESS.name}

> Gas Safe registered heating, boiler and plumbing specialists serving Rugby, Warwickshire and Coventry. Boiler installation, repair, servicing, CP12 landlord gas safety certificates, central heating, power flushing, plumbing and 24/7 emergency callouts.

- Phone: ${BUSINESS.phone}
- Email: ${BUSINESS.email}
- Hours: ${BUSINESS.openingHours} (24/7 emergency)
- Coverage: Rugby, Leamington Spa, Warwick, Kenilworth, Stratford-upon-Avon, Coventry, Nuneaton, Bedworth, Southam, Atherstone, Alcester, Shipston-on-Stour.

## Services
${services}

## Areas
${areas}

## Contact
- [Contact form](${BUSINESS.url}/contact)
- WhatsApp: https://wa.me/${BUSINESS.whatsapp}
`;
        return new Response(body, {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
