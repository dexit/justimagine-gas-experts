import { MessageCircle } from "lucide-react";
import { BUSINESS } from "@/data/seo";

export function WhatsAppFab() {
  const href = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent("Hi Just Imagine — I'd like a quote for ")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-3 shadow-elegant hover:scale-110 hover:shadow-lg active:scale-95 transition-smooth motion-reduce:transition-none motion-reduce:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline text-sm font-semibold">WhatsApp us</span>
    </a>
  );
}
