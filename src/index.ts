/**
 * React Native Toast Alerts
 * A customizable toast notification library for React Native
 */

// Export main components
export { default as ToastProvider } from "./contexts/ToastContext";
export { default as useToast } from "./hooks/useToast";

// Export types
export type {
  Toast,
  ToastType,
  ToastStyles,
  ToastContextType,
  ToastProviderProps,
} from "./components/types";

// Export styles
export {
  createDefaultStyles,
  defaultColors,
  defaultTheme,
} from "./components/styles/defaultStyles";
