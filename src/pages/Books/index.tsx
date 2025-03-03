import styles from "./Books.module.css";
import TableComponent from "../../components/TableComponent";
import { useBooksContext } from "../../hooks/useBooksContext";

export default function Books() {
  const { detailedBooks, columns, saveBook, deleteBook } = useBooksContext();

  return (
    <section className={styles.books}>
      <TableComponent
        data={detailedBooks}
        columns={columns}
        type={"books"}
        title="Livros"
        saveFunc={saveBook}
        deleteFunc={deleteBook}
      />
    </section>
  );
}
