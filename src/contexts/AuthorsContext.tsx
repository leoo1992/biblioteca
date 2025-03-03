import { useState, useEffect, useMemo, useCallback } from "react";
import { Author, AuthorsProviderProps, DetailedAuthor } from "../types/Author";
import { AuthorsContext } from "../hooks/useAuthorsContext";

export const AuthorsProvider = ({ children }: AuthorsProviderProps) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [detailedAuthors, setDetailedAuthors] = useState<DetailedAuthor[]>([]);

  const resumeColumns = useMemo(
    () => [
      {
        header: "",
        accessorKey: "id",
      },
      {
        header: "Autor",
        accessorKey: "author",
      },
    ],
    []
  );

  const detailedColumns = useMemo(
    () => [
      {
        header: "",
        accessorKey: "id",
      },
      {
        header: "Autor",
        accessorKey: "author",
      },
      {
        header: "Nacionalidade  ",
        accessorKey: "nationality",
      },
      {
        header: "Estado",
        accessorKey: "state",
      },
      {
        header: "Cidade",
        accessorKey: "city",
      },
    ],
    []
  );

  useEffect(() => {
    const storedAuthors = JSON.parse(localStorage.getItem("authors") ?? "[]");
    setDetailedAuthors(storedAuthors);
    setAuthors(storedAuthors);
  }, []);

  const saveAuthor = useCallback(
    (author: DetailedAuthor) => {
      const updatedAuthors = [...detailedAuthors, author];
      setAuthors(updatedAuthors);
      setDetailedAuthors(updatedAuthors);
      localStorage.setItem("authors", JSON.stringify(updatedAuthors));
    },
    [detailedAuthors]
  );

  const deleteAuthor = useCallback(
    (id: number | string) => {
      const updatedAuthors = detailedAuthors.filter(
        (author) => author.id !== id
      );
      setAuthors(updatedAuthors);
      setDetailedAuthors(updatedAuthors);
      localStorage.setItem("authors", JSON.stringify(updatedAuthors));
    },
    [detailedAuthors]
  );

  const value = useMemo(
    () => ({
      saveAuthor,
      deleteAuthor,
      authors,
      resumeColumns,
      detailedColumns,
      detailedAuthors,
    }),
    [
      saveAuthor,
      deleteAuthor,
      authors,
      resumeColumns,
      detailedColumns,
      detailedAuthors,
    ]
  );

  return (
    <AuthorsContext.Provider value={value}>{children}</AuthorsContext.Provider>
  );
};
