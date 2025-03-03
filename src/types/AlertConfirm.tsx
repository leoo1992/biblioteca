import { TableData } from "./Table";

export interface DataItem {
  id: number;
  book?: string;
  name?: string;
}

export interface ConfirmProps {
  data: TableData[] | undefined;
  columns?: { header: string; accessorKey: string }[];
  open: boolean;
  onClose: () => void;
  readonly type: "books" | "authors";
  deleteFunc: (id: number | string) => void;
}
