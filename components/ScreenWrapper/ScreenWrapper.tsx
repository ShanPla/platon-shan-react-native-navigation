import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { ReactNode, useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { lightTheme, darkTheme } from "../../styles/theme";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function ScreenWrapper({ children }: Props) {
  const { darkMode } = useContext(ShopContext);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
