import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useServerFn } from "@tanstack/react-start";
import { submitEnquiry } from "@/server/enquiry.functions";
import { toast } from "sonner";

interface Props { defaultService?: string; defaultArea?: string; compact?: boolean; }

export function EnquiryForm({ defaultService = "", defaultArea = "", compact }: Props) {
  const submit = useServerFn(submitEnquiry);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const res = await submit({
        data: {
          name: String(fd.get("name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          email: String(fd.get("email") ?? ""),
          postcode: String(fd.get("postcode") ?? ""),
          service: String(fd.get("service") ?? ""),
          area: String(fd.get("area") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      if (res.ok) {
        toast.success("Enquiry sent — we'll be in touch shortly.");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(res.error || "Could not send. Please call 07774 079152.");
      }
    } catch {
      toast.error("Network error. Please call 07774 079152.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className={`space-y-3 ${compact ? "" : "p-6 lg:p-8 bg-card border border-border rounded-2xl"}`}>
      <div className="grid sm:grid-cols-2 gap-3">
        <input required name="name" placeholder="Your name" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
        <input required name="phone" placeholder="Phone *" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input type="email" name="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
        <input name="postcode" placeholder="Postcode" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="service" defaultValue={defaultService} placeholder="Service needed" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
        <input name="area" defaultValue={defaultArea} placeholder="Town / area" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
      </div>
      <textarea name="message" rows={4} placeholder="Brief description of the job…" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
      <Button type="submit" disabled={loading} size="lg" className="w-full bg-gradient-amber text-accent-foreground hover:opacity-90 font-semibold shadow-amber">
        {loading ? "Sending…" : "Request a callback"}
      </Button>
      <p className="text-[11px] text-muted-foreground text-center">By submitting you agree to be contacted about your enquiry. We never share your details.</p>
    </form>
  );
}
