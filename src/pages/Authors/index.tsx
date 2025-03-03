import styles from "./Authors.module.css";
import TableComponent from "../../components/TableComponent";
import { useAuthorsContext } from "../../hooks/useAuthorsContext";

export default function Index() {
  const { detailedAuthors, resumeColumns, saveAuthor, deleteAuthor } =
    useAuthorsContext();

  return (
    <section className={styles.authors}>
      <TableComponent
        data={detailedAuthors}
        columns={resumeColumns}
        type={"authors"}
        title="Autores"
        saveFunc={saveAuthor}
        deleteFunc={deleteAuthor}
      />
    </section>
  );
}
