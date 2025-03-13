# React Native Toast Alerts

A customizable toast notification library for React Native that provides an easy way to show success, error, and info messages.

## Features

- 🚀 Easy to use with a simple hook
- 🎨 Fully customizable appearance
- 🔄 Swipe to dismiss
- 📱 Safe area compatible
- 📝 TypeScript support
- 🧩 Zero additional dependencies (apart from zustand)

## Installation

```bash
npm install @hovecapital/react-native-toast-alerts
# or
yarn add @hovecapital/react-native-toast-alerts
```

### Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install react-native-safe-area-context
# or
yarn add react-native-safe-area-context
```

## Usage

1. Wrap your app with `ToastProvider`:

```tsx
import { ToastProvider } from '@hovecapital/react-native-toast-alerts  ';

const App = () => {
  return (
    <ToastProvider>
      {/* Your app content */}
    </ToastProvider>
  );
};
```

2. Use the toast in any component:

```tsx
import { useToast } from 'react-native-toast-alerts';

const MyComponent = () => {
  const { showToast } = useToast();

  const handleButtonPress = () => {
    // Show a success toast
    showToast('Operation successful!', 'success');
    
    // Show an error toast
    showToast('Something went wrong', 'error');
    
    // Show an info toast with custom duration (in milliseconds)
    showToast('You must accept the terms and conditions', 'info', 5000);
  };

  return (
    <Button title="Show Toast" onPress={handleButtonPress} />
  );
};
```

## Customization

You can customize the appearance of the toasts by passing a `styles` prop to the `ToastProvider`:

```tsx
import { ToastProvider } from '@hovecapital/react-native-toast-alerts';

const App = () => {
  const customStyles = {
    container: {
      // Custom container styles
    },
    toast: {
      // Custom toast styles
    },
    text: {
      // Custom text styles
    },
    colors: {
      success: '#00C851', // Custom success color
      error: '#FF4444',   // Custom error color
      info: '#33B5E5',    // Custom info color
      text: '#FFFFFF',    // Custom text color
    },
  };

  return (
    <ToastProvider 
      styles={customStyles}
      position="top"         // 'top' or 'bottom'
      maxToasts={3}          // Maximum number of toasts to show at once
      defaultDuration={3000} // Default duration in milliseconds
    >
      {/* Your app content */}
    </ToastProvider>
  );
};
```

## API Reference

### ToastProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `styles` | `ToastStyles` | `{}` | Custom styles for the toasts |
| `position` | `'top' \| 'bottom'` | `'top'` | Position of the toasts |
| `maxToasts` | `number` | `3` | Maximum number of toasts to show at once |
| `defaultDuration` | `number` | `3000` | Default duration in milliseconds |

### useToast Hook

The `useToast` hook returns an object with the following methods:

| Method | Parameters | Description |
|--------|------------|-------------|
| `showToast` | `(message: string, type?: 'success' \| 'error' \| 'info', duration?: number)` | Shows a toast notification |

## License

MIT
