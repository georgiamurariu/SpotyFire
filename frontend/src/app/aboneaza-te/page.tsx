"use client";

import SubscriptionContent from "@/components/subscription/SubscriptionContent";
import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SubscribePage() {
  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Background Effects matching DesprePage */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle 1400px at 50% -20%, rgba(34, 197, 94, 0.25) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <Navbar />

      <div className="relative z-10 container mx-auto px-6 pt-40 pb-20">

        <SubscriptionContent />
      </div>
    </div>
  );
}
