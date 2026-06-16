import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/stripe";
import { getProductByServiceSlug } from "@/lib/products";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface Extra {
  id: string;
  label: string;
  priceInCents: number;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  extras: Extra[];
  extraLabel: string;
  extraPrice: string;
}

interface ServiceRequestFormProps {
  serviceSlug: string;
  serviceName: string;
  area: string;
}

export function ServiceRequestForm({
  serviceSlug,
  serviceName,
  area,
}: ServiceRequestFormProps) {
  const product = getProductByServiceSlug(serviceSlug);
  const [state, setState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    extras: [],
    extraLabel: "",
    extraPrice: "",
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!product) return <div className="text-red-600">Service not found</div>;

  const addExtra = () => {
    if (!state.extraLabel.trim() || !state.extraPrice.trim()) {
      setError("Extra label and price required");
      return;
    }

    const price = parseFloat(state.extraPrice);
    if (isNaN(price) || price <= 0) {
      setError("Invalid price");
      return;
    }

    setState((s) => ({
      ...s,
      extras: [
        ...s.extras,
        {
          id: Date.now().toString(),
          label: s.extraLabel,
          priceInCents: Math.round(price * 100),
        },
      ],
      extraLabel: "",
      extraPrice: "",
    }));
    setError(null);
  };

  const rmExtra = (id: string) => {
    setState((s) => ({
      ...s,
      extras: s.extras.filter((e) => e.id !== id),
    }));
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);

      const session = await createCheckoutSession({
        productId: product.id,
        serviceSlug,
        customerEmail: state.email,
        customerName: state.name,
        area,
        extras: state.extras,
      });

      if (!session.client_secret)
        throw new Error("No client secret returned");

      setClientSecret(session.client_secret);
      setShowCheckout(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Checkout creation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const basePriceCents = product.priceInCents;
  const extrasTotalCents = state.extras.reduce((s, e) => s + e.priceInCents, 0);
  const totalCents = basePriceCents + extrasTotalCents;
  const totalPounds = (totalCents / 100).toFixed(2);

  if (showCheckout && clientSecret) {
    return (
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Service Request: {serviceName}</h2>
      <p className="text-gray-600 mb-4">Area: {area}</p>

      {/* Customer Info */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            type="text"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            placeholder="Full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <Input
            type="tel"
            value={state.phone}
            onChange={(e) => setState({ ...state, phone: e.target.value })}
            placeholder="07XXX XXXXXX"
          />
        </div>
      </div>

      {/* Base Service Price */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <span className="font-medium">Service: {serviceName}</span>
          <span className="font-bold">
            £{(basePriceCents / 100).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Extras Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Extras (Optional)</h3>

        {state.extras.length > 0 && (
          <div className="space-y-2 mb-4">
            {state.extras.map((extra) => (
              <div
                key={extra.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded"
              >
                <span>{extra.label}</span>
                <div className="flex items-center gap-3">
                  <span className="font-medium">
                    £{(extra.priceInCents / 100).toFixed(2)}
                  </span>
                  <button
                    onClick={() => rmExtra(extra.id)}
                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 mb-3">
          <Input
            type="text"
            value={state.extraLabel}
            onChange={(e) => setState({ ...state, extraLabel: e.target.value })}
            placeholder="Extra description (e.g., Power flush)"
          />
          <Input
            type="number"
            value={state.extraPrice}
            onChange={(e) => setState({ ...state, extraPrice: e.target.value })}
            placeholder="Price (£)"
            step="0.01"
            min="0"
          />
          <Button
            onClick={addExtra}
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
          >
            <Plus size={18} className="mr-1" />
            Add Extra
          </Button>
        </div>
      </div>

      {/* Total */}
      <div className="bg-green-50 p-4 rounded-lg mb-6 border-2 border-green-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Total</span>
          <span className="text-2xl font-bold text-green-700">
            £{totalPounds}
          </span>
        </div>
      </div>

      {/* Error */}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* CTA */}
      <Button
        onClick={handleCheckout}
        disabled={!state.name || !state.email || !state.phone || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          `Proceed to Payment (£${totalPounds})`
        )}
      </Button>
    </div>
  );
}
