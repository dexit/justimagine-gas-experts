import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useServerFn } from "@tanstack/react-start";
import { submitEnquiry } from "@/enquiry.functions";
import { toast } from "sonner";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { maskUkPhone, maskPostcode, formatDateInput, formatTimeInput, isValidUkPostcode } from "@/lib/input-masks";
import { lookupPostcode, createPostcodeLookupDebounced } from "@/lib/postcode-lookup";

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
  preferredDate: z.string().refine((v) => !v || new Date(v) > new Date(), "Pick a future date").optional().or(z.literal("")),
  preferredTime: z.string().max(20).optional().or(z.literal("")),
  underageConsent: z.boolean(),
  animalConsent: z.boolean(),
  /** Honeypot — bots fill it, humans don't see it. */
  website: z.string().max(0, "").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  defaultService?: string;
  defaultArea?: string;
  compact?: boolean;
}

export function EnquiryForm({ defaultService = "", defaultArea = "", compact }: Props) {
  const submit = useServerFn(submitEnquiry);
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  
  // Initialize postcode lookup with debounce
  const [postcodeLookup] = useState(() => createPostcodeLookupDebounced(800));

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, touchedFields },
    watch,
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
      preferredDate: "",
      preferredTime: "",
      underageConsent: false,
      animalConsent: false,
      website: "",
    },
  });

  const postcode = watch("postcode");

  // Postcode reverse-lookup for address autofill
  useEffect(() => {
    if (!postcode || postcode.length < 6) {
      setLookupLoading(false);
      return;
    }

    if (!isValidUkPostcode(postcode)) {
      setLookupLoading(false);
      return;
    }

    setLookupLoading(true);
    postcodeLookup.lookup(postcode).then((addr) => {
      if (addr) {
        // Auto-populate area with town/suburb if empty
        if (!watch("area") && (addr.town || addr.suburb)) {
          setValue("area", addr.town || addr.suburb || "", { shouldValidate: false });
        }
      }
      setLookupLoading(false);
    });

    return () => postcodeLookup.cancel();
  }, [postcode, postcodeLookup, setValue, watch]);

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
          preferredDate: values.preferredDate ?? "",
          preferredTime: values.preferredTime ?? "",
          underageConsent: values.underageConsent || false,
          animalConsent: values.animalConsent || false,
        },
      });
      if (res.ok) {
        toast.success("Enquiry sent — we'll be in touch shortly.");
        // Redirect to confirmation page with ref ID
        await navigate({ to: `/confirmation/${res.refId}` });
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
        className={`text-center animate-in fade-in-0 zoom-in-95 ${compact ? "" : "p-8 lg:p-10 bg-accent/8 border border-accent/30 rounded-2xl"}`}
      >
        <div className="mb-4 flex justify-center">
          <CheckCircle2 className="h-12 w-12 text-accent animate-in scale-in-95 duration-300" aria-hidden="true" />
        </div>
        <h3 className="font-display text-xl font-semibold mb-2 text-foreground">Redirecting to confirmation...</h3>
        <p className="text-sm text-muted-foreground">You'll see your reference number momentarily.</p>
      </div>
    );
  }

  const fieldClass = (hasError?: boolean, touched?: boolean) =>
    `w-full px-4 py-3 rounded-lg border transition-all ` +
    `bg-background text-foreground placeholder:text-muted-foreground/60 ` +
    `focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background ` +
    (hasError && touched
      ? "border-destructive/80 bg-destructive/5 focus:ring-destructive focus:border-destructive"
      : touched && !hasError
        ? "border-accent/60 bg-accent/5 focus:ring-accent focus:border-accent"
        : "border-border focus:ring-ring focus:border-ring");

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
            className={fieldClass(!!errors.name, touchedFields.name)}
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
            className={fieldClass(!!errors.phone, touchedFields.phone)}
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
            className={fieldClass(!!errors.email, touchedFields.email)}
          />
        </Field>
        <Field 
          label={
            <div className="flex items-center gap-2">
              <span>Postcode</span>
              {lookupLoading && <Loader2 className="h-4 w-4 animate-spin text-accent" />}
            </div>
          } 
          error={errors.postcode?.message} 
          touched={touchedFields.postcode}
        >
          <input
            {...register("postcode")}
            autoComplete="postal-code"
            placeholder="CV21 2AB"
            aria-invalid={!!errors.postcode}
            onChange={(e) =>
              setValue("postcode", maskPostcode(e.target.value), { shouldValidate: true })
            }
            className={fieldClass(!!errors.postcode, touchedFields.postcode)}
            disabled={isSubmitting}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Service needed" touched={touchedFields.service}>
          <input
            {...register("service")}
            placeholder="e.g. Boiler service"
            className={fieldClass(false, touchedFields.service)}
          />
        </Field>
        <Field label="Town / area" touched={touchedFields.area}>
          <input
            {...register("area")}
            placeholder="e.g. Rugby"
            className={fieldClass(false, touchedFields.area)}
          />
        </Field>
      </div>

      <Field label="Brief description" error={errors.message?.message} touched={touchedFields.message}>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us what's happening (optional)…"
          className={`${fieldClass(!!errors.message, touchedFields.message)} resize-none`}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Preferred date (optional)" touched={touchedFields.preferredDate}>
          <input
            {...register("preferredDate")}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className={fieldClass(!!errors.preferredDate, touchedFields.preferredDate)}
          />
        </Field>
        <Field label="Preferred time (optional)" touched={touchedFields.preferredTime}>
          <input
            {...register("preferredTime")}
            type="time"
            placeholder="e.g. 14:30"
            onChange={(e) => {
              const formatted = formatTimeInput(e.target.value);
              setValue("preferredTime", formatted, { shouldValidate: true });
            }}
            className={fieldClass(!!errors.preferredTime, touchedFields.preferredTime)}
          />
        </Field>
      </div>

      <div className="space-y-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-sm text-foreground">Before your visit</h4>
        <div className="space-y-2">
          <label className="flex items-start gap-3 text-sm cursor-pointer">
            <input
              type="checkbox"
              {...register("underageConsent")}
              className="mt-0.5 h-4 w-4 rounded border-border"
            />
            <span className="text-muted-foreground">
              If anyone in the property is under 16, an adult must be present during the visit.
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm cursor-pointer">
            <input
              type="checkbox"
              {...register("animalConsent")}
              className="mt-0.5 h-4 w-4 rounded border-border"
            />
            <span className="text-muted-foreground">
              All dogs, cats and other pets must be secured away while we work.
            </span>
          </label>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full bg-gradient-amber text-accent-foreground hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed font-semibold shadow-amber transition-all duration-200"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Sending…
          </span>
        ) : (
          "Request a callback"
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center leading-relaxed">
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
      <span className="block text-sm font-medium text-foreground mb-1.5">{label}</span>
      {children}
      {error && touched && (
        <span
          role="alert"
          className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-destructive font-medium animate-in fade-in-0 slide-in-from-top-1"
        >
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" /> {error}
        </span>
      )}
    </label>
  );
}
