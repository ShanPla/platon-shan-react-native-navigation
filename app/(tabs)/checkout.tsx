import { View, Text, FlatList, Alert } from "react-native";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { lightTheme, darkTheme } from "../../styles/theme";
import ScreenWrapper from "../../components/ScreenWrapper/ScreenWrapper";
import Navbar from "../../components/Navbar/Navbar";
import AnimatedButton from "../../components/AnimatedButton/AnimatedButton";
import styles from "../../styles/CheckoutStyles";
import { useRouter } from "expo-router";

export default function Checkout() {
  const { cart, totalPrice, darkMode } = useContext(ShopContext);
  const theme = darkMode ? darkTheme : lightTheme;
  const router = useRouter();

  const handleCheckout = () => {
    Alert.alert("Success", "Checkout successful", [
      { text: "OK", onPress: () => router.replace("/") },
    ]);
  };

  return (
    <ScreenWrapper>
      <Navbar />

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <Text style={[styles.item, { color: theme.text }]}>
            {item.name} x{item.quantity} — ${item.price * item.quantity}
          </Text>
        )}
      />

      <Text style={[styles.total, { color: theme.text }]}>
        Total: ${totalPrice}
      </Text>

      <AnimatedButton
        title="Checkout"
        onPress={handleCheckout}
        style={[styles.button, { backgroundColor: theme.button }]}
        textStyle={styles.buttonText}
      />
    </ScreenWrapper>
  );
}
