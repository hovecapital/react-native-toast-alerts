import { ToastContext } from "../contexts/ToastContext";
import { ToastContextType } from "../components/types";
import { useContext } from "react";

/**
 * Hook to access the toast notification system
 *
 * @returns Object with showToast function
 * @throws Error if used outside of ToastProvider
 *
 * @example
 * ```tsx
 * const { showToast } = useToast();
 *
 * // Show a success toast
 * showToast("Operation successful!", "success");
 *
 * // Show an error toast
 * showToast("Something went wrong", "error");
 *
 * // Show an info toast with custom duration
 * showToast("You must accept the terms and conditions", "info", 5000);
 * ```
 */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

export default useToast;
