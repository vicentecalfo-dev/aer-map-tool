"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@codeworker.br/govbr-tw-react/dist/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faFileArrowDown,
  faFilter,
  faMagnifyingGlassChart,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Input from "@codeworker.br/govbr-tw-react/dist/components/Input";
import { columnsHeader } from "./columns";
import NativeSelect from "@codeworker.br/govbr-tw-react/dist/components/NativeSelect";
import DownloadButton from "../../download-button";
import { Spinner } from "@codeworker.br/govbr-tw-react";

interface DataTableProps<TData, TValue> {
  columns: any[];
  data: TData[];
  isLoading: boolean;
}

export function SpeciesTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "assessmentYear", desc: true },
  ]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [selectedFilterColumn, setSelectedFilterColumn] =
    React.useState("scientificName");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const columnsHeaderOptions = Object.keys(columnsHeader)
    .filter((key) => key !== "id")
    .map((key) => ({
      label: (columnsHeader as any)[key],
      value: key,
    }));

  return (
    <div className="rounded-md w-full overflow-hidden grid grid-rows-[auto_1fr_auto] gap-3">
      <div className="flex gap-5 items-center">
        <div className="flex-1">
          {data?.length > 0 && (
            <p className="text-sm text-govbr-gray-60">
              {`${data.length > 1 ? "Foram" : "Foi"} encontrado${
                data.length > 1 ? "s" : ""
              } `}
              <span className="font-bold text-govbr-blue-warm-vivid-70">
                {data.length}
              </span>
              {` registro${data.length > 1 ? "s" : ""} em nossa base de dados.`}
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
                  {` ${(columnsHeader as any)[selectedFilterColumn]}`}.
                </span>
              </p>
            )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            {data.length > 0 && (
              <>
                <div>
                  <NativeSelect
                    options={columnsHeaderOptions}
                    selected={selectedFilterColumn}
                    onChange={(e) => setSelectedFilterColumn(e.target.value)}
                    disabled={data.length === 0}
                  />
                </div>
                <div className="flex items-center">
                  <Input
                    iconPosition="left"
                    placeholder="Filtrar ..."
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
                  >
                    <FontAwesomeIcon icon={faFilter} />
                  </Input>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="overflow-y-auto border rounded-md">
        <Table className="bg-white">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-normal text-govbr-blue-warm-vivid-70"
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
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center p-10"
                >
                  <span className="flex justify-center">
                    <div className="flex gap-3 items-center">
                      <Spinner size="small" />
                    </div>
                  </span>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-govbr-gray-2 h-auto"
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
                  className="text-center p-10"
                >
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2">
          {data?.length > 0 && (
            <>
              <Button className="font-normal">
                <FontAwesomeIcon icon={faMagnifyingGlassChart} />
                Analisar Dados
              </Button>
              <Button className="font-normal">
                <FontAwesomeIcon icon={faMapLocationDot} />
                Ferramenta GEO
              </Button>
              <DownloadButton
                label={`
                Resultados (${data.length})`}
                fileName={`resultados_${data.length}`}
                fileType="csv"
                data={data}
              />
              <DownloadButton
                label={`
                Resultados Filtrados (${
                  table.getFilteredRowModel().rows.length
                })`}
                fileName={`resultados_filtrados_${
                  table.getFilteredRowModel().rows.length
                }`}
                fileType="csv"
                data={table
                  .getFilteredRowModel()
                  .rows.map((row) => row.original)}
              />
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {data?.length > 0 && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
