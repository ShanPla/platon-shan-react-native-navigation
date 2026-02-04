import { View, Text, Pressable } from "react-native";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import styles from "./NavbarStyle";
import { lightTheme, darkTheme } from "../../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export default function Navbar() {
  const { darkMode, toggleTheme, cartCount } = useContext(ShopContext);
  const theme = darkMode ? darkTheme : lightTheme;
  const router = useRouter();
  const pathname = usePathname();

  const showBack = pathname !== "/";

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      
      {/* LEFT SIDE */}
      <View style={styles.leftSection}>
        {showBack && (
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={22} color={theme.text} />
          </Pressable>
        )}

        <Ionicons name="bag-handle" size={24} color={theme.text} />
        <Text style={[styles.title, { color: theme.text }]}>GainsHub</Text>
      </View>

      {/* RIGHT SIDE */}
      <View style={styles.rightSection}>
        <Pressable onPress={() => router.push("/cart")} style={styles.cartIconWrapper}>
          <Ionicons name="cart" size={24} color={theme.text} />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </Pressable>

        <Pressable
          onPress={toggleTheme}
          style={[styles.themeBtn, { backgroundColor: theme.button }]}
        >
          <Text style={{ color: "#fff", fontSize: 12 }}>
            {darkMode ? "Light" : "Dark"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
