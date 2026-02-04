import React from "react";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
import { Product } from "../../context/ShopContext";

type Props = {
  item: Product & { quantity: number };
  theme: any;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function AnimatedCartItem({
  item,
  theme,
  increaseQty,
  decreaseQty,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: theme.card,
        padding: 16,
        borderRadius: 12,
        marginBottom: 14,
      }}
    >
      <Text style={{ color: theme.text, fontSize: 16, fontWeight: "600" }}>
        {item.name}
      </Text>

      <Text style={{ color: theme.text, marginVertical: 6 }}>
        ${item.price * item.quantity}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <AnimatedButton title="−" onPress={() => decreaseQty(item.id)} style={{ backgroundColor: theme.button, padding: 10, borderRadius: 8 }} textStyle={{ color: "#fff" }} />
        <Text style={{ color: theme.text, fontSize: 16 }}>{item.quantity}</Text>
        <AnimatedButton title="+" onPress={() => increaseQty(item.id)} style={{ backgroundColor: theme.button, padding: 10, borderRadius: 8 }} textStyle={{ color: "#fff" }} />
      </View>
    </View>
  );
}
