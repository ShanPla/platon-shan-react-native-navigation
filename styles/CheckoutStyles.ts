import { StyleSheet } from "react-native";

export default StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: {
    fontSize: 22,
    marginTop: 10,
    fontWeight: "600",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 140,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  itemCard: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
  },
  itemQuantity: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  summaryContainer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  checkoutFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});
