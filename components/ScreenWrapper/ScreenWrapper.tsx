import { Animated } from "react-native";
import { useContext, useEffect, useRef } from "react";
import { ShopContext } from "../../context/ShopContext";
import { lightTheme, darkTheme } from "../../styles/theme";

export default function ScreenWrapper({ children }: { children: React.ReactNode }) {
  const { darkMode } = useContext(ShopContext);
  const theme = darkMode ? darkTheme : lightTheme;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [darkMode]);

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
}
