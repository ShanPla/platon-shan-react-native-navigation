import { View, Text, Image, ScrollView, Alert, BackHandler } from "react-native";
import { useContext, useCallback } from "react";
import { ShopContext } from "../../context/ShopContext";
import { lightTheme, darkTheme } from "../../styles/theme";
import ScreenWrapper from "../../components/ScreenWrapper/ScreenWrapper";
import Navbar from "../../components/Navbar/Navbar";
import AnimatedButton from "../../components/AnimatedButton/AnimatedButton";
import styles from "../../styles/CheckoutStyles";
import { useRouter, useFocusEffect } from "expo-router";

export default function Checkout() {
  const { cart, darkMode, removeItem, selectedItems } = useContext(ShopContext);
  const theme = darkMode ? darkTheme : lightTheme;
  const router = useRouter();
  const selectedCartItems = cart.filter(item => selectedItems.includes(item.id));

  const productImages: { [key: string]: any } = {
    "1": require("../../assets/product-images/db-set.webp"),
    "2": require("../../assets/product-images/barbell.jpg"),
    "3": require("../../assets/product-images/whey.jpg"),
    "4": require("../../assets/product-images/creatine.avif"),
    "5": require("../../assets/product-images/powerrack.jpg"),
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Cancel Checkout?", "Your order is not completed yet.", [
          { text: "Stay", style: "cancel" },
          { text: "Go back", style: "destructive", onPress: () => router.back() },
        ]);
        return true;
      };

      const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => sub.remove();
    }, [])
  );

  const handleCheckout = () => {
    if (selectedCartItems.length === 0) {
      Alert.alert("No items selected", "Please select items to checkout.");
      return;
    }

    Alert.alert(
      "Confirm Checkout",
      `Are you sure you want to purchase ${selectedCartItems.length} item(s) for $${selectedCartItems
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2)}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            selectedCartItems.forEach(item => removeItem(item.id));
            Alert.alert("Success", "Checkout successful!");
            router.replace("/");
          },
        },
      ]
    );
  };

  const totalItems = selectedCartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <ScreenWrapper>
      <Navbar />

      {selectedCartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={{ fontSize: 80 }}>📦</Text>
          <Text style={[styles.emptyText, { color: theme.text }]}>
            No items selected for checkout
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={[styles.header, { color: theme.text }]}>Order Summary</Text>

            {selectedCartItems.map((item) => (
              <View key={item.id} style={[styles.itemCard, { backgroundColor: theme.card }]}>
                <Image
                  source={productImages[item.id]}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
                  <Text style={[styles.itemQuantity, { color: theme.text }]}>
                    Quantity: {item.quantity}
                  </Text>
                  <Text style={[styles.itemPrice, { color: theme.text }]}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.summaryContainer}>
              <Text style={[styles.summaryText, { color: theme.text }]}>
                Total items: {totalItems}
              </Text>
              <Text style={[styles.summaryText, { color: theme.text }]}>
                Total Price: ${totalPrice.toFixed(2)}
              </Text>
            </View>
          </ScrollView>

          <View style={[styles.checkoutFooter, { backgroundColor: theme.background }]}>
            <AnimatedButton
              title="Checkout Selected Items"
              onPress={handleCheckout}
              style={[styles.button, { backgroundColor: theme.button }]}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
}
