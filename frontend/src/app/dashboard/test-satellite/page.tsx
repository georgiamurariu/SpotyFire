"use client";

import { useState } from "react";
import { useUser } from "@stackframe/stack";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Satellite, Loader2, CheckCircle, XCircle } from "lucide-react";

export default function TestSatellitePage() {
  const user = useUser();
  const [propertyId, setPropertyId] = useState("");
  const [dateStart, setDateStart] = useState("2024-09-01");
  const [dateEnd, setDateEnd] = useState("2024-09-20");
  const [costPerHa, setCostPerHa] = useState(5000);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!propertyId.trim()) {
      setError("Introdu ID-ul terenului");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const token = await user?.getAuthJson();
      const accessToken = token?.accessToken;

      if (!accessToken) {
        throw new Error("Nu ești autentificat");
      }

      const response = await fetch(
        `http://localhost:8000/api/properties/${propertyId}/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            date_range_start: dateStart,
            date_range_end: dateEnd,
            cost_per_ha: costPerHa,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Eroare la analiză");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Eroare necunoscută");
    } finally {
      setLoading(false);
    }
  };

  const handleViewOverlay = () => {
    if (result?.overlay_b64) {
      const img = new Image();
      img.src = `data:image/png;base64,${result.overlay_b64}`;
      const w = window.open("");
      w?.document.write(img.outerHTML);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Satellite className="h-8 w-8 text-green-500" />
        <h1 className="text-3xl font-bold text-white">Test Analiză Satelit</h1>
      </div>

      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Property ID
            </label>
            <input
              type="text"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              placeholder="uuid-terenului"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Dată Start
              </label>
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Dată Sfârșit
              </label>
              <input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Cost per Hectar (RON)
            </label>
            <input
              type="number"
              value={costPerHa}
              onChange={(e) => setCostPerHa(Number(e.target.value))}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Se procesează...
              </>
            ) : (
              <>
                <Satellite className="h-4 w-4 mr-2" />
                Analizează
              </>
            )}
          </Button>
        </div>
      </Card>

      {error && (
        <Card className="bg-red-900/20 border-red-700 p-4">
          <div className="flex items-center gap-2 text-red-400">
            <XCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </Card>
      )}

      {result && (
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h2 className="text-xl font-semibold text-white">
              Rezultate Analiză
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">
                Procent Deteriorare
              </div>
              <div className="text-2xl font-bold text-red-400">
                {result.damage_percent?.toFixed(2)}%
              </div>
            </div>

            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Zonă Afectată</div>
              <div className="text-2xl font-bold text-orange-400">
                {result.damaged_area_ha?.toFixed(2)} ha
              </div>
            </div>

            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">
                Suprafață Totală
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {result.total_area_ha?.toFixed(2)} ha
              </div>
            </div>

            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Cost Estimat</div>
              <div className="text-2xl font-bold text-yellow-400">
                {result.estimated_cost?.toLocaleString()} RON
              </div>
            </div>
          </div>

          {result.ndvi_before && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">NDVI Înainte</div>
                <div className="text-xl font-bold text-green-400">
                  {result.ndvi_before?.toFixed(3)}
                </div>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">NDVI După</div>
                <div className="text-xl font-bold text-yellow-400">
                  {result.ndvi_after?.toFixed(3)}
                </div>
              </div>
            </div>
          )}

          {result.overlay_b64 && (
            <div className="space-y-3">
              <Button
                onClick={handleViewOverlay}
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Vezi Overlay Deteriorare
              </Button>
            </div>
          )}

          <div className="mt-4 bg-slate-900/50 p-4 rounded-lg">
            <div className="text-xs text-slate-400 mb-2">Analysis ID:</div>
            <div className="text-sm text-slate-300 font-mono break-all">
              {result.analysis_id}
            </div>
          </div>

          <details className="mt-4">
            <summary className="text-sm text-slate-400 cursor-pointer hover:text-slate-300">
              JSON Complet
            </summary>
            <pre className="mt-2 p-4 bg-slate-900/50 rounded-lg text-xs text-slate-300 overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </Card>
      )}

      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-3">
          Cum să folosești:
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
          <li>
            Mergi la <span className="text-green-400">Terenuri</span> și creează
            un teren
          </li>
          <li>
            Copiază <span className="text-green-400">ID-ul terenului</span> din
            URL sau listă
          </li>
          <li>
            Lipește ID-ul în câmpul{" "}
            <span className="text-green-400">Property ID</span>
          </li>
          <li>
            Selectează perioada pentru analiză (de ex. septembrie 2024 pentru
            incendii)
          </li>
          <li>
            Apasă <span className="text-green-400">Analizează</span> și așteaptă
            procesarea GEE
          </li>
          <li>Vezi rezultatele și overlay-ul roșu cu zonele deteriorate</li>
        </ol>
      </Card>
    </div>
  );
}
