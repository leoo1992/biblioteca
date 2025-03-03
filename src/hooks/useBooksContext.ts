import { createContext, useContext } from "react";
import { BooksContextType } from "../types/Books";

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined
);

export const useBooksContext = () => {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error(
      "useBooksContext deve ser usado dentro de um BooksProvider"
    );
  }
  return context;
};
