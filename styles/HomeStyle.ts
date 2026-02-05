import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    marginVertical: 5,
  },
  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  cartBtn: {
    padding: 11,
    borderRadius: 12,
    alignItems: "center",
    margin: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
});
