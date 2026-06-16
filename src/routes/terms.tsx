import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { BUSINESS } from "@/data/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Just Imagine Ltd — Heating & Gas" },
      { name: "description", content: "Our terms of service outline our commitment to fixed-price quotes, transparent pricing, and 12-month workmanship guarantees on all heating and gas work." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Terms of Service | Just Imagine Ltd" },
      { property: "og:description", content: "Learn our commitment to transparent pricing, fixed quotes, and quality workmanship guarantees." },
    ],
    links: [{ rel: "canonical", href: `${BUSINESS.url}/terms` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Legal" title="Terms of Service" subtitle="The rules of our engagement." />
      <section className="mx-auto max-w-3xl px-5 py-16 space-y-8 text-foreground leading-relaxed">
        <div className="prose prose-slate dark:prose-invert prose-headings:font-display prose-headings:font-semibold">
          <p className="text-base">
            Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h3>
          <p>
            By booking a service with Just Imagine Ltd, you agree to these terms and conditions. If you do not agree, please do not proceed with booking.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">2. Our Services</h3>
          <p>
            We provide Gas Safe registered boiler servicing, repairs, installations, emergency callouts, plumbing, and landlord gas safety certificates (CP12) across Rugby, Coventry, Warwick, Leicester, Northampton, Corby, and Banbury. All engineers are Gas Safe registered and WRAS approved.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">3. Quotes and Pricing</h3>
          <ul>
            <li>All initial quotes are valid for 30 days from the date provided.</li>
            <li>Quotes are based on information provided and an initial site assessment.</li>
            <li>If additional work is discovered during the job, we will discuss and agree on any extra charges before proceeding.</li>
            <li>Our prices are fixed unless material unforeseen complications require additional work.</li>
            <li>VAT is included in all quoted prices unless specified as {"'"}excluding VAT{" '"}.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">4. Booking and Scheduling</h3>
          <ul>
            <li>Appointments can be booked online or by phone.</li>
            <li>We aim to schedule appointments within 7 days for non-emergency work.</li>
            <li>Emergency callouts operate 24/7. Response times may vary depending on location and time of day.</li>
            <li>If you need to reschedule, please provide at least 24 hours notice to avoid cancellation charges.</li>
            <li>Cancellations within 24 hours of the scheduled appointment may incur a fee.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">5. Access and Compliance at Your Property</h3>
          <ul>
            <li>You must provide safe and clear access to the relevant part of the property.</li>
            <li>If anyone in the property is under 16, an adult must be present during the engineer visit.</li>
            <li>All pets (dogs, cats, and other animals) must be secured away during our visit for safety reasons.</li>
            <li>You are responsible for informing us of any hazards or access restrictions in advance.</li>
            <li>If we cannot safely access the work area or if safety concerns prevent work, we reserve the right to reschedule or cancel (charges may apply).</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">6. Payment Terms</h3>
          <ul>
            <li>Payment is due upon completion of work unless alternative arrangements have been agreed in writing.</li>
            <li>We accept card payments, bank transfers, and cash.</li>
            <li>For installations over £1,000, a 50% deposit is required to secure the booking; the balance is due upon completion.</li>
            <li>If payment is not received within 14 days of invoice, we reserve the right to suspend future services or pass the debt to a collection agency.</li>
            <li>Cheques are no longer accepted.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">7. Guarantee and Workmanship</h3>
          <ul>
            <li>All labour and workmanship are guaranteed for 12 months from the date of completion.</li>
            <li>Materials and appliances are covered by the manufacturer{"'"}s warranty (typically 1–10 years depending on the product).</li>
            <li>The guarantee covers defects due to our workmanship, not wear and tear, misuse, or lack of maintenance.</li>
            <li>To maintain the guarantee, boilers must be serviced annually as per manufacturer recommendations.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">8. Safety and Compliance</h3>
          <ul>
            <li>All work is carried out in compliance with Gas Safety Regulations, Building Regulations, and WRAS standards.</li>
            <li>Gas safety certificates (CP12) are issued on the same day and sent digitally to you, your landlord (if applicable), and any tenant.</li>
            <li>We reserve the right to refuse work if we identify safety hazards that cannot be addressed immediately.</li>
            <li>You are responsible for annual boiler servicing to maintain Gas Safe compliance and warranty coverage.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">9. Liability and Limitations</h3>
          <p>
            Just Imagine Ltd{"'"}s liability is limited to the cost of the work or £10,000, whichever is lower, except in cases of death, personal injury, or gross negligence. We are not liable for indirect damages, loss of profit, or business interruption.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">10. Emergency Service Terms</h3>
          <ul>
            <li>Emergency callouts are available 24/7, with a minimum callout fee of £120.</li>
            <li>Out-of-hours charges (6 PM–8 AM and weekends) may apply.</li>
            <li>We diagnose the issue and provide a fixed quote before carrying out repairs.</li>
            <li>If you decide not to proceed with repairs after diagnosis, the callout fee is due.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">11. Landlord Services</h3>
          <ul>
            <li>CP12 gas safety certificates are issued in the names of the landlord, letting agent (if applicable), and tenant.</li>
            <li>Certificates are valid for 12 months from the date of inspection.</li>
            <li>It is your responsibility to ensure annual re-inspection before the certificate expires.</li>
            <li>Portfolio discounts apply for 5 or more annual certificates.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">12. Cancellation and Rescheduling</h3>
          <ul>
            <li>Cancellations more than 48 hours in advance are free.</li>
            <li>Cancellations 24–48 hours in advance incur 50% of the agreed price.</li>
            <li>Cancellations less than 24 hours in advance incur the full agreed price.</li>
            <li>We reserve the right to cancel if access is unsafe or if you breach these terms.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">13. Complaints Procedure</h3>
          <p>
            If you are not satisfied with our work, please contact us within 30 days. We will investigate and work toward a resolution. Full details of our complaints procedure are available at{" "}
            <a href="/complaints" className="underline hover:no-underline">
              /complaints
            </a>
            .
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">14. Photographs and Data</h3>
          <p>
            We may take photographs of work in progress or completed work for quality assurance and portfolio purposes. We will not use images of private interiors without your consent. Job reference numbers and outcome data are retained for service history.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">15. Third-Party Tools and Services</h3>
          <p>
            We use third-party providers for payment processing (Stripe, PayPal) and scheduling (Calendar). Your data is subject to their privacy policies. We are not responsible for their security or conduct.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">16. Changes to Terms</h3>
          <p>
            We reserve the right to update these terms at any time. Changes are effective upon publication. Continued use of our services implies acceptance of revised terms.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">17. Governing Law</h3>
          <p>
            These terms are governed by the laws of England and Wales. Any disputes are subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">18. Contact</h3>
          <p>
            For questions about these terms, contact us at{" "}
            <strong>
              07774 079152 or info@justimagine.ltd
            </strong>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
