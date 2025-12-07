export interface LandParcel {
  id: string;
  name: string;
  coordinates: [number, number][];
  ndviIndex: number;
  status: 'healthy' | 'fire' | 'flood';
  area: number;
  damageEstimate?: number;
  activePackage?: string;
  reportsLeft?: number;
}

export interface Geometry {
  id: string;
  type: string;
  coordinates: [number, number][][];
  created_at: string;
}

export interface Property {
  id: string;
  user_id: string;
  name: string;
  geometry: Geometry;
  crop_type: string;
  area_ha: number;
  center_lat: number;
  center_lng: number;
  estimated_value: number;
  risk_score: number;
  last_analysed_at: string;
  created_at: string;
  updated_at: string;
  activePackage: string;
  reportsLeft: number;
}

export interface CreatePropertyRequest {
  name: string;
  geometry: {
    type: 'Polygon';
    coordinates: { lat: number; lng: number }[][];
  };
  crop_type: string;
  area_ha: number;
  center_lat: number;
  center_lng: number;
  estimated_value: number;
  activePackage: string;
  reportsLeft: number;
}

export interface UpdatePropertyRequest {
  name?: string;
  crop_type?: string;
  area_ha?: number;
  estimated_value?: number;
}

export interface Alert {
  id: string;
  type: 'fire' | 'flood' | 'warning' | 'ndvi';
  message: string;
  timestamp: Date;
  sector: string;
  severity: 'low' | 'medium' | 'high';
  lat?: number;
  lng?: number;
  created_at?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface NDVIDataPoint {
  date: string;
  value: number;
}

export interface ClaimReport {
  id: string;
  parcelId: string;
  parcelName: string;
  disasterType: 'fire' | 'flood';
  damageEstimate: number;
  area: number;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
}
