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
  totalPrice: number;
  cartCount: number;
  darkMode: boolean;
  toggleTheme: () => void;
};

export const ShopContext = createContext<ShopContextType>({} as ShopContextType);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = [
    { id: "1", name: "Dumbbell Set", price: 120 },
    { id: "2", name: "Barbell", price: 180 },
    { id: "3", name: "Protein Powder", price: 60 },
    { id: "4", name: "Creatine", price: 35 },
    { id: "5", name: "Workout Gloves", price: 20 },
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

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
        toggleTheme: () => setDarkMode(!darkMode),
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
