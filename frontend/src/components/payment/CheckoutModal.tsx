"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function CheckoutModal({
  open,
  onClose,
  price,
  pkg,
  reports,
  userEmail,
  onPaymentSuccess,
}: {
  open: boolean;
  onClose: () => void;
  price: number;
  pkg: string;
  reports: number;
  userEmail: string;
  onPaymentSuccess: () => void;
}) {
  const [paid, setPaid] = useState(false);

  const handlePay = () => {
    setPaid(true);
    setTimeout(() => {
      onPaymentSuccess();
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {!paid ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center mb-2">
                Confirmare plată
              </DialogTitle>
            </DialogHeader>
            <div className="text-center my-4">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {price} €
              </div>
              <div className="text-slate-400 mb-2">
                Pachet: <span className="font-semibold text-white">{pkg}</span>
              </div>
              <div className="text-slate-400 mb-2">
                Rapoarte incluse:{" "}
                <span className="font-semibold text-white">{reports}</span>
              </div>
              <div className="text-slate-400 mb-4">
                Email:{" "}
                <span className="font-semibold text-white">{userEmail}</span>
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handlePay}
              >
                Plătește
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <div className="text-xl font-bold text-white mb-2">
              Plata a fost înregistrată
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
