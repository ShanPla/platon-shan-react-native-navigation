import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
  },
  card: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    marginVertical: 6,
    opacity: 0.8,
  },
  button: {
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  cartBtn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    elevation: 5,
  },
});
