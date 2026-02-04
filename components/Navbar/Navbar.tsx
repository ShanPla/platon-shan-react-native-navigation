import { View, Text, Pressable } from "react-native";
import { useContext } from "react";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ShopContext } from "../../context/ShopContext";
import styles from "./NavbarStyle";
import { lightTheme, darkTheme } from "../../styles/theme";

export default function Navbar() {
  const { darkMode, toggleTheme } = useContext(ShopContext);
  const theme = darkMode ? darkTheme : lightTheme;
  const router = useRouter();
  const pathname = usePathname();

  const showBack = pathname !== "/";

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {showBack && (
          <Pressable onPress={() => router.replace("/")} style={{ marginRight: 10 }}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </Pressable>
        )}

        <Text style={[styles.title, { color: theme.text }]}>🛍 Shopify</Text>
      </View>

      <Pressable
        onPress={toggleTheme}
        style={[styles.themeBtn, { backgroundColor: theme.button }]}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          {darkMode ? "Light" : "Dark"}
        </Text>
      </Pressable>
    </View>
  );
}
