import { Author } from "./Author";
import { Book } from "./Books";

export interface DataItem {
  id: number;
  book?: string;
  name?: string;
}

export interface ConfirmProps {
  data: DataItem[] | Author[] | Book[] | undefined;
  columns?: { header: string; accessorKey: string }[];
  open: boolean;
  onClose: () => void;
  readonly type: "books" | "authors";
  deleteFunc: (id: number | string) => void;
}
