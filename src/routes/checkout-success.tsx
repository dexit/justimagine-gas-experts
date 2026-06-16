import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { CheckCircle } from "lucide-react";

export const Route = createFileRoute("/checkout-success")({
  component: CheckoutSuccessPage,
});

function CheckoutSuccessPage() {
  const search = Route.useSearch() as { session_id?: string };
  const sessionId = search.session_id;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <CheckCircle size={64} className="mx-auto text-green-600 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Payment Successful
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your service request has been confirmed and processed.
        </p>

        {sessionId && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Session ID: {sessionId}</p>
            <p className="text-sm text-gray-600 mt-2">
              Confirmation email sent.
            </p>
          </div>
        )}

        <div className="mt-8 space-y-3">
          <p className="text-gray-700">
            You will receive confirmation with next steps.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/services">
              <Button variant="outline">Browse More Services</Button>
            </Link>
            <Link to="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
