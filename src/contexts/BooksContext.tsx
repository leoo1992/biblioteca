import { useState, useEffect, useMemo, useCallback } from "react";
import { Book, BooksProviderProps, DetailedBook } from "../types/Books";
import { BooksContext } from "../hooks/useBooksContext";

export const BooksProvider = ({ children }: BooksProviderProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [detailedBooks, setDetailedBooks] = useState<DetailedBook[]>([]);

  const columns = useMemo(
    () => [
      {
        header: "",
        accessorKey: "id",
      },
      {
        header: "Livro",
        accessorKey: "book",
      },
      {
        header: "Author",
        accessorKey: "author",
      },
    ],
    []
  );

  const detailedBColumns = useMemo(
    () => [
      {
        header: "",
        accessorKey: "id",
      },
      {
        header: "Livro",
        accessorKey: "book",
      },
      {
        header: "Autor",
        accessorKey: "author",
      },
      {
        header: "Idade Recomendada",
        accessorKey: "recommendedAge",
      },
      {
        header: "Páginas",
        accessorKey: "pages",
      },
      {
        header: "Preço",
        accessorKey: "price",
      },
      {
        header: "Ano de Publicação",
        accessorKey: "publicationYear",
      },
    ],
    []
  );

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books") ?? "[]");
    setDetailedBooks(storedBooks);
    setBooks(storedBooks);
  }, []);

  const saveBook = useCallback(
    (book: DetailedBook) => {
      const updatedBooks = [...detailedBooks, book];
      setBooks(updatedBooks);
      setDetailedBooks(updatedBooks);
      localStorage.setItem("books", JSON.stringify(updatedBooks));
    },
    [detailedBooks]
  );

  const deleteBook = useCallback(
    (id: number | string) => {
      const updatedBooks = detailedBooks.filter((books) => books.id !== id);
      setBooks(updatedBooks);
      setDetailedBooks(updatedBooks);
      localStorage.setItem("books", JSON.stringify(updatedBooks));
    },
    [detailedBooks]
  );

  const value = useMemo(
    () => ({
      books,
      detailedBooks,
      saveBook,
      deleteBook,
      columns,
      detailedBColumns,
    }),
    [books, detailedBooks, saveBook, deleteBook, columns, detailedBColumns]
  );

  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
};
