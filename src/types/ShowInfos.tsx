import { DetailedAuthor } from "./Author";
import { DetailedBook } from "./Books";

export interface ShowInfos {
  data: (DetailedAuthor | DetailedBook)[] | undefined;
  open: boolean;
  onClose: () => void;
  readonly type: "books" | "authors";
}
