import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Save, X, Plus, AlertCircle } from "lucide-react";

interface Area {
  id: string;
  name: string;
  description: string;
  postcode: string;
  cta: string;
  coverageZone: string;
  lat: number;
  lng: number;
}

export function AreasCMS() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Area | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load areas
    fetch("/api/admin/areas", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setAreas(data.areas || []);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleEdit = (area: Area) => {
    setEditing(area.id);
    setFormData({ ...area });
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      const res = await fetch(`/api/admin/areas/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setAreas(areas.map((a) => (a.id === formData.id ? formData : a)));
        setEditing(null);
        setFormData(null);
      }
    } catch (err) {
      console.error("Error saving area", err);
    }
  };

  if (loading) return <div>Loading areas...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-semibold">Service Areas</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Area
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {areas.map((area) => (
          <div
            key={area.id}
            className={`border rounded-lg p-4 ${
              editing === area.id ? "bg-accent/5 border-accent" : "bg-card border-border"
            }`}
          >
            {editing === area.id && formData ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Postcode
                  </label>
                  <input
                    type="text"
                    value={formData.postcode}
                    onChange={(e) =>
                      setFormData({ ...formData, postcode: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex-1 text-xs">
                    <Save className="mr-1 h-3 w-3" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditing(null);
                      setFormData(null);
                    }}
                    className="flex-1 text-xs"
                  >
                    <X className="mr-1 h-3 w-3" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{area.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {area.postcode}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(area)}
                  >
                    <Edit2 className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {area.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
        <AlertCircle className="inline mr-2 h-4 w-4" />
        <strong>Areas:</strong> {areas.length} / 9 configured. Each area
        needs unique CTA, postcode range, and service availability.
      </div>
    </div>
  );
}
