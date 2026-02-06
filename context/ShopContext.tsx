import React, { createContext, useState, ReactNode } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
};

type CartItem = Product & { quantity: number };

type ShopContextType = {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeItem: (id: string) => void;
  totalPrice: number;
  cartCount: number;
  darkMode: boolean;
  toggleTheme: () => void;
  clearCart: () => void;
  selectedItems: string[];
  toggleSelectItem: (id: string) => void;
  selectAllItems: () => void;
  deselectAllItems: () => void;
};

export const ShopContext = createContext<ShopContextType>({} as ShopContextType);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const clearCart = () => setCart([]);
  const products: Product[] = [
    { id: "1", name: "Dumbbell Set", price: 120 },
    { id: "2", name: "Barbell", price: 180 },
    { id: "3", name: "Protein Powder", price: 60 },
    { id: "4", name: "Creatine", price: 35 },
    { id: "5", name: "Power Rack", price: 500 },
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setSelectedItems(prev => [...prev, product.id]);
  };

  const increaseQty = (id: string) =>
    setCart(prev =>
      prev.map(p => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );

  const decreaseQty = (id: string) =>
    setCart(prev =>
      prev
        .map(p => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter(p => p.quantity > 0)
    );

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(i => i !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAllItems = () => setSelectedItems(cart.map(item => item.id));
  const deselectAllItems = () => setSelectedItems([]);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        totalPrice,
        cartCount,
        darkMode,
        clearCart,
        removeItem,
        toggleTheme: () => setDarkMode(!darkMode),
        selectedItems,
        toggleSelectItem,
        selectAllItems,
        deselectAllItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
