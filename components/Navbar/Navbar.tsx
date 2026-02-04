import { View, Text, Pressable } from "react-native";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import styles from "./NavbarStyle";
import { lightTheme, darkTheme } from "../../styles/theme";

export default function Navbar() {
  const { darkMode, toggleTheme } = useContext(ShopContext);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <Text style={[styles.title, { color: theme.text }]}>🛍 Shopify</Text>

      <Pressable
        onPress={toggleTheme}
        style={[styles.themeBtn, { backgroundColor: theme.button }]}
      >
        <Text style={{ color: "#fff" }}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Text>
      </Pressable>
    </View>
  );
}
