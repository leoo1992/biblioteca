import { createContext, useContext } from "react";
import { AuthorsContextType } from "../types/Author";

export const AuthorsContext = createContext<AuthorsContextType | undefined>(
  undefined
);

export const useAuthorsContext = () => {
  const context = useContext(AuthorsContext);
  if (context === undefined) {
    throw new Error(
      "useAuthorsContext deve ser usado dentro de um AuthorsProvider"
    );
  }
  return context;
};
