"use client";

import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Satellite,
  Flame,
  Droplets,
  FileCheck,
  Bot,
  AlertTriangle,
  CloudRain,
  TrendingDown,
  ShieldCheck,
  Globe
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return { count, ref };
}

export default function DesprePage() {
  const worstCaseMin = useCountUp(300, 2000);
  const worstCaseMax = useCountUp(400, 2000);
  const floodMin = useCountUp(70, 2000);
  const floodMax = useCountUp(100, 2000);
  const fireMin = useCountUp(15, 2000);
  const fireMax = useCountUp(20, 2000);
  const externalMin = useCountUp(80, 2000);
  const externalMax = useCountUp(120, 2000);
  const totalMin = useCountUp(165, 2000);
  const totalMax = useCountUp(240, 2000);

  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden font-sans">
      <div className="fixed inset-0 bg-slate-950" />
      <div className="fixed inset-0" style={{ background: 'radial-gradient(circle 1400px at 50% -20%, rgba(34, 197, 94, 0.25) 0%, transparent 70%)' }} />
      <div className="fixed inset-0 bg-grid-pattern" />
      <div className="fixed inset-0 bg-noise pointer-events-none" />

      <Navbar />

      <div className="relative z-10 container mx-auto px-6 pt-45 pb-20">

        {/* Intro Section */}
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Monitorizare Completă <br />
            <span className="text-green-500">Din Satelit</span>
          </h1>
          <p className="text-xl max-w-6xl text-slate-300 leading-relaxed">
            SpotyFire este o platformă web care are la bază un proces complet de monitorizare a terenurilor folosindu-ne de date din satelit.
            Obiectivul nostru principal este realizarea unei analize post-incendiu și post-inundații a terenurilor
            pentru obținerea unor rapoarte care să conțină costuri orientative în eficientizarea procesului de despăgubire din partea firmelor de asigurări.
          </p>
        </div>

        <div className="max-w-6xl mx-auto text-center mb-12">
          <div className="p-6 bg-slate-800/50 backdrop-blur rounded-2xl border border-green-900/50 w-full">
            <p className="text-slate-400 italic">
              "Oferim o modalitate de overview asupra terenurilor pentru prevenție, incluzând calculul indicelui de fertilitate
              și analiza riscului de dezastre bazată pe istoric."
            </p>
          </div>
        </div>

        {/* Problem Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Problema</h2>
            <p className="text-slate-400 max-w-6xl mx-auto text-lg">
              Fermierii și proprietarii de terenuri pierd anual milioane din cauza incendiilor și inundațiilor.
              Estimarea pagubelor durează mult, este imprecisă, iar lipsa dovezilor duce la pierderea despăgubirilor.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Worst Case Card */}
            <div className="lg:col-span-4 bg-gradient-to-r from-red-900/40 to-slate-900/40 border border-red-500/30 p-8 rounded-3xl text-center mb-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-red-600/5 group-hover:bg-red-600/10 transition-colors" />
              <h3 className="text-red-400 font-bold tracking-widest uppercase mb-2 relative z-10">Worst Case Scenario</h3>
              <div className="text-5xl md:text-5xl font-black text-white mb-2 relative z-10">
                <span ref={worstCaseMin.ref}>{worstCaseMin.count}</span>-<span ref={worstCaseMax.ref}>{worstCaseMax.count}</span> <span className="text-2xl font-bold text-red-500">MLN €</span>
              </div>
            </div>

            {/* Inundatii */}
            <div className="bg-slate-800/50 border border-blue-500/30 p-8 rounded-3xl text-center hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CloudRain className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                <span ref={floodMin.ref}>{floodMin.count}</span>-<span ref={floodMax.ref}>{floodMax.count}</span>
              </div>
              <div className="text-blue-400 font-bold text-sm mb-4">MILIOANE €</div>
              <p className="text-slate-400 text-sm">Pagube cauzate de inundații (2020-2023)</p>
            </div>

            {/* Incendii */}
            <div className="bg-slate-800/50 border border-orange-500/30 p-8 rounded-3xl text-center hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Flame className="w-8 h-8 text-orange-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                <span ref={fireMin.ref}>{fireMin.count}</span>-<span ref={fireMax.ref}>{fireMax.count}</span>
              </div>
              <div className="text-orange-400 font-bold text-sm mb-4">MILIOANE €</div>
              <p className="text-slate-400 text-sm">Pagube anuale cauzate de incendii</p>
            </div>

            {/* Fenomene Externe */}
            <div className="bg-slate-800/50 border border-purple-500/30 p-8 rounded-3xl text-center hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                <span ref={externalMin.ref}>{externalMin.count}</span>-<span ref={externalMax.ref}>{externalMax.count}</span>
              </div>
              <div className="text-purple-400 font-bold text-sm mb-4">MILIOANE €</div>
              <p className="text-slate-400 text-sm">Pagube cauzate de alte fenomene externe</p>
            </div>

            {/* Total */}
            <div className="bg-slate-800/80 border border-slate-600 p-8 rounded-3xl text-center flex flex-col justify-center hover:scale-[1.02] transition-transform">
              <h3 className="text-slate-200 font-bold uppercase mb-2">Total Mediu</h3>
              <div className="text-4xl font-black text-white mb-1">
                <span ref={totalMin.ref}>{totalMin.count}</span>-<span ref={totalMax.ref}>{totalMax.count}</span>
              </div>
              <div className="text-slate-400 font-bold text-sm">MILIOANE €</div>
            </div>
          </div>
        </div>

        {/* Solution Section */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Soluția <span className="text-green-500">SpotyFire</span></h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Satellite,
                    title: "Monitorizare Satelitară Automată",
                    desc: "Utilizăm date Sentinel-1 & Sentinel-2 pentru supraveghere 24/7."
                  },
                  {
                    icon: TrendingDown,
                    title: "Estimare Index Fertilitate",
                    desc: "Analiză aprofundată a solului pentru optimizarea culturilor."
                  },
                  {
                    icon: Flame,
                    title: "Detectare Rapidă Incendii",
                    desc: "Integrare NASA FIRMS pentru alerte în 1-3 ore."
                  },
                  {
                    icon: Droplets,
                    title: "Detecție Inundații",
                    desc: "Funcționează chiar și pe vreme înnorată folosind radar SAR."
                  },
                  {
                    icon: Globe,
                    title: "Estimare Automată Pagube",
                    desc: "Calcul precis al hectarelor afectate și pierderilor în Euro."
                  },
                  {
                    icon: FileCheck,
                    title: "Rapoarte Oficiale",
                    desc: "Generare PDF-uri acceptate de APIA și Asiguratori."
                  },
                  {
                    icon: Bot,
                    title: "Chat AI Integrat",
                    desc: "Asistent virtual care explică datele și recomandă acțiuni."
                  }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700">
                    <div className="mt-1">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-green-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
                      <p className="text-slate-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              {/* Abstract Visual Representation of the Solution */}
              <div className="aspect-square rounded-full bg-green-500/10 absolute -top-20 -right-20 blur-3xl w-full" />
              <div className="relative z-10 w-full">
                <div className="bg-slate-800/80 backdrop-blur p-8 rounded-3xl border border-green-500/30 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="text-white font-bold">Raport Siguranță</p>
                        <p className="text-xs text-green-500">Actualizat acum</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-xs font-mono">LIVE</div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Sănătate Vegetație</span>
                      <span className="text-white font-bold">85%</span>
                    </div>

                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden mt-6">
                      <div className="h-full w-[12%] bg-blue-500" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Risc Inundații</span>
                      <span className="text-white font-bold">12%</span>
                    </div>

                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden mt-6">
                      <div className="h-full w-[2%] bg-orange-500" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Risc Incendiu</span>
                      <span className="text-white font-bold">2%</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-700 flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Index Fertilitate</span>
                    <span className="text-2xl font-black text-white">8.4<span className="text-sm text-slate-500 font-normal">/10</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
