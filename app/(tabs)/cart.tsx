import { View, Text, FlatList } from "react-native";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { lightTheme, darkTheme } from "../../styles/theme";
import Navbar from "../../components/Navbar/Navbar";
import ScreenWrapper from "../../components/ScreenWrapper/ScreenWrapper";
import AnimatedCartItem from "../../components/AnimatedCartItem/AnimatedCartItem";
import styles from "../../styles/CartStyles";
import AnimatedButton from "../../components/AnimatedButton/AnimatedButton";
import { useRouter } from "expo-router";

export default function Cart() {
  const { cart, totalPrice, darkMode, increaseQty, decreaseQty } =
    useContext(ShopContext);
  const theme = darkMode ? darkTheme : lightTheme;
  const router = useRouter();

  return (
    <ScreenWrapper>
      <Navbar />

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <AnimatedCartItem
            item={item}
            theme={theme}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
          />
        )}
      />

      <Text style={[styles.total, { color: theme.text }]}>
        Total: ${totalPrice}
      </Text>

      <AnimatedButton
        title="Proceed to Checkout"
        onPress={() => router.push("/checkout")}
        style={[styles.button, { backgroundColor: theme.button }]}
        textStyle={styles.buttonText}
      />
    </ScreenWrapper>
  );
}
