"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { AlertCircle, Info, CheckCircle, XCircle } from "lucide-react";

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: "info" | "warning" | "error" | "success";
  confirmText?: string;
}

export function AlertDialog({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  confirmText = "OK",
}: AlertDialogProps) {
  const icons = {
    info: { Icon: Info, color: "text-blue-600", bg: "bg-blue-100" },
    warning: {
      Icon: AlertCircle,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    error: { Icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
    success: { Icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
  };

  const { Icon, color, bg } = icons[type];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${bg}`}
            >
              <Icon className={`h-8 w-8 ${color}`} />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">
            {title || <VisuallyHidden>Alert</VisuallyHidden>}
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            {message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={onClose}
            size="lg"
            className="w-full font-semibold bg-primary hover:bg-primary/90"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
