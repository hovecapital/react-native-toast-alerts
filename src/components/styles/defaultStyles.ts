import { ToastStyles } from "../types";

export const defaultColors = {
  success: "#4CAF50",
  error: "#F44336",
  info: "#2196F3",
  text: "#FFFFFF",
  black: "#000000",
};

export const defaultTheme = {
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
  },
  radius: {
    m: 8,
  },
  fontSizes: {
    s: 14,
  },
};

export const createDefaultStyles = (): ToastStyles => ({
  container: {
    position: "absolute",
    width: "100%",
    zIndex: 9999,
    gap: defaultTheme.spacing.xs,
  },
  toast: {
    marginHorizontal: defaultTheme.spacing.s,
    padding: defaultTheme.spacing.s,
    borderRadius: defaultTheme.radius.m,
    shadowColor: defaultColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: defaultColors.text,
    fontSize: defaultTheme.fontSizes.s,
  },
  colors: {
    success: defaultColors.success,
    error: defaultColors.error,
    info: defaultColors.info,
    text: defaultColors.text,
  },
});

export default createDefaultStyles;
