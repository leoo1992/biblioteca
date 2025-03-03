import { TableData } from "./Table";

export interface ShowInfos {
  readonly data: TableData[] | undefined;
  readonly open: boolean;
  onClose: () => void;
  readonly type: "books" | "authors";
}
