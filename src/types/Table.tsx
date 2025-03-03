import { DetailedAuthor } from "./Author";
import { DetailedBook } from "./Books";

export interface TableProps {
  data:
    | DetailedAuthor[]
    | DetailedBook[]
    | undefined
    | { id: number; author: string; book: string }[];
  readonly columns?: { header: string; accessorKey: string }[];
  readonly useDelete?: boolean;
  readonly type: "books" | "authors";
  readonly title?: string;
  readonly deleteFunc?: (id: number | string) => void;
  saveFunc?:
    | ((author: DetailedAuthor) => void)
    | ((book: DetailedBook) => void);
}
