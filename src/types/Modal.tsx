import { DetailedAuthor } from "./Author";
import { DetailedBook } from "./Books";

export interface ModalProps {
  readonly open: boolean;

  onClose: () => void;
  readonly type: "books" | "authors";
  saveFunc?:
    | ((author: DetailedAuthor) => void)
    | ((book: DetailedBook) => void);
}
