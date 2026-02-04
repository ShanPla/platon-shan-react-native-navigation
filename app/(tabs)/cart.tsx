import { View, Text, FlatList, Alert, BackHandler } from "react-native";
import { useContext, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import { lightTheme, darkTheme } from "../../styles/theme";
import Navbar from "../../components/Navbar/Navbar";
import ScreenWrapper from "../../components/ScreenWrapper/ScreenWrapper";
import AnimatedCartItem from "../../components/AnimatedCartItem/AnimatedCartItem";
import styles from "../../styles/CartStyles";
import AnimatedButton from "../../components/AnimatedButton/AnimatedButton";
import { useRouter, useNavigation } from "expo-router";

export default function Cart() {
  const { cart, totalPrice, darkMode, increaseQty, decreaseQty } =
    useContext(ShopContext);
  const theme = darkMode ? darkTheme : lightTheme;
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const confirmLeave = () => {
      Alert.alert("Leave Cart?", "Your items will stay saved.", [
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

  return (
    <ScreenWrapper>
      <Navbar />

      {cart.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 40 }}>
          <Text style={{ fontSize: 60 }}>🛒</Text>
          <Text style={{ color: theme.text, fontSize: 18, marginTop: 10 }}>
            Your cart is empty
          </Text>
          <Text style={{ color: "gray", marginTop: 5 }}>
            Add some gym gear to get started! 💪
          </Text>
        </View>
      ) : (
        <>
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
        </>
      )}
    </ScreenWrapper>
  );
}
