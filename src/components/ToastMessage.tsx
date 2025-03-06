import { useEffect, useRef } from "react";
import { ToastMessageProps } from "./types";
import { Animated, PanResponder, Text } from "react-native";

/**
 * Individual toast message component
 */
const ToastMessage: React.FC<ToastMessageProps> = ({
  toast,
  onHide,
  styles,
  position,
}) => {
  // Animation values
  const translateY = useRef(
    new Animated.Value(position === "top" ? -100 : 100)
  ).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // Pan responder for swipe to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > 50) {
          Animated.timing(translateX, {
            toValue: gestureState.dx > 0 ? 400 : -400,
            duration: 200,
            useNativeDriver: true,
          }).start(onHide);
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Show toast animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-hide toast after duration
    const timer = setTimeout(() => {
      hideToast();
    }, toast.duration);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hide toast animation
  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === "top" ? -100 : 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  // Get background color based on toast type
  const getBackgroundColor = () => {
    switch (toast.type) {
      case "success":
        return styles.colors?.success;
      case "error":
        return styles.colors?.error;
      default:
        return styles.colors?.info;
    }
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.toast,
        {
          transform: [{ translateY }, { translateX }],
          opacity,
          backgroundColor: getBackgroundColor(),
        },
      ]}
    >
      <Text style={styles.text}>{toast.message}</Text>
    </Animated.View>
  );
};

export default ToastMessage;
