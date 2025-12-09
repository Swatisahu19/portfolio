import { useState, useCallback } from "react";

export interface Toast {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((toastData: Toast) => {
    setToast(toastData);
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  return {
    toast: showToast,
  };
}

