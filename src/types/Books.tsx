import { ReactNode } from "react";

export interface Book {
  id: number | string;
  book: string;
  author: string;
}

export interface DetailedBook {
  id: number | string;
  book: string;
  author: string;
  recommendedAge: number;
  pages: number;
  price: number;
  publicationYear: number;
}

export interface Column {
  header: string;
  accessorKey: string;
}

export interface BooksContextType {
  books: Book[];
  detailedBooks: DetailedBook[];
  saveBook: (book: DetailedBook) => void;
  deleteBook: (id: number | string) => void;
  columns: Column[];
  detailedBColumns: Column[];
}

export interface BooksProviderProps {
  children: ReactNode;
}
