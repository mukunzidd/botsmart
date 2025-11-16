"use client";

import * as React from "react";
import { X, AlertCircle, Info, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  id?: string;
  message: string;
  type?: "info" | "warning" | "error" | "success";
  duration?: number;
  onClose?: () => void;
}

const icons = {
  info: { Icon: Info, color: "text-blue-600", bg: "bg-blue-100" },
  warning: { Icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-100" },
  error: { Icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
  success: { Icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
};

export function Toast({
  message,
  type = "info",
  duration = 4000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const { Icon, color, bg } = icons[type];

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300); // Wait for animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border bg-white p-4 shadow-xl",
        "animate-in slide-in-from-top-5 fade-in-0",
        "min-w-[320px] max-w-[420px]",
        "backdrop-blur-sm bg-white/95"
      )}
      role="alert"
    >
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          bg
        )}
      >
        <Icon className={cn("h-5 w-5", color)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 leading-relaxed break-words">
          {message}
        </p>
      </div>
      {onClose && (
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(), 300);
          }}
          className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastProps[];
  onRemove: (id?: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id || Math.random()}
          {...toast}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const showToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = React.useCallback((id?: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    showToast,
    removeToast,
    ToastContainer: () => (
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    ),
  };
}
