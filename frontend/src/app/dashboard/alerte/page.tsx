"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Flame, Droplets, Leaf } from "lucide-react";
import { useUser } from "@stackframe/stack";

interface Alert {
  id: string;
  type: string;
  severity: string;
  message: string;
  sector: string;
  lat: number | null;
  lng: number | null;
  radius_km: number | null;
  property_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  distance_km?: number;
  nearest_property?: string;
}

const alertTypes = [
  { value: "all", label: "Toate" },
  {
    value: "fire",
    label: "Incendii",
    icon: <Flame className="h-4 w-4 text-orange-500" />,
  },
  {
    value: "flood",
    label: "Inundații",
    icon: <Droplets className="h-4 w-4 text-blue-500" />,
  },
  {
    value: "ndvi",
    label: "Vegetatie",
    icon: <Leaf className="h-4 w-4 text-green-500" />,
  },
  {
    value: "warning",
    label: "Avertizări",
    icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  },
];

export default function AlertePage() {
  const [filter, setFilter] = useState("all");
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const params = new URLSearchParams();
        if (filter !== "all") {
          params.append("type", filter.toUpperCase());
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/alerts?${params.toString()}`
        );

        if (response.ok) {
          const data = await response.json();
          setAlerts(data.alerts || []);
        }
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [filter]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-white mb-8">Alerte Active</h1>
        <div className="text-center py-10 text-slate-400">
          Se încarcă alertele...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Alerte Active</h1>
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 whitespace-nowrap">
        {alertTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setFilter(type.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors text-sm font-medium
              ${
                filter === type.value
                  ? "bg-green-600/20 border-green-600 text-green-400"
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
              }
            `}
          >
            {type.icon}
            {type.label}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map((alert) => {
            const alertType = alert.type.toLowerCase();
            const alertSeverity = alert.severity.toLowerCase();

            return (
              <div
                key={alert.id}
                className={`border-l-4 rounded-r-lg p-4 bg-slate-800 border-slate-700 flex items-start gap-4`}
              >
                {alertType === "fire" && (
                  <Flame className="h-6 w-6 text-orange-500" />
                )}
                {alertType === "flood" && (
                  <Droplets className="h-6 w-6 text-blue-500" />
                )}
                {alertType === "ndvi" && (
                  <Leaf className="h-6 w-6 text-green-500" />
                )}
                {alertType === "warning" && (
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-lg mb-1">
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{alert.sector}</span>
                    <span>•</span>
                    <span>
                      {new Date(alert.created_at).toLocaleString("ro-RO", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                    <span>•</span>
                    <span
                      className={`font-semibold ${
                        alertSeverity === "high" || alertSeverity === "critical"
                          ? "text-red-500"
                          : alertSeverity === "medium"
                          ? "text-orange-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {alertSeverity.charAt(0).toUpperCase() +
                        alertSeverity.slice(1)}
                    </span>
                    {alert.distance_km !== undefined &&
                      alert.nearest_property && (
                        <>
                          <span>•</span>
                          <span className="text-green-400 font-medium">
                            {alert.distance_km.toFixed(1)}km de la{" "}
                            {alert.nearest_property}
                          </span>
                        </>
                      )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 text-slate-400">
            <AlertTriangle className="h-10 w-10 mx-auto mb-3 opacity-50" />
            <p>Nicio alertă pentru acest tip.</p>
          </div>
        )}
      </div>
    </div>
  );
}
