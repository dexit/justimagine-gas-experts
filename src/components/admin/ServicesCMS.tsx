import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Save, X, Plus, AlertCircle, CheckCircle2 } from "lucide-react";

interface Service {
  id: string;
  name: string;
  category: string;
  keywords: string;
  description: string;
  cta: string;
  bulletPoints: string[];
  pricing: string;
  areas: string[];
}

const VALIDATION_RULES = {
  name: { min: 5, max: 60, pattern: /^[a-zA-Z0-9\s\-&,'.]+$/ },
  keywords: { min: 10, max: 160, pattern: /^[a-zA-Z0-9,\s\-]+$/ },
  description: { min: 50, max: 500, pattern: /^[a-zA-Z0-9\s\-,'.()&]+$/ },
  cta: { min: 3, max: 50 },
};

export function ServicesCMS() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Service | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load services
    fetch("/api/admin/services", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setServices(data.services || []);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const validateField = (field: string, value: any): string => {
    const rules = VALIDATION_RULES[field as keyof typeof VALIDATION_RULES];
    if (!rules) return "";

    if (typeof value === "string") {
      if (value.length < rules.min)
        return `Min ${rules.min} chars`;
      if (value.length > rules.max)
        return `Max ${rules.max} chars`;
      if (rules.pattern && !rules.pattern.test(value))
        return "Invalid characters";
    }
    return "";
  };

  const handleEdit = (service: Service) => {
    setEditing(service.id);
    setFormData({ ...service });
    setErrors({});
  };

  const handleSave = async () => {
    if (!formData) return;

    const newErrors: Record<string, string> = {};
    Object.keys(VALIDATION_RULES).forEach((field) => {
      const error = validateField(field, formData[field as keyof Service]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch(`/api/admin/services/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setServices(
          services.map((s) => (s.id === formData.id ? formData : s))
        );
        setEditing(null);
        setFormData(null);
      } else {
        console.error("Save failed");
      }
    } catch (err) {
      console.error("Error saving service", err);
    }
  };

  if (loading) return <div>Loading services...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-semibold">Services</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Service
        </Button>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`border rounded-lg p-4 ${
              editing === service.id ? "bg-accent/5 border-accent" : "bg-card border-border"
            }`}
          >
            {editing === service.id && formData ? (
              // Edit mode
              <div className="space-y-3">
                <EditServiceForm
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                />
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex-1">
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditing(null);
                      setFormData(null);
                      setErrors({});
                    }}
                    className="flex-1"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              // View mode
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {service.category}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(service)}
                  >
                    <Edit2 className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {service.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm">
        <AlertCircle className="inline mr-2 h-4 w-4" />
        <strong>Validation:</strong> Ensure all services have complete info. No
        generic copy. Keywords must be unique per service.
      </div>
    </div>
  );
}

function EditServiceForm({
  formData,
  setFormData,
  errors,
}: {
  formData: Service;
  setFormData: (data: Service) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg text-sm"
        />
        {errors.name && (
          <p className="text-xs text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Keywords</label>
        <input
          type="text"
          value={formData.keywords}
          onChange={(e) =>
            setFormData({ ...formData, keywords: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg text-sm"
          placeholder="boiler installation, new gas boiler, boiler replacement"
        />
        {errors.keywords && (
          <p className="text-xs text-red-600 mt-1">{errors.keywords}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg text-sm"
          rows={3}
        />
        {errors.description && (
          <p className="text-xs text-red-600 mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">CTA</label>
        <input
          type="text"
          value={formData.cta}
          onChange={(e) =>
            setFormData({ ...formData, cta: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg text-sm"
          placeholder="Book Installation Today"
        />
      </div>
    </div>
  );
}
