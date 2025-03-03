import { ReactNode } from "react";

export interface Author {
  id: number | string;
  author: string;
}

export interface DetailedAuthor {
  id: number | string;
  author: string;
  nationality: string;
  state: string;
  city: string;
}

export interface AuthorsContextType {
  authors: Author[];
  detailedAuthors: DetailedAuthor[];
  saveAuthor: (author: DetailedAuthor) => void;
  deleteAuthor: (id: number | string) => void;
  resumeColumns: Column[];
  detailedColumns: Column[];
}

export interface AuthorsProviderProps {
  children: ReactNode;
}

export interface Column {
  header: string;
  accessorKey: string;
}
