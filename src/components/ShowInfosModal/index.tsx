import styles from "./ShowInfosModal.module.css";
import { AlertDialog, Button, Flex, Inset } from "@radix-ui/themes";
import { ShowInfos } from "../../types/ShowInfos";
import { useAuthorsContext } from "../../hooks/useAuthorsContext";
import { useBooksContext } from "../../hooks/useBooksContext";
import { useEffect, useState } from "react";
import { Author, DetailedAuthor } from "../../types/Author";
import { Book, DetailedBook } from "../../types/Books";

export default function ShowInfosModal({
  open,
  data,
  onClose,
  type,
}: Readonly<ShowInfos>) {
  const [infos, setInfos] = useState<
    DetailedBook | DetailedAuthor | Author | Book | null
  >(null);
  const { detailedAuthors, detailedColumns } = useAuthorsContext();
  const { detailedBooks, detailedBColumns } = useBooksContext();

  let title = "Nenhum dado encontrado";
  if (infos) {
    title = type === "authors" ? "Detalhes do Autor" : "Detalhes do Livro";
  }

  useEffect(() => {
    if (!data || data.length === 0 || !type) {
      onClose();
      return;
    }

    const idSearch = data[0]?.id;
    if (!idSearch) {
      onClose();
      return;
    }

    let foundInfo: DetailedBook | DetailedAuthor | Author | Book | undefined;

    if (type === "authors") {
      foundInfo = detailedAuthors.find((author) => author.id === idSearch);
    } else if (type === "books") {
      foundInfo = detailedBooks.find((book) => book.id === idSearch);
    }

    if (!foundInfo) {
      onClose();
      return;
    }

    setInfos(foundInfo);
  }, [data, type, detailedAuthors, detailedBooks, onClose]);

  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Content width="350" maxWidth="400" align="center">
        <AlertDialog.Title align="center" color="iris" size="4">
          {title}
        </AlertDialog.Title>
        <AlertDialog.Description
          size="2"
          align="center"
          mt="3"
          color="iris"
          weight="bold"
        ></AlertDialog.Description>
        <Inset side="x" mt="4" mb="6" className={styles.inset}>
          {infos ? (
            <table className={styles.container}>
              <tbody>
                {(type === "authors" ? detailedColumns : detailedBColumns).map(
                  ({ header, accessorKey }) => (
                    <tr key={accessorKey} className={styles.row}>
                      <td className={`${styles.cell} ${styles.bold}`}>
                        {header ? header : "Id"}:
                      </td>
                      <td className={`${styles.cell} ${styles.normal}`}>
                        {infos?.[accessorKey as keyof typeof infos] ?? "N/A"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <p className={styles.message}>
              Não foi possível encontrar os detalhes.
            </p>
          )}
        </Inset>
        <Flex justify="end">
          <AlertDialog.Cancel>
            <Button color="iris" onClick={onClose}>
              Voltar
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
