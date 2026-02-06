import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
import { Product } from "../../context/ShopContext";

type Props = {
  item: Product & { quantity: number };
  theme: any;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  onRemove?: (id: string) => void;
  productImage?: any;
  selected?: boolean;
  toggleSelect?: (id: string) => void;
};

export default function AnimatedCartItem({
  item,
  theme,
  increaseQty,
  decreaseQty,
  onRemove,
  productImage,
  selected = true,
  toggleSelect,
}: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pan = useRef(new Animated.ValueXY()).current;

  const animateQuantity = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  // PanResponder for swipe-to-delete
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 20,
      onPanResponderMove: Animated.event([null, { dx: pan.x }], { useNativeDriver: false }),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -120 && onRemove) {
          Animated.timing(pan.x, { toValue: -500, duration: 200, useNativeDriver: true }).start(() => {
            onRemove(item.id);
          });
        } else {
          Animated.spring(pan.x, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          transform: [{ translateX: pan.x }],
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 3,
        },
      ]}
      {...panResponder.panHandlers}
    >
      {/* Image on the left */}
      {productImage && (
        <Image source={productImage} style={styles.productImage} resizeMode="cover" />
      )}

      {/* Right content */}
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.price, { color: theme.text }]}>
          ${ (item.price * item.quantity).toFixed(2) }
        </Text>

        {/* Quantity controls */}
        <View style={styles.row}>
          <TouchableWithoutFeedback>
            <AnimatedButton
              title="−"
              onPress={() => {
                decreaseQty(item.id);
                animateQuantity();
              }}
              style={[styles.qtyBtn, { backgroundColor: theme.button }]}
              textStyle={{ color: "#fff", fontWeight: "700" }}
            />
          </TouchableWithoutFeedback>

          <Animated.Text
            style={{
              color: theme.text,
              fontSize: 16,
              fontWeight: "600",
              marginHorizontal: 10,
              transform: [{ scale: scaleAnim }],
            }}
          >
            {item.quantity}
          </Animated.Text>

          <TouchableWithoutFeedback>
            <AnimatedButton
              title="+"
              onPress={() => {
                increaseQty(item.id);
                animateQuantity();
              }}
              style={[styles.qtyBtn, { backgroundColor: theme.button }]}
              textStyle={{ color: "#fff", fontWeight: "700" }}
            />
          </TouchableWithoutFeedback>

          {/* Select button */}
          {toggleSelect && (
            <TouchableOpacity
              onPress={() => toggleSelect(item.id)}
              style={[
                styles.selectBtn,
                { backgroundColor: selected ? theme.button : theme.card },
              ]}
            >
              <Text style={{ color: selected ? "#fff" : theme.text, fontWeight: "600" }}>
                {selected ? "Selected ✅" : "Select"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    opacity: 0.85,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    flexWrap: "wrap",
  },
  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectBtn: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
});
