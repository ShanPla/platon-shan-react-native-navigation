import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  iconBtn: {
    marginRight: 6,
  },

  themeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  cartIconWrapper: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    backgroundColor: "#ff3b30",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
