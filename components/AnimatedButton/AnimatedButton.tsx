import React, { useRef } from "react";
import {
  Pressable,
  Animated,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function AnimatedButton({
  title,
  onPress,
  style,
  textStyle,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      speed: 30,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      speed: 20,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      hitSlop={10}
    >
      <Animated.View
        style={[
          style,
          {
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={textStyle}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}
