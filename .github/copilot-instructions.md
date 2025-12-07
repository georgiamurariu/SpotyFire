# SpotyFire - Backend Master Prompt & Hackathon Guidelines

## 1\. Project Overview

**Name:** SpotyFire (Backend)
**Context:** 48h Hackathon - "Disaster Responses & Resilience"
**Goal:** A high-speed FastAPI backend that processes satellite imagery (Sentinel-1 SAR) to detect floods/fires, estimates financial loss, and generates valid insurance claim PDFs using AI.
**Core Functionality:**

1.  **Satellite Analysis:** Fetch "Before" vs "After" radar images to calculate damage percentage.
2.  **AI Adjuster:** An LLM agent that interprets the satellite data and drafts a legal "Notice of Loss."
3.  **Report Generation:** Create a downloadable PDF for the insurance company.

## 2\. Tech Stack (Python)

- **Framework:** `FastAPI` (for speed and auto-docs).
- **Server:** `Uvicorn`.
- **Auth** neon auth
- **Satellite Data:**`earthengine-api`.
- **Image Processing:** `rasterio`(for calculating difference masks).
- **AI/LLM:** `google-generativeai` (Gemini-2.0-flash).
- **PDF Generation:** `fpdf2` or `reportlab`.
- **Environment:** `python-dotenv` for API keys.

## 3\. Architecture & Principles

### A. The "Demo Mode" Strategy (CRITICAL)

- **Rule:** We cannot risk the Satellite API timing out during the live pitch.
- **Implementation:** Create a global constant `DEMO_MODE = True`.
- **Logic:**
  - If `DEMO_MODE` is True: The `/analyze` endpoint ignores the specific coordinates and returns a **pre-calculated** perfect JSON response for the Galați/Vaslui flood event.
  - If `DEMO_MODE` is False: It actually tries to call the Sentinel Hub API.
- **Rule**: Do not write any comments

### B. Directory Structure

```text
backend/
├── app/
│   ├── main.py            # FastAPI entry point & CORS
│   ├── models.py          # Pydantic models (Request/Response schemas)
│   ├── services/
│   │   ├── satellite.py   # logic for fetching & diffing images
│   │   ├── ai_agent.py    # OpenAI prompt engineering
│   │   └── pdf_maker.py   # FPDF logic to generate the claim
│   └── data/
│       └── mocks.py       # The hardcoded "Perfect Demo" data
├── static/                # Store generated overlay images here
├── requirements.txt
└── .env
```

## 4\. Key Endpoints & Logic

### 1\. `POST /api/analyze`

- **Input:** `{ lat: float, lng: float, crop_type: string, value_per_ha: float }`
- **Process:**
  1.  Check `DEMO_MODE`. If True, return mock data.
  2.  If False: Fetch Sentinel-1 image (2 weeks ago) and Sentinel-1 image (yesterday).
  3.  Calculate pixel difference (change detection).
  4.  Determine `damaged_area_ha` and `financial_loss`.
- **Output:** JSON with damage stats and a URL to the "Flood Mask" image.

### 2\. `POST /api/chat`

- **Input:** `{ message: string, context: dict }`
- **Process:**
  - System Prompt: _"You are an expert Agricultural Claims Adjuster named SpotyBot. You have access to satellite forensic data showing {damage_percent}% damage. Be empathetic but professional. Help the farmer draft their claim."_
  - Use RAG (Retrieval Augmented Generation) to answer questions about the specific damage.

### 3\. `POST /api/generate-report`

- **Input:** `{ claim_id: string, user_details: dict }`
- **Process:**
  - Generate a formal PDF named `Claim_{ID}.pdf`.
  - Include: Map screenshot (placeholder), damage stats, estimated payout, time of disaster.
- **Output:** Download URL.

## 5\. Specific Service Instructions

### Satellite Service (`satellite.py`)

- Focus on **Sentinel-1 GRD** (Ground Range Detected).
- Logic: Water looks _dark_ in radar (low backscatter). If a pixel was bright (land) and is now dark (water), it is flooded.
- **Hackathon Shortcut:** If real processing is too hard, just return a static image of a red blob on a transparent background.

### AI Agent (`ai_agent.py`)

- Do not just stream text. Structure the output.
- If the user asks "How much money will I get?", the AI should calculate: `damaged_ha * value_per_ha`.

## 6\. Response Format

- **Modular Code:** Give me one file at a time.
- **Mock First:** Start by writing `app/data/mocks.py` so we have data to test immediately.
- **Pydantic Models:** Define the data structure in `app/models.py` before writing the logic.
- **FastAPI Boilerplate:** Write the `main.py` last, connecting the services.

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
- **Auth** neon auth
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
