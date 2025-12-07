"use client";

import dynamic from "next/dynamic";
import { LandParcel, Alert } from "@/types";

const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-800 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-slate-400">Se încarcă harta...</p>
      </div>
    </div>
  ),
});

interface MapWrapperProps {
  parcels: LandParcel[];
  alerts?: Alert[];
  activeLayer?: string;
  onParcelSelect?: (parcel: LandParcel) => void;
}

export default function MapWrapper({ parcels, alerts, activeLayer = 'standard', onParcelSelect }: MapWrapperProps) {
  return <MapCanvas parcels={parcels} alerts={alerts} activeLayer={activeLayer} onParcelSelect={onParcelSelect} />;
}
