import { create } from "zustand";
import { ToastStore } from "../types";

/**
 * Zustand store for managing toast notifications
 */
const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  /**
   * Add a new toast to the store
   */
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: Math.random().toString() }],
    })),

  /**
   * Remove a toast from the store by ID
   */
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

export default useToastStore;
