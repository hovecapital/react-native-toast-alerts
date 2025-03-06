import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

export interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

export interface ToastStyles {
  container?: StyleProp<ViewStyle>;
  toast?: StyleProp<ViewStyle>;
  text?: StyleProp<TextStyle>;
  colors?: {
    success?: string;
    error?: string;
    info?: string;
    text?: string;
  };
}

export interface ToastProviderProps {
  children: React.ReactNode;
  styles?: ToastStyles;
  maxToasts?: number;
  defaultDuration?: number;
  position?: "top" | "bottom";
}

export interface ToastMessageProps {
  toast: Toast;
  onHide: () => void;
  styles: ToastStyles;
  position: "top" | "bottom";
}
