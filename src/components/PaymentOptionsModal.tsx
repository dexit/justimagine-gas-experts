import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText, Loader2, X } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { createPaymentSession, createInvoice } from "@/app/actions/stripe";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface PaymentOptionsModalProps {
  refId: string;
  serviceName: string;
  totalPounds: number;
  email: string;
  name: string;
  onClose: () => void;
}

export function PaymentOptionsModal({
  refId,
  serviceName,
  totalPounds,
  email,
  name,
  onClose,
}: PaymentOptionsModalProps) {
  const [step, setStep] = useState<"options" | "checkout" | "invoice">(
    "options"
  );
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // CC payment with 5% surcharge
  const surchargePercent = 0.05;
  const basePounds = totalPounds;
  const surcharge = basePounds * surchargePercent;
  const totalWithSurcharge = basePounds + surcharge;

  const handlePayNow = async () => {
    try {
      setLoading(true);
      setError(null);

      const session = await createPaymentSession({
        refId,
        email,
        name,
        service: serviceName,
        baseAmountPounds: basePounds,
        surchargePercent,
      });

      if (!session.client_secret) {
        throw new Error("No client secret returned");
      }

      setClientSecret(session.client_secret);
      setStep("checkout");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Payment setup failed"
      );
      setLoading(false);
    }
  };

  const handleGetInvoice = async () => {
    try {
      setLoading(true);
      setError(null);

      const invoice = await createInvoice({
        refId,
        email,
        name,
        service: serviceName,
        amountPounds: basePounds,
      });

      if (invoice.url) {
        window.open(invoice.url, "_blank");
      }

      setStep("invoice");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invoice generation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Checkout UI
  if (step === "checkout" && clientSecret) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
            <h2 className="font-semibold">Payment</h2>
            <button
              onClick={() => setStep("options")}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      </div>
    );
  }

  // Invoice success UI
  if (step === "invoice") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Invoice Created</h2>
          <p className="text-gray-600 mb-6">
            Invoice sent to {email}. Download link opened in new tab.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <p className="text-sm text-gray-600">Ref ID: {refId}</p>
            <p className="text-sm text-gray-600">Amount: £{basePounds.toFixed(2)}</p>
          </div>
          <Button onClick={onClose} className="w-full">
            Done
          </Button>
        </div>
      </div>
    );
  }

  // Options UI
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Choose Payment Method</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg mb-8 border border-blue-200">
          <p className="text-sm text-gray-600">Enquiry Reference</p>
          <p className="font-mono font-semibold text-lg">{refId}</p>
          <p className="text-sm text-gray-600 mt-2">Service: {serviceName}</p>
          <p className="text-sm text-gray-600">Base Amount: £{basePounds.toFixed(2)}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pay Now - CC */}
          <button
            onClick={handlePayNow}
            disabled={loading}
            className="border-2 border-gray-200 hover:border-blue-500 rounded-lg p-6 text-left transition-all hover:shadow-lg disabled:opacity-50"
          >
            <CreditCard className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Pay Now (Card)</h3>
            <p className="text-sm text-gray-600 mb-4">
              Instant payment with debit/credit card
            </p>
            <div className="bg-yellow-50 p-3 rounded mb-4 border border-yellow-200">
              <p className="text-xs text-gray-600">Processing fee (+5%)</p>
              <p className="text-sm font-semibold text-yellow-700">
                £{surcharge.toFixed(2)}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded">
              <p className="text-xs text-gray-600">Total with fee:</p>
              <p className="text-lg font-bold text-blue-700">
                £{totalWithSurcharge.toFixed(2)}
              </p>
            </div>
            {loading && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Setting up...</span>
              </div>
            )}
          </button>

          {/* Get Invoice - Manual */}
          <button
            onClick={handleGetInvoice}
            disabled={loading}
            className="border-2 border-gray-200 hover:border-green-500 rounded-lg p-6 text-left transition-all hover:shadow-lg disabled:opacity-50"
          >
            <FileText className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Get Invoice</h3>
            <p className="text-sm text-gray-600 mb-4">
              Pay by bank transfer (no extra fees)
            </p>
            <div className="bg-gray-50 p-3 rounded mb-4">
              <p className="text-xs text-gray-600">Invoice amount:</p>
              <p className="text-sm font-semibold">£{basePounds.toFixed(2)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded">
              <p className="text-xs text-gray-600">Payment method:</p>
              <p className="text-sm font-semibold text-green-700">
                Bank Transfer
              </p>
            </div>
            {loading && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Generating...</span>
              </div>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Both methods are secure. Choose what works best for you.
        </p>
      </div>
    </div>
  );
}
