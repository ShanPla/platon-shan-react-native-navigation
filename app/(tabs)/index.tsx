import { View, Text, FlatList, Alert } from "react-native";
import { useContext } from "react";
import { useRouter } from "expo-router";
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

  return (
    <ScreenWrapper style={{ backgroundColor: theme.background }}>
      <Navbar />

      <Text style={[styles.header, { color: theme.text }]}>
        Gym Equipment & Supplements
      </Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>

            <Text style={{ color: theme.text, marginVertical: 6 }}>
              ${item.price}
            </Text>

            <AnimatedButton
              title="Add to Cart"
              onPress={() => {
                addToCart(item);
                Alert.alert("Added to cart!", `${item.name} was added to your cart 🛒`);
              }}
              style={[styles.button, { backgroundColor: theme.button }]}
              textStyle={styles.buttonText}
            />
          </View>
        )}
      />
      <AnimatedButton
        title="Go to Cart"
        onPress={() => router.push("/cart")}
        style={[styles.cartBtn, { backgroundColor: theme.button }]}
        textStyle={styles.buttonText}
      />
    </ScreenWrapper>
  );
}
