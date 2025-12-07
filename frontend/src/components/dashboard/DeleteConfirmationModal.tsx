"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  propertyName?: string;
  isDeleting?: boolean;
}

export default function DeleteConfirmationModal({
  open,
  onClose,
  onConfirm,
  propertyName,
  isDeleting,
}: DeleteConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <div className="flex items-center gap-2 text-red-500 mb-2">
            <div className="bg-red-500/10 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <DialogTitle className="text-xl">Ștergere Teren</DialogTitle>
          </div>
          <DialogDescription className="text-slate-400">
            Ești sigur că vrei să ștergi terenul{" "}
            {propertyName ? <span className="text-white font-medium">"{propertyName}"</span> : "selectat"}?
            Acțiunea este ireversibilă și va elimina terenul de pe toate hărțile.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isDeleting}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Anulează
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 gap-2"
          >
            {isDeleting ? (
              "Se șterge..."
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Șterge Definitiv
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
