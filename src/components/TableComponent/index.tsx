import { useRef, useState, useEffect } from "react";
import styles from "./TableComponent.module.css";
import { IconButton, Flex, Table, Text, Button } from "@radix-ui/themes";
import AlertConfirm from "../AlertConfirm";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { BiPlusMedical } from "react-icons/bi";
import {
  TbArrowBigRightFilled,
  TbArrowBigLeftFilled,
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
  TbTrash,
  TbEye,
} from "react-icons/tb";
import { DetailedAuthor } from "../../types/Author";
import { DetailedBook } from "../../types/Books";
import { TableProps } from "../../types/Table";
import Modal from "../Modal";
import ShowInfosModal from "../ShowInfosModal";

export default function TableComponent({
  data,
  columns,
  useDelete = true,
  type = "books",
  title = "Tabela",
  deleteFunc,
  saveFunc,
}: Readonly<TableProps>) {
  const [selectedDataRow, setSelectedDataRow] =
    useState<(DetailedAuthor | DetailedBook)[]>();
  const [selectedDataShow, setSelectedDataShow] =
    useState<(DetailedAuthor | DetailedBook)[]>();
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [tableWidth, setTableWidth] = useState("auto");
  const tableRef = useRef<HTMLDivElement>(null);
  const validColumns = columns && columns.length > 0;
  const validData = data && data.length > 0;
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);

  const fallbackColumn = validColumns
    ? [...columns]
    : [{ header: "Sem colunas definidas", accessorKey: "" }];

  let fallbackData;
  if (validData) {
    fallbackData = [...data];
  } else {
    fallbackData =
      type === "authors"
        ? [{ id: 0, author: "Nada para exibir" }]
        : [{ id: 0, book: "Nada para exibir" }];
  }

  const table = useReactTable<DetailedAuthor | DetailedBook>({
    columns: columns ?? fallbackColumn,
    data: data ?? (fallbackData as DetailedAuthor[] | DetailedBook[]),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    const updateTableWidth = () => {
      if (tableRef.current) {
        setTableWidth(`${tableRef.current.offsetWidth}px`);
      }
    };

    updateTableWidth();
    window.addEventListener("resize", updateTableWidth);

    return () => window.removeEventListener("resize", updateTableWidth);
  }, []);

  return (
    <Flex direction="column" align="center" width="100%" height="100%">
      {useDelete && (
        <AlertConfirm
          open={isDeleteAlertOpen}
          data={selectedDataRow}
          columns={columns}
          type={type}
          deleteFunc={deleteFunc!}
          onClose={() => setIsDeleteAlertOpen(false)}
        />
      )}
      <Modal
        open={isModalAddOpen}
        onClose={() => setIsModalAddOpen(false)}
        saveFunc={saveFunc}
        type={type}
      />
      <ShowInfosModal
        open={isModalInfoOpen}
        data={selectedDataShow}
        onClose={() => setIsModalInfoOpen(false)}
        type={type}
      />

      {useDelete && (
        <Flex
          justify="end"
          align="end"
          gapX="3"
          mt="6"
          my="1"
          width={tableWidth}
        >
          <Flex
            gap="1"
            justify="center"
            align="center"
            mb="1"
            className={styles.footer}
          >
            <IconButton
              radius="large"
              variant="soft"
              color="iris"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <TbPlayerTrackPrevFilled />
            </IconButton>

            <IconButton
              radius="large"
              variant="soft"
              color="iris"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <TbArrowBigLeftFilled />
            </IconButton>

            <Text size="2" color="iris" weight="bold">
              {table.getPageCount() > 0
                ? table.getState().pagination.pageIndex + 1
                : 1}
              {" / " + (table.getPageCount() > 0 ? table.getPageCount() : 1)}
            </Text>

            <IconButton
              radius="large"
              variant="soft"
              color="iris"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <TbArrowBigRightFilled />
            </IconButton>

            <IconButton
              radius="large"
              variant="soft"
              color="iris"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              <TbPlayerTrackNextFilled />
            </IconButton>
          </Flex>
          <Button color="iris" mb="1" onClick={() => setIsModalAddOpen(true)}>
            <BiPlusMedical />
            Adicionar
          </Button>
        </Flex>
      )}
      <Table.Root
        variant="surface"
        ref={tableRef}
        size="3"
        title={title}
        security="safe"
        className={styles.table}
      >
        <Table.Header className={styles.tableHeader} security="safe">
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.ColumnHeaderCell
                  key={header.id}
                  colSpan={header.colSpan}
                >
                  <Text size="2" color="iris" weight={"bold"}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Text>
                </Table.ColumnHeaderCell>
              ))}
              {useDelete && <Table.ColumnHeaderCell></Table.ColumnHeaderCell>}
              {useDelete && <Table.ColumnHeaderCell></Table.ColumnHeaderCell>}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body security="safe">
          {table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id} className={styles.tableRow}>
              {row.getVisibleCells().map((cell, index) => (
                <Table.ColumnHeaderCell
                  key={cell.id}
                  className={`${styles.tableCell} ${
                    index === 1 ? styles.flexOne : ""
                  }`}
                >
                  <Text
                    size="2"
                    color="iris"
                    weight={"medium"}
                    className={styles.tableText}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Text>
                </Table.ColumnHeaderCell>
              ))}
              {useDelete && (
                <Table.ColumnHeaderCell className={styles.buttonGroup}>
                  <IconButton
                    radius="large"
                    variant="soft"
                    className={styles.button}
                    color="iris"
                    onClick={() => {
                      setSelectedDataShow([row.original]);
                      setIsModalInfoOpen(true);
                    }}
                  >
                    <TbEye />
                  </IconButton>
                </Table.ColumnHeaderCell>
              )}
              {useDelete && (
                <Table.ColumnHeaderCell className={styles.buttonGroup}>
                  <IconButton
                    radius="large"
                    variant="soft"
                    color="red"
                    className={styles.button}
                    onClick={() => {
                      setSelectedDataRow([row.original]);
                      setIsDeleteAlertOpen(true);
                    }}
                  >
                    <TbTrash />
                  </IconButton>
                </Table.ColumnHeaderCell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}
