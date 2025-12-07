Here is the updated Master Prompt Markdown. You can copy-paste this directly into a new chat with me or any other AI to start coding your frontend immediately.

---

# SpotyFire - Frontend Master Prompt & Hackathon Guidelines

## 1\. Project Overview

**Name:** SpotyFire
**Context:** 48h Hackathon - "Disaster Responses & Resilience: The Web As a Lifeline"
**Goal:** A web platform for farmers and landowners to detect wildfires and floods using satellite imagery, analyze vegetation health, and automate insurance claims via AI.
**Target Audience:**

1.  **Farmers/Landowners:** Need to monitor crop health and claim losses fast.
2.  **Insurers:** Need verification of damage.
3.  **Emergency Responders:** Need to spot fire/flood spread patterns.

**Key Values:** Detection, Growth, Resilience, Speed.

## 2\. Tech Stack (Speed & Performance)

- **Framework:** Next.js 16+ (App Router).
- **Language:** TypeScript.
- **Styling:** Tailwind CSS v4.
- **UI Library:** shadcn/ui (Radix UI primitives).
- **Maps:** `react-leaflet` (OpenStreetMap) with `leaflet` CSS.
- **Charts:** `recharts` (for displaying fertility index/NDVI trends).
- **Icons:** Lucide React.
- **AI Interface:** AI backend.
- **State:** React Context.

## 3\. Design & UX Guidelines

- **Style:** **"Eco-Defense" Aesthetic.** Clean, modern, high-tech but grounded.
- **Main Color:** **Green** (Growth, Nature, Recovery).
- **Color Palette:**
  - **Primary (Brand):** Emerald Green (`green-600` / `#059669`).
  - **Secondary (UI):** Slate Gray (`slate-900` for text, `slate-50` for backgrounds).
  - **Status - Healthy:** Bright Green (`green-500`).
  - **Status - Fire:** Blazing Orange/Red (`orange-600`).
  - **Status - Flood:** Deep Blue (`blue-600`).
- **Key Visuals:**
  - **The Map:** The central component.
  - **The Dashboard:** Glassmorphism over the map or clean cards floating on top.
  - **Typography:** Sans-serif, crisp (Inter or Geist Sans).

## 4\. Coding Principles (Hackathon Mode)

### B. Component Architecture

- **Components:** Preffer server side components.
- **Modular:** Each feature should be a separate component.
- **Client-Side Strategy:** Mark map interactions and charts as `'use client'`.
- **Responsive:** Must look good on a laptop (for the demo projector). Mobile is good to have.
- **Map Isolation:** Always isolate `react-leaflet` components in a separate file using `next/dynamic` with `ssr: false` to avoid window errors.

### C. The "Lifeline" & "Validation" Features

- **Pre-Validated Report:** Create a UI component that looks like a generated PDF "Certificate of Loss".
- **Connectivity Status:** A visual indicator (Green dot) showing "Satellite Uplink Active" vs "Offline Mode - SMS Fallback Ready".

## 5\. Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout (Inter font)
│   ├── page.tsx           # Landing Page (Pitch the "SpotyFire" vision)
│   └── dashboard/
│       ├── layout.tsx     # Sidebar (Green accents) + Header
│       └── page.tsx       # The Main Map View
├── components/
│   ├── dashboard/
│   │   ├── HealthStats.tsx # NDVI/Vegetation gauges
│   │   ├── AiAssistant.tsx # The Chatbot drawer
│   │   ├── AlertsPanel.tsx # "Fire Detected in Sector 4"
│   │   └── ClaimsCard.tsx  # "Generate Report" button
│   ├── map/
│   │   ├── MapCanvas.tsx   # Leaflet Container (NoSSR)
│   │   └── MapLayers.tsx   # Toggles for "Natural Color" vs "Radar"
│   ├── ui/                 # shadcn components (Buttons, Cards)
│   └── landing/            # Hero section
├── lib/
│   ├── utils.ts
│   └── mocks.ts            # MOCK DATA STORE
└── types/
    └── index.ts
```

## 6\. Specific Component Instructions

### The Map (Heart of SpotyFire)

- Show user's land with a **Green outline** (healthy).
- If a disaster mode is toggled, overlay **Red polygons** (Fire) or **Blue polygons** (Flood).
- Popup on click: "Vegetation Index: 0.85 (High)" or "Damage Est: $4,500".

### The AI Assistant

- Name: "SpotyBot" or "Field Agent".
- Context: It knows the map data.
- Suggested prompts: "Analyze burn scar size", "Draft claim for Allianz", "Compare to last year".

### The Landing Page

- Hero Section: Big bold text "Protecting Your Land from Space."
- Call to Action: Green button "Launch Dashboard".

## 7\. Response Format

- **Code First:** Provide the component code immediately.
- **Imports:** Include all imports (lucide-react, etc.).
- **Styling:** Use Tailwind classes directly (`className="bg-green-600 text-white..."`).
- **No Comments:** Keep code clean, no comments needed.
- **No Explanations:** Just the code, little explanations or markdown formatting.

---

**MASTER PROMPT END**
