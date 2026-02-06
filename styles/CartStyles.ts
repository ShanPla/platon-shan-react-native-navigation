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
    fontWeight: "700",
    marginTop: 10,
  },
  emptySubText: {
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  card: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
  },
  price: {
    fontSize: 14,
    marginTop: 2,
    opacity: 0.7,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: "600",
  },
  total: {
    fontSize: 22,
    fontWeight: "700",
  },
  footer: {
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
  selectBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  selectBtnText: {
    fontSize: 14,
    fontWeight: "600",
  },
  selectAllBtn: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  selectAllText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
