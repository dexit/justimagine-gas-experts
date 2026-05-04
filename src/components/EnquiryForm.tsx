import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useServerFn } from "@tanstack/react-start";
import { submitEnquiry } from "@/enquiry.functions";
import { toast } from "sonner";
import { CheckCircle2, AlertCircle } from "lucide-react";

/* ------------ Validation schema (mirrors server-side) ------------ */
const ukPhone = /^(?:(?:\+44\s?|0)(?:\d\s?){9,10})$/;
const ukPostcode = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Too long")
    .regex(/^[A-Za-z][A-Za-z\s\-'.]+$/, "Letters, spaces and hyphens only"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid UK phone number")
    .regex(ukPhone, "Use a UK number, e.g. 07774 079152"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(120)
    .or(z.literal("")),
  postcode: z
    .string()
    .trim()
    .max(10)
    .refine((v) => v === "" || ukPostcode.test(v), "Enter a valid UK postcode")
    .or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  area: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  /** Honeypot — bots fill it, humans don't see it. */
  website: z.string().max(0, "").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

/* ------------ Input masks ------------ */
function maskUkPhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+44")) {
    const rest = digits.slice(3).replace(/\D/g, "").slice(0, 10);
    return `+44 ${rest.slice(0, 4)}${rest.length > 4 ? " " + rest.slice(4) : ""}`.trim();
  }
  const d = digits.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)} ${d.slice(5)}`;
}
function maskPostcode(raw: string): string {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
  if (cleaned.length <= 4) return cleaned;
  return `${cleaned.slice(0, cleaned.length - 3)} ${cleaned.slice(-3)}`;
}

interface Props {
  defaultService?: string;
  defaultArea?: string;
  compact?: boolean;
}

export function EnquiryForm({ defaultService = "", defaultArea = "", compact }: Props) {
  const submit = useServerFn(submitEnquiry);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      postcode: "",
      service: defaultService,
      area: defaultArea,
      message: "",
      website: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    if (values.website) return; // honeypot tripped
    try {
      const res = await submit({
        data: {
          name: values.name,
          phone: values.phone,
          email: values.email ?? "",
          postcode: values.postcode ?? "",
          service: values.service ?? "",
          area: values.area ?? "",
          message: values.message ?? "",
        },
      });
      if (res.ok) {
        toast.success("Enquiry sent — we'll be in touch shortly.");
        setDone(true);
        reset();
      } else {
        toast.error(res.error || "Could not send. Please call 07774 079152.");
      }
    } catch {
      toast.error("Network error. Please call 07774 079152.");
    }
  });

  if (done) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`text-center ${compact ? "" : "p-8 lg:p-10 bg-card border border-border rounded-2xl"}`}
      >
        <CheckCircle2 className="h-10 w-10 text-accent mx-auto mb-3" aria-hidden="true" />
        <h3 className="font-display text-xl font-semibold mb-2">Thanks — message received.</h3>
        <p className="text-sm text-muted-foreground mb-5">
          We'll be in touch within 30 minutes during working hours, or first thing tomorrow.
        </p>
        <Button variant="outline" onClick={() => setDone(false)}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  const fieldClass = (hasError?: boolean) =>
    `w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground/70 ` +
    `focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring ` +
    (hasError ? "border-destructive ring-1 ring-destructive/40" : "border-border");

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Enquiry form"
      className={`space-y-3 ${compact ? "" : "p-6 lg:p-8 bg-card border border-border rounded-2xl"}`}
    >
      {/* Honeypot — hidden from users + assistive tech */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Your name" error={errors.name?.message} touched={touchedFields.name}>
          <input
            {...register("name")}
            autoComplete="name"
            placeholder="e.g. Sarah Lee"
            aria-invalid={!!errors.name}
            className={fieldClass(!!errors.name)}
          />
        </Field>
        <Field label="Phone (required)" error={errors.phone?.message} touched={touchedFields.phone}>
          <input
            {...register("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="07774 079152"
            aria-invalid={!!errors.phone}
            onChange={(e) =>
              setValue("phone", maskUkPhone(e.target.value), { shouldValidate: true })
            }
            className={fieldClass(!!errors.phone)}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Email (optional)" error={errors.email?.message} touched={touchedFields.email}>
          <input
            {...register("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            className={fieldClass(!!errors.email)}
          />
        </Field>
        <Field label="Postcode" error={errors.postcode?.message} touched={touchedFields.postcode}>
          <input
            {...register("postcode")}
            autoComplete="postal-code"
            placeholder="CV21 2AB"
            aria-invalid={!!errors.postcode}
            onChange={(e) =>
              setValue("postcode", maskPostcode(e.target.value), { shouldValidate: true })
            }
            className={fieldClass(!!errors.postcode)}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Service needed">
          <input
            {...register("service")}
            placeholder="e.g. Boiler service"
            className={fieldClass(false)}
          />
        </Field>
        <Field label="Town / area">
          <input
            {...register("area")}
            placeholder="e.g. Rugby"
            className={fieldClass(false)}
          />
        </Field>
      </div>

      <Field label="Brief description" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us what's happening (optional)…"
          className={`${fieldClass(!!errors.message)} resize-none`}
        />
      </Field>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full bg-gradient-amber text-accent-foreground hover:opacity-90 font-semibold shadow-amber"
      >
        {isSubmitting ? "Sending…" : "Request a callback"}
      </Button>
      <p className="text-[11px] text-muted-foreground text-center">
        By submitting you agree to be contacted about your enquiry. We never share your details.
      </p>
    </form>
  );
}

function Field({
  label,
  children,
  error,
  touched,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  touched?: boolean;
}) {
  return (
    <label className="block text-left">
      <span className="sr-only">{label}</span>
      {children}
      {error && touched && (
        <span
          role="alert"
          className="mt-1 inline-flex items-center gap-1 text-xs text-destructive"
        >
          <AlertCircle className="h-3 w-3" /> {error}
        </span>
      )}
    </label>
  );
}
