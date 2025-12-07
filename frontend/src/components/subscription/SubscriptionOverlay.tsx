"use client";

import { X } from "lucide-react";
import SubscriptionContent from "./SubscriptionContent";
import { Button } from "@/components/ui/button";

interface SubscriptionOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SubscriptionOverlay({ isOpen, onClose }: SubscriptionOverlayProps) {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />
            
            {/* Content Wrapper */}
            <div className="relative z-10 w-full max-w-7xl h-[90vh] overflow-y-auto bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 mx-4 custom-scrollbar">
                <div className="sticky top-0 z-20 flex justify-end p-4 bg-gradient-to-b from-slate-900/90 to-transparent">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
                        onClick={onClose}
                    >
                        <X className="h-6 w-6" />
                        <span className="sr-only">Inchide</span>
                    </Button>
                </div>
                
                <div className="pb-12">
                    <SubscriptionContent onSuccess={onClose} />
                </div>
            </div>
        </div>
    );
}
