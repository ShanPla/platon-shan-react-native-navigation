import { View, Text, FlatList, Alert, BackHandler, TouchableOpacity } from "react-native";
import { useContext, useCallback } from "react";
import { ShopContext } from "../../context/ShopContext";
import { lightTheme, darkTheme } from "../../styles/theme";
import Navbar from "../../components/Navbar/Navbar";
import ScreenWrapper from "../../components/ScreenWrapper/ScreenWrapper";
import AnimatedButton from "../../components/AnimatedButton/AnimatedButton";
import AnimatedCartItem from "../../components/AnimatedCartItem/AnimatedCartItem";
import styles from "../../styles/CartStyles";
import { useRouter, useFocusEffect } from "expo-router";

export default function Cart() {
  const {
    cart,
    darkMode,
    increaseQty,
    decreaseQty,
    removeItem,
    selectedItems,
    toggleSelectItem,
    selectAllItems,
    deselectAllItems,
  } = useContext(ShopContext);

  const theme = darkMode ? darkTheme : lightTheme;
  const router = useRouter();

  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) deselectAllItems();
    else selectAllItems();
  };

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
        Alert.alert("Go back to Home?", "Your items will stay saved.", [
          { text: "Stay", style: "cancel" },
          { text: "Go back", style: "destructive", onPress: () => router.replace("/") },
        ]);
        return true;
      };
      const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => sub.remove();
    }, [])
  );

  const selectedTotal = cart
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <ScreenWrapper>
      <Navbar />

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={{ fontSize: 80 }}>🛒</Text>
          <Text style={[styles.emptyText, { color: theme.text }]}>
            Your cart is empty
          </Text>
          <Text style={[styles.emptySubText, { color: "gray" }]}>
            Add some gym gear to get started! 💪
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/* Select All button */}
          <TouchableOpacity
            onPress={toggleSelectAll}
            style={{
              backgroundColor: selectedItems.length === cart.length ? theme.button : "#ddd",
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 10,
              alignSelf: "flex-start",
              margin: 15,
            }}
          >
            <Text
              style={{
                color: selectedItems.length === cart.length ? "#fff" : "#333",
                fontWeight: "700",
              }}
            >
              {selectedItems.length === cart.length ? "Deselect All" : "Select All"}
            </Text>
          </TouchableOpacity>

          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 15, paddingBottom: 120 }}
            renderItem={({ item }) => (
              <AnimatedCartItem
                item={item}
                theme={theme}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                onRemove={removeItem}
                productImage={productImages[item.id]}
                selected={selectedItems.includes(item.id)}
                toggleSelect={toggleSelectItem}
              />
            )}
          />

          <View style={[styles.footer, { backgroundColor: theme.background }]}>
            <Text style={[styles.total, { color: theme.text }]}>
              Selected Total: ${selectedTotal.toFixed(2)}
            </Text>

            <AnimatedButton
              title="Proceed to Checkout"
              onPress={() => router.push("/checkout")}
              style={[styles.button, { backgroundColor: theme.button }]}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
}
