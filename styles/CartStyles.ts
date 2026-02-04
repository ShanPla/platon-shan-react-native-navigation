import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    fontSize: 15,
    marginTop: 4,
    opacity: 0.7,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  qtyBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#CBD5E1",
    borderRadius: 8,
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },
  checkoutBtn: {
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 15,
  },
  button: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
