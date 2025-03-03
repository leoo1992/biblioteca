import { useState } from "react";
import {
  Dialog,
  Button,
  Flex,
  TextField,
  Text,
  Select,
} from "@radix-ui/themes";
import { ModalProps } from "../../types/Modal";
import { DetailedAuthor } from "../../types/Author";
import { DetailedBook } from "../../types/Books";
import { useAuthorsContext } from "../../hooks/useAuthorsContext";

export default function Index({
  open,
  onClose,
  type,
  saveFunc,
}: Readonly<ModalProps>) {
  const [authorName, setAuthorName] = useState<string>("");
  const [authorNationality, setAuthorNationality] = useState<string>("");
  const [authorState, setAuthorState] = useState<string>("");
  const [authorCity, setAuthorCity] = useState<string>("");
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [recommendedAge, setRecommendedAge] = useState<number>(0);
  const [pages, setPages] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [publicationYear, setPublicationYear] = useState<number>(
    new Date().getFullYear()
  );

  const { detailedAuthors } = useAuthorsContext();

  const isSaveFuncForAuthor = (
    func: ((author: DetailedAuthor) => void) | ((book: DetailedBook) => void)
  ): func is (author: DetailedAuthor) => void => type === "authors";

  const dialogTitle =
    type === "authors" ? "Adicionar Autor" : "Adicionar Livro";

  const dialogDescription =
    type === "authors"
      ? "Preencha os campos do autor para adicioná-lo à lista."
      : "Preencha os campos para adicionar um novo livro.";

  const handleSave = () => {
    if (!saveFunc) return;

    if (type === "authors") {
      const newAuthor: DetailedAuthor = {
        id: Date.now(),
        author: authorName,
        nationality: authorNationality,
        state: authorState,
        city: authorCity,
      };

      if (isSaveFuncForAuthor(saveFunc)) {
        saveFunc(newAuthor);
      }
    } else if (type === "books") {
      const newBook: DetailedBook = {
        id: Date.now(),
        book: bookTitle,
        author: bookAuthor,
        recommendedAge,
        pages,
        price,
        publicationYear,
      };

      if (!isSaveFuncForAuthor(saveFunc)) {
        saveFunc(newBook);
      }
    }
    onClose();
  };

  const hasAuthors = detailedAuthors.length > 0;

  const isSaveDisabled =
    type === "authors"
      ? !authorName.trim() ||
        !authorNationality.trim() ||
        !authorState.trim() ||
        !authorCity.trim()
      : !bookTitle.trim() ||
        !bookAuthor.trim() ||
        pages <= 0 ||
        price < 0 ||
        publicationYear < 1000 ||
        publicationYear > new Date().getFullYear() ||
        !hasAuthors;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        onClose();
      }}
    >
      <Dialog.Content maxWidth="450px" aria-describedby="dialog-description">
        <Dialog.Title>{dialogTitle}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {dialogDescription}
        </Dialog.Description>
        <Flex direction="column" gap="3">
          {type === "authors" ? (
            <>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Autor
                </Text>
                <TextField.Root
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Nome do autor"
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Nacionalidade
                </Text>
                <TextField.Root
                  value={authorNationality}
                  onChange={(e) => setAuthorNationality(e.target.value)}
                  placeholder="Nacionalidade do autor"
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Estado
                </Text>
                <TextField.Root
                  value={authorState}
                  onChange={(e) => setAuthorState(e.target.value)}
                  placeholder="Estado do autor"
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Cidade
                </Text>
                <TextField.Root
                  value={authorCity}
                  onChange={(e) => setAuthorCity(e.target.value)}
                  placeholder="Cidade do autor"
                />
              </label>
            </>
          ) : (
            <>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Livro
                </Text>
                <TextField.Root
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="Título do livro"
                />
              </label>

              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Autor
                </Text>
                <Select.Root
                  value={bookAuthor}
                  onValueChange={setBookAuthor}
                  disabled={detailedAuthors.length === 0}
                >
                  <Select.Trigger
                    placeholder={
                      detailedAuthors.length > 0
                        ? "Selecione um autor"
                        : "Nenhum autor disponível"
                    }
                  />
                  <Select.Content>
                    {hasAuthors ? (
                      detailedAuthors.map((author) => (
                        <Select.Item key={author.id} value={author.author}>
                          {author.author}
                        </Select.Item>
                      ))
                    ) : (
                      <Select.Item value="-" disabled>
                        Nenhum autor disponível
                      </Select.Item>
                    )}
                  </Select.Content>
                </Select.Root>
              </label>

              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Idade Recomendada
                </Text>
                <TextField.Root
                  type="number"
                  value={recommendedAge}
                  onChange={(e) => setRecommendedAge(Number(e.target.value))}
                  placeholder="Idade recomendada"
                  min="0"
                />
              </label>

              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Páginas
                </Text>
                <TextField.Root
                  type="number"
                  value={pages}
                  onChange={(e) => setPages(Number(e.target.value))}
                  placeholder="Número de páginas"
                  min="1"
                />
              </label>

              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Preço (R$)
                </Text>
                <TextField.Root
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="Preço do livro"
                  step="0.01"
                  min="0"
                />
              </label>

              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Ano de Publicação
                </Text>
                <TextField.Root
                  type="number"
                  value={publicationYear}
                  onChange={(e) => setPublicationYear(Number(e.target.value))}
                  placeholder="Ano de publicação"
                  min="1000"
                  max={new Date().getFullYear()}
                />
              </label>
            </>
          )}
        </Flex>

        {type !== "authors" &&
          detailedAuthors &&
          detailedAuthors.length === 0 && (
            <Flex my="3" width="100%" align="center" justify="end">
              <Text color="red" size="1">
                Ação Necessária : Adicione Autores
              </Text>
            </Flex>
          )}

        <Flex gap="4" mt="4" justify="end" align="center">
          <Dialog.Close>
            <Button
              variant={"soft"}
              color={"gray"}
              onClick={() => {
                onClose();
              }}
            >
              Cancelar
            </Button>
          </Dialog.Close>

          <Button onClick={handleSave} disabled={isSaveDisabled}>
            Salvar
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
