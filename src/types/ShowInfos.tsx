import { Author, DetailedAuthor } from "./Author";
import { Book, DetailedBook } from "./Books";

export interface ShowInfos {
  readonly data: (DetailedAuthor | DetailedBook | Book | Author)[] | undefined;
  readonly open: boolean;
  onClose: () => void;
  readonly type: "books" | "authors";
}
