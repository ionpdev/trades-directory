"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (tradespersonId: string) => void;
  removeFavorite: (tradespersonId: string) => void;
  isFavorite: (tradespersonId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Load favorites from localStorage for this user
      const key = `favorites_${user.id}`;
      const storedFavorites = localStorage.getItem(key);
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites));
        } catch (error) {
          console.error("Failed to parse favorites:", error);
          setFavorites([]);
        }
      }
    } else {
      setFavorites([]);
    }
  }, [user]);

  const addFavorite = (tradespersonId: string) => {
    if (!user) return;

    setFavorites((prev) => {
      const newFavorites = [...prev, tradespersonId];
      localStorage.setItem(
        `favorites_${user.id}`,
        JSON.stringify(newFavorites)
      );
      return newFavorites;
    });
  };

  const removeFavorite = (tradespersonId: string) => {
    if (!user) return;

    setFavorites((prev) => {
      const newFavorites = prev.filter((id) => id !== tradespersonId);
      localStorage.setItem(
        `favorites_${user.id}`,
        JSON.stringify(newFavorites)
      );
      return newFavorites;
    });
  };

  const isFavorite = (tradespersonId: string) => {
    return favorites.includes(tradespersonId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
