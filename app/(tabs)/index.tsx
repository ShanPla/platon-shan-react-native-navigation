import { View, Text, FlatList, Image, Alert, BackHandler } from "react-native";
import { useContext, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { ShopContext } from "../../context/ShopContext";
import styles from "../../styles/HomeStyle";
import { lightTheme, darkTheme } from "../../styles/theme";
import AnimatedButton from "../../components/AnimatedButton/AnimatedButton";
import Navbar from "../../components/Navbar/Navbar";
import ScreenWrapper from "../../components/ScreenWrapper/ScreenWrapper";

export default function Home() {
  const { products, addToCart, darkMode } = useContext(ShopContext);
  const theme = darkMode ? darkTheme : lightTheme;
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Exit App?", "Are you sure you want to exit?", [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", style: "destructive", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [])
  );

  const productImages: { [key: string]: any } = {
    "1": require("../../assets/product-images/db-set.webp"),
    "2": require("../../assets/product-images/barbell.jpg"),
    "3": require("../../assets/product-images/whey.jpg"),
    "4": require("../../assets/product-images/creatine.avif"),
    "5": require("../../assets/product-images/powerrack.jpg"),
  };

  return (
    <ScreenWrapper style={{ backgroundColor: theme.background }}>
      <Navbar />

      <Text style={[styles.header, { color: theme.text }]}>
        Gym Equipment & Supplements
      </Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 15 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Image
              source={productImages[item.id]}
              style={styles.productImage}
              resizeMode="contain"
            />

            <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
            <Text style={[styles.price, { color: theme.text }]}>
              ${item.price.toFixed(2)}
            </Text>

            <AnimatedButton
              title="Add to Cart"
              onPress={() => {
                addToCart(item);
                Alert.alert("Added to cart!", `${item.name} added 🛒`);
              }}
              style={[styles.button, { backgroundColor: theme.button }]}
              textStyle={styles.buttonText}
            />
          </View>
        )}
      />

      <AnimatedButton
        title="Go to Cart"
        onPress={() => router.replace("/cart")}
        style={[styles.cartBtn, { backgroundColor: theme.button }]}
        textStyle={styles.buttonText}
      />
    </ScreenWrapper>
  );
}
