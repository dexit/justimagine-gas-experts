import { createFileRoute } from "@tanstack/react-router";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { getServiceBySlug } from "@/lib/services";

export const Route = createFileRoute("/service-request")({
  component: ServiceRequestPage,
});

function ServiceRequestPage() {
  // Get service from search params or use default
  const search = Route.useSearch() as { service?: string; area?: string };
  const serviceSlug = search.service || "boiler-repairs";
  const area = search.area || "Rugby";

  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Service not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <ServiceRequestForm
        serviceSlug={serviceSlug}
        serviceName={service.name}
        area={area}
      />
    </div>
  );
}
