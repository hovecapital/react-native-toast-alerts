import { SafeAreaView } from "react-native-safe-area-context";

import ToastMessage from "../components/ToastMessage";
import { createContext, useCallback } from "react";
import {
  Toast,
  ToastContextType,
  ToastProviderProps,
  ToastStyles,
} from "../components/types";
import useToastStore from "../components/store/toastStore";
import createDefaultStyles from "../components/styles/defaultStyles";

/**
 * Context for the toast notification system
 */
export const ToastContext = createContext<ToastContextType>({
  showToast: () => null,
});

/**
 * Provider component for the toast notification system
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  styles: customStyles,
  maxToasts = 3,
  defaultDuration = 3000,
  position = "top",
}) => {
  const { toasts, addToast, removeToast } = useToastStore();

  const defaultStyles = createDefaultStyles();
  const styles: ToastStyles = {
    container: [
      defaultStyles.container,
      position === "top" ? { top: 0 } : { bottom: 0 },
      customStyles?.container,
    ],
    toast: [defaultStyles.toast, customStyles?.toast],
    text: [defaultStyles.text, customStyles?.text],
    colors: {
      ...defaultStyles.colors,
      ...customStyles?.colors,
    },
  };

  /**
   * Show a toast notification
   */
  const showToast = useCallback(
    (message: string, type?: Toast["type"], duration?: number) => {
      addToast({
        message,
        type,
        duration: duration ?? defaultDuration,
      });

      setTimeout(() => {
        useToastStore
          .getState()
          .toasts.slice(0, -maxToasts)
          .forEach((toast) => {
            removeToast(toast.id);
          });
      }, 0);
    },
    [addToast, removeToast, defaultDuration, maxToasts]
  );

  const Container =
    position === "top"
      ? (props: any) => <SafeAreaView {...props} edges={["top"]} />
      : (props: any) => <SafeAreaView {...props} edges={["bottom"]} />;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Container style={styles.container}>
        {toasts.map((toast) => (
          <ToastMessage
            key={toast.id}
            toast={toast}
            onHide={() => removeToast(toast.id)}
            styles={styles}
            position={position}
          />
        ))}
      </Container>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
