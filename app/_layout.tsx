import { Stack } from "expo-router";
import { ShopProvider, ShopContext } from "../context/ShopContext";
import { useContext, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { lightTheme, darkTheme } from "../styles/theme";

function RootLayoutNav() {
  const { darkMode } = useContext(ShopContext);
  const fadeAnim = useRef(new Animated.Value(darkMode ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: darkMode ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [darkMode]);

  const backgroundColor = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [lightTheme.background, darkTheme.background],
  });

  return (
    <Animated.View style={{ flex: 1, backgroundColor }}>
      <Stack screenOptions={{ headerShown: false }} />
    </Animated.View>
  );
}

export default function Layout() {
  return (
    <ShopProvider>
      <RootLayoutNav />
    </ShopProvider>
  );
}
