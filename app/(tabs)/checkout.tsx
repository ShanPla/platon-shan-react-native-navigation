import { View, Text, FlatList, Alert, BackHandler } from "react-native";
import { useContext, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import { lightTheme, darkTheme } from "../../styles/theme";
import ScreenWrapper from "../../components/ScreenWrapper/ScreenWrapper";
import Navbar from "../../components/Navbar/Navbar";
import AnimatedButton from "../../components/AnimatedButton/AnimatedButton";
import styles from "../../styles/CheckoutStyles";
import { useRouter, useNavigation } from "expo-router";

export default function Checkout() {
  const { cart, totalPrice, darkMode } = useContext(ShopContext);
  const theme = darkMode ? darkTheme : lightTheme;
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const confirmLeave = () => {
      Alert.alert("Cancel Checkout?", "Your order is not completed yet.", [
        { text: "Stay", style: "cancel" },
        { text: "Leave", style: "destructive", onPress: () => router.replace("/") },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      confirmLeave
    );

    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      confirmLeave();
    });

    return () => {
      backHandler.remove();
      unsubscribe();
    };
  }, [navigation]);

  const handleCheckout = () => {
    Alert.alert("Success", "Checkout successful", [
      { text: "OK", onPress: () => router.replace("/") },
    ]);
  };

  return (
    <ScreenWrapper>
      <Navbar />

      {cart.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 40 }}>
          <Text style={{ fontSize: 60 }}>📦</Text>
          <Text style={{ color: theme.text, fontSize: 18, marginTop: 10 }}>
            No items to checkout
          </Text>
        </View>
      ) : (
        <>
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
        </>
      )}
    </ScreenWrapper>
  );
}
