import { View, Text, FlatList, Alert, BackHandler } from "react-native";
import { useContext, useCallback } from "react";
import { ShopContext } from "../../context/ShopContext";
import { lightTheme, darkTheme } from "../../styles/theme";
import ScreenWrapper from "../../components/ScreenWrapper/ScreenWrapper";
import Navbar from "../../components/Navbar/Navbar";
import AnimatedButton from "../../components/AnimatedButton/AnimatedButton";
import styles from "../../styles/CheckoutStyles";
import { useRouter, useFocusEffect } from "expo-router";

export default function Checkout() {
  const { cart, totalPrice, darkMode, clearCart } = useContext(ShopContext);
  const theme = darkMode ? darkTheme : lightTheme;
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Cancel Checkout?", "Your order is not completed yet.", [
          { text: "Stay", style: "cancel" },
          {
            text: "Go back",
            style: "destructive",
            onPress: () => router.back(),
          },
        ]);
        return true;
      };

      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => sub.remove();
    }, [])
  );

  const handleCheckout = () => {
    Alert.alert("Success", "Checkout successful", [
      {
        text: "OK",
        onPress: () => {
          clearCart();
          router.replace("/");
        },
      },
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
