"use client";

import { useState } from "react";
import { useReports, PackageType } from "@/context/ReportsContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // As
// suming this exists or standard input
import { Check, CreditCard, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const { calculatePrice, activatePackage } = useReports();
  const router = useRouter();
  
  const [hectares] = useState<number>(10);
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const packages: { name: PackageType; price: number; reports: number; features: string[] }[] = [
    {
      name: "Basic",
      price: 9,
      reports: 5,
      features: ["5 Rapoarte incluse", "Monitorizare de bază", "Suport Email"],
    },
    {
      name: "Pro",
      price: 29,
      reports: 15,
      features: ["15 Rapoarte incluse", "Monitorizare avansată", "Alerte Prioritare", "Istoric 1 an"],
    },
    {
      name: "Enterprise",
      price: 99,
      reports: 50,
      features: ["50 Rapoarte incluse", "API Access", "Consultant dedicat", "Asistență 24/7"],
    },
  ];

  const handleOpenModal = (pkg: PackageType) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
    setSuccessMessage("");
  };

  const handleConfirmPayment = () => {
    if (!selectedPackage || !email) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      activatePackage(selectedPackage, hectares);
      setSuccessMessage("Plata a fost înregistrată.");
      setIsProcessing(false);
      
      // Close modal and redirect after a moment
      setTimeout(() => {
        setIsModalOpen(false);
        router.push("/dashboard");
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

      {/* Header */}
      <header className="py-6 px-6 relative z-10 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 font-bold text-xl">
            <Shield className="text-green-500 h-6 w-6" />
            <span>SpotyFire</span>
        </div>
        <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">
            Înapoi la Dashboard
        </Link>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 relative z-10 space-y-12">
        {/* Hero / Icon */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse" />
                <CreditCard className="h-20 w-20 text-green-400 animate-float-pulse relative z-10" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Alege Planul Potrivit</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Soluții flexibile pentru ferma ta. Prețul se ajustează automat în funcție de suprafața terenului.
          </p>
        </div>



        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => {
                const finalPrice = calculatePrice(pkg.name, hectares);
                return (
                    <Card key={pkg.name} className="bg-slate-900/50 border-slate-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/10 flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-xl text-white">{pkg.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-6">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-white">€{finalPrice}</span>
                                <span className="text-slate-400">/lună</span>
                            </div>
                            <ul className="space-y-3">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button 
                                onClick={() => handleOpenModal(pkg.name)}
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white hover:text-green-400 border border-transparent hover:border-green-500/30"
                            >
                                Alege {pkg.name}
                            </Button>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
      </main>

      {/* Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Confirmare Plată</DialogTitle>
                <DialogDescription className="text-slate-400">
                    Rezumatul comenzii tale.
                </DialogDescription>
            </DialogHeader>
            {!successMessage ? (
                <div className="space-y-4 py-4">
                    <div className="space-y-2 text-sm bg-slate-800/50 p-4 rounded-lg">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Pachet:</span>
                            <span className="font-medium">{selectedPackage}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Suprafață:</span>
                            <span className="font-medium">{hectares} ha</span>
                        </div>
                         <div className="flex justify-between border-t border-slate-700 pt-2 mt-2">
                            <span className="text-slate-400">Total de plată:</span>
                            <span className="font-bold text-green-400 text-lg">
                                €{selectedPackage ? calculatePrice(selectedPackage, hectares) : 0}
                            </span>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email pentru factură</label>
                        {/* Use standard Input if imported, or primitive input */}
                        <Input
                            type="email" 
                            placeholder="nume@exemplu.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
            ) : (
                <div className="py-8 text-center space-y-3">
                    <div className="mx-auto w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="text-lg font-medium text-green-400">{successMessage}</p>
                    <p className="text-sm text-slate-400">Te redirecționăm către dashboard...</p>
                </div>
            )}
            
            {!successMessage && (
                <DialogFooter className="sm:justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                        Anulează
                    </Button>
                    <Button 
                        onClick={handleConfirmPayment}
                        disabled={!email || isProcessing}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        {isProcessing ? "Se procesează..." : "Confirmă Plata"}
                    </Button>
                </DialogFooter>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
