import { AlertDialog, Button, Flex, Inset } from "@radix-ui/themes";
import TableComponent from "../TableComponent";
import { Author } from "../../types/Author";
import { Book } from "../../types/Books";
import { ConfirmProps } from "../../types/AlertConfirm";

export default function AlertConfirm({
  open,
  data,
  columns,
  onClose,
  type,
  deleteFunc,
}: Readonly<ConfirmProps>) {
  const getOneOfDataArray = data ? data.slice(0, 1) : [];
  const getTwoOfColumnArray = columns ? columns.slice(0, 2) : [];
  const getTwoRowsOfArray = getOneOfDataArray.map((item) => ({
    id: typeof item.id === "number" ? item.id : parseInt(item.id, 10),
    author: (item as Author).author ?? "Sem nome",
    book:
      type === "books"
        ? (item as Book).book ?? "Sem título"
        : (item as Author).author ?? "Sem nome",
  }));

  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Content width="300" maxWidth="300" align="center">
        <AlertDialog.Title align="center" color="red">
          Confirma Exclusão ?
        </AlertDialog.Title>
        <AlertDialog.Description
          size="3"
          align="center"
          mt="3"
          mb="4"
          color="red"
          weight="bold"
        >
          Tem certeza que deseja excluir o item selecionado abaixo?
        </AlertDialog.Description>
        <Inset side="x" mt="5" mb="8">
          <TableComponent
            data={getTwoRowsOfArray}
            columns={getTwoOfColumnArray}
            useDelete={false}
            type={type}
          />
        </Inset>
        <Flex gap="3" justify="end" width="300" maxWidth="300">
          <AlertDialog.Action>
            <Button
              color="red"
              onClick={() => deleteFunc(getTwoRowsOfArray[0].id)}
            >
              Excluir
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button color="iris" onClick={onClose}>
              Cancelar
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
