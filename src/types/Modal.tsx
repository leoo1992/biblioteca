import { DetailedAuthor } from "./Author";
import { DetailedBook } from "./Books";

export interface ModalProps {
  open: boolean;

  onClose: () => void;
  type: "books" | "authors";

  saveFunc?:
    | ((author: DetailedAuthor) => void)
    | ((book: DetailedBook) => void);
}
