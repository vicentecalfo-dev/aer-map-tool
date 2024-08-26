"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { getColumuns } from "./columns";
import { useState } from "react";
import { Button } from "@codeworker.br/govbr-tw-react/dist/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faChevronLeft,
  faChevronRight,
  faFileArrowDown,
  faFilter,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  Input,
  NativeSelect,
  Spinner,
  Tooltip,
} from "@codeworker.br/govbr-tw-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardResultTable({ data, loading }: any) {
  const t: any = useTranslations("DashboardResultTable");
  const headers: any = {
    id: t("columns.id"),
    family: t("columns.family"),
    scientificName: t("columns.scientificName"),
    assessmentCategory: t("columns.assessmentCategory"),
    governmentDocuments: t("columns.governmentDocuments"),
    yes: t("columns.yes"),
    no: t("columns.no"),
    assessmentYear: t("columns.assessmentYear"),
  };
  const columns = getColumuns({ headers });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "assessmentYear", desc: true },
  ]);
  const [selectedFilterColumn, setSelectedFilterColumn] =
    useState("scientificName");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const columnsHeaderOptions = columns
    .filter(({ accessorKey }: any) => accessorKey !== "id")
    .map(({ accessorKey }: any) => ({
      label: headers[accessorKey],
      value: accessorKey,
    }));

  const resetFilter = () => {
    table.getColumn(selectedFilterColumn)?.setFilterValue("");
  };

  const SelectFilterColumn = () => (
    <NativeSelect
      options={columnsHeaderOptions}
      selected={selectedFilterColumn}
      onChange={(e) => {
        setSelectedFilterColumn(e.target.value);
        resetFilter(); // Reseta o filtro ao mudar de coluna
      }}
      disabled={data.length === 0}
    />
  );

  return (
    <div className="grid grid-rows-[auto_1fr_auto] overflow-hidden gap-3">
      <div className="flex">
        {data.length > 0 && (
          <>
            <div className="flex flex-1 gap-3 items-center">
              {data.length > 0 && (
                <>
                  <div className="w-[150px]">
                    <SelectFilterColumn />
                  </div>
                  <div className="w-[250px]">
                    <Input
                      placeholder={t("filterPlaceholder")}
                      value={
                        (table
                          .getColumn(selectedFilterColumn)
                          ?.getFilterValue() as string) ?? ""
                      }
                      onChange={(event) =>
                        table
                          .getColumn(selectedFilterColumn)
                          ?.setFilterValue(event.target.value)
                      }
                      disabled={data.length === 0}
                    />
                  </div>
                  <>
                    <Tooltip position="left" className="text-xs">
                      <Button
                        size="icon"
                        density="high"
                        variant="outline"
                        onClick={resetFilter} // Adiciona um botão para resetar o filtro
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </Button>
                      {t("cleanFilter")}
                    </Tooltip>
                  </>
                </>
              )}
            </div>
            <div className="flex gap-2 relative">
              <Tooltip position="left" className="text-xs">
                <Button size="icon" disabled>
                  <FontAwesomeIcon icon={faChartSimple} />
                </Button>
                {t("analyzer")}
              </Tooltip>
              <DropdownMenu>
                <DropdownMenuTrigger disabled={data.length === 0}>
                  <Tooltip position="left" className="text-xs">
                    <Button size="icon">
                      <FontAwesomeIcon icon={faFileArrowDown} />
                    </Button>
                    {t("downloads")}
                  </Tooltip>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{t('assessment')}</DropdownMenuLabel>
                  <DropdownMenuItem>{t('allRecords')}  ({data.length})</DropdownMenuItem>
                  {table.getFilteredRowModel().rows?.length > 0 &&
                    data?.length !==
                      table.getFilteredRowModel().rows?.length && (
                      <DropdownMenuItem>
                        {t('filteredRecords')} (
                        {table.getFilteredRowModel().rows.length})
                      </DropdownMenuItem>
                    )}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>{t('occurrence')}</DropdownMenuLabel>
                  <DropdownMenuItem>{t('allRecords')}</DropdownMenuItem>
                  {table.getFilteredRowModel().rows?.length > 0 &&
                    data?.length !==
                      table.getFilteredRowModel().rows?.length && (
                      <DropdownMenuItem>
                        {t('filteredRecords')}
                      </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
      <div className="overflow-x-auto rounded-md border border-govbr-gray-10">
        <Table className="relative">
          <TableHeader className="font-bold text-govbr-blue-warm-vivid-70">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="sticky top-0 bg-govbr-gray-2 z-[90]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-full w-full justify-content text-center"
                >
                  <span className="flex w-full justify-center p-6">
                    <Spinner />
                  </span>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="even:bg-govbr-gray-2 !hover:none"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-full text-center"
                    >
                      <span className="p-6 text-govbr-gray-60">{t("noResults")}</span>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      {data.length > 0 && (
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            {data?.length > 0 && (
              <p className="text-sm text-govbr-gray-60">
                {`${data.length > 1 ? "Foram" : "Foi"} encontrado${
                  data.length > 1 ? "s" : ""
                } `}
                <span className="font-bold text-govbr-blue-warm-vivid-70">
                  {data.length}
                </span>
                {` registro${
                  data.length > 1 ? "s" : ""
                } em nossa base de dados.`}
              </p>
            )}
            {table.getFilteredRowModel().rows?.length > 0 &&
              data?.length !== table.getFilteredRowModel().rows?.length && (
                <p className="text-xs text-govbr-gray-60">
                  <span>Mostrando </span>
                  <span className="font-bold text-govbr-blue-warm-vivid-70">
                    {table.getFilteredRowModel().rows.length}
                  </span>
                  {` registro${
                    table.getFilteredRowModel().rows.length > 1 ? "s" : ""
                  } filtrado${
                    table.getFilteredRowModel().rows.length > 1 ? "s" : ""
                  } pela coluna`}
                  <span className="font-bold text-govbr-blue-warm-vivid-70">
                    {` ${(headers as any)[selectedFilterColumn]}`}.
                  </span>
                </p>
              )}
          </div>
          <div>
            {data?.length > 0 && (
              <div className="flex gap-2">
                <Button
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
                <Button
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
