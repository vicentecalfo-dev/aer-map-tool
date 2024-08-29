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
import { useEffect, useState } from "react";
import { Button } from "@codeworker.br/govbr-tw-react/dist/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faChevronLeft,
  faChevronRight,
  faFileArrowDown,
  faFilter,
  faListCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  Badge,
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
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ScientificName from "@/components/app/ScientificName";
import DownloadButton from "@/components/app/download-button";

export default function DashboardResultTable({ data, loading }: any) {
  const t: any = useTranslations("DashboardResultTable");
  const [percetageFound, setPercentageFound] = useState(0);
  const [filterText, setFilterText] = useState("");
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
  useEffect(() => {
    console.log(data.searchedScientificNames);
    setPercentageFound(
      Math.floor(
        (data?.results?.length / data?.searchedScientificNames?.length) * 100
      )
    );
  }, [data]);

  const table = useReactTable({
    data: data.results,
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
      disabled={data.results.length === 0}
    />
  );

  function getColorBasedOnPercentage(percentage: number): string {
    if (percentage >= 0 && percentage <= 20) {
      return "bg-red-600 text-govbr-pure-100/70"; // Cor para 0% a 20%
    } else if (percentage >= 21 && percentage <= 69) {
      return "bg-amber-400 text-govbr-pure-100/70"; // Cor para 21% a 69%
    } else if (percentage >= 70 && percentage <= 100) {
      return "bg-lime-600 text-govbr-pure-0"; // Cor para 70% a 100%
    } else {
      return "bg-gray-100 text-govbr-pure-0"; // Cor padrão para valores fora do intervalo
    }
  }

  const filteredNotFound = data.notFound.filter((name: any) => {
    return name.toLowerCase().includes(filterText.toLowerCase());
  });

  return (
    <div className="grid grid-rows-[auto_1fr_auto] overflow-hidden gap-3">
      <div className="flex">
        {data?.results?.length > 0 && (
          <>
            <div className="flex flex-1 gap-3 items-center text-normal">
              {data?.results?.length > 0 && (
                <>
                  <div className="w-[200px]">
                    <SelectFilterColumn />
                  </div>
                  <div className="w-[230px]">
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
                      disabled={data.results.length === 0}
                    />
                  </div>
                  <>
                    <Tooltip position="left" className="text-xs !font-normal">
                      <Button
                        size="icon"
                        density="high"
                        variant="outline"
                        onClick={resetFilter} // Adiciona um botão para resetar o filtro
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </Button>
                      <span className="font-normal">{t("cleanFilter")}</span>
                    </Tooltip>
                  </>
                </>
              )}
            </div>
            {data.searchedScientificNames.length > 0 && (
              <div className="flex items-center gap-3 mr-3">
                <div className="flex flex-col gap-1 items-center justify-start w-[200px]">
                  <span className="text-xs text-left w-full">
                    Táxons encontrados na busca:
                  </span>
                  <div className="flex justify-start w-full h-[20px] bg-govbr-gray-10 rounded-sm relative items-center">
                    <div
                      className={cn(
                        `h-full relative flex text-xs items-center p-2 rounded-sm ${getColorBasedOnPercentage(
                          percetageFound
                        )}`
                      )}
                      style={{ width: `${percetageFound}%` }}
                    ></div>
                    <span
                      className={`text-right absolute top-0 right-2 text-xs h-[20px] flex items-center pr-1 ${getColorBasedOnPercentage(
                        percetageFound
                      )} !bg-transparent`}
                    >
                      {data.results.length}/
                      {data.searchedScientificNames.length} ({percetageFound}
                      %)
                    </span>
                  </div>
                </div>
                <div>
                  {data.notFound.length > 0 && (
                    <Sheet>
                      <SheetTrigger className="relative">
                        <Tooltip
                          position="left"
                          className="text-xs !font-normal z-[99]"
                        >
                          <Button
                            size="icon"
                            variant="default-danger"
                            onClick={() => {}}
                          >
                            <FontAwesomeIcon icon={faListCheck} />
                          </Button>
                          <span className="font-normal">
                            {t("taxonNotFound.openList")} (
                            {data.notFound.length})
                          </span>
                        </Tooltip>
                      </SheetTrigger>
                      <SheetContent className="z-[99] bg-govbr-pure-0 grid grid-rows-[auto_auto_1fr_auto] !w-[600px] !max-w-[600px]">
                        <div className="text-govbr-blue-warm-vivid-80 font-bold flex gap-3">
                          <span className="flex-1">
                            {t("taxonNotFound.title")}
                          </span>
                          <SheetClose asChild>
                            <Tooltip position="left" className="text-xs">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setFilterText("")}
                                density="high"
                              >
                                <FontAwesomeIcon icon={faXmark} />
                              </Button>
                              {t("taxonNotFound.close")}
                            </Tooltip>
                          </SheetClose>
                        </div>
                        <div className="flex gap-3 items-center w-full">
                          <div className="w-full">
                            <Input
                              type="text"
                              placeholder={t("taxonNotFound.filter")}
                              value={filterText}
                              onChange={(e) => setFilterText(e.target.value)}
                              iconPosition="right"
                            />
                          </div>
                          <Tooltip position="left" className="text-xs">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => setFilterText("")}
                              density="high"
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </Button>
                            {t("taxonNotFound.clearFilter")}
                          </Tooltip>
                        </div>
                        <div className="overflow-y-auto">
                          <ul className="flex flex-col gap-2">
                            {filteredNotFound.map(
                              (name: string, index: number) => (
                                <li
                                  key={name}
                                  className="p-2 border-b border-govbr-gray-10"
                                >
                                  <ScientificName>{name}</ScientificName>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div className="flex gap-3 items-center">
                          <span className="flex-1">
                            <DownloadButton
                              data={data.notFound.map((taxon: any) => ({
                                [t("taxonNotFound.csvHeader")]: taxon,
                              }))}
                              fileName={t("taxonNotFound.filename")}
                              fileType="csv"
                            >
                              <Tooltip position="left" className="text-xs">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => setFilterText("")}
                                  density="high"
                                >
                                  <FontAwesomeIcon icon={faFileArrowDown} />
                                </Button>
                                {t("taxonNotFound.download")}
                              </Tooltip>
                            </DownloadButton>
                          </span>
                          <span className="text-sm">
                            {data.notFound.length}/
                            {data.searchedScientificNames.length}
                          </span>
                        </div>
                      </SheetContent>
                    </Sheet>
                  )}
                </div>
              </div>
            )}
            <div className="flex gap-2 relative">
              <Tooltip position="left" className="text-xs">
                <Button size="icon" disabled>
                  <FontAwesomeIcon icon={faChartSimple} />
                </Button>
                {t("analyzer")}
              </Tooltip>
              <DropdownMenu>
                <DropdownMenuTrigger disabled={data.results.length === 0}>
                  <Tooltip position="left" className="text-xs">
                    <Button size="icon">
                      <FontAwesomeIcon icon={faFileArrowDown} />
                    </Button>
                    {t("downloads")}
                  </Tooltip>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{t("assessment")}</DropdownMenuLabel>
                  <DropdownMenuItem>
                    {t("allRecords")} ({data.results.length})
                  </DropdownMenuItem>
                  {table.getFilteredRowModel().rows?.length > 0 &&
                    data?.length !==
                      table.getFilteredRowModel().rows?.length && (
                      <DropdownMenuItem>
                        {t("filteredRecords")} (
                        {table.getFilteredRowModel().rows.length})
                      </DropdownMenuItem>
                    )}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>{t("occurrence")}</DropdownMenuLabel>
                  <DropdownMenuItem>{t("allRecords")}</DropdownMenuItem>
                  {table.getFilteredRowModel().rows?.length > 0 &&
                    data?.length !==
                      table.getFilteredRowModel().rows?.length && (
                      <DropdownMenuItem>
                        {t("filteredRecords")}
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
                      className="sticky top-0 bg-govbr-gray-2 z-[50]"
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
                      <span className="p-6 text-govbr-gray-60">
                        {t("noResults")}
                      </span>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      {data.results.length > 0 && (
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            {data?.results.length > 0 && (
              <p className="text-sm text-govbr-gray-60">
                {`${data.results.length > 1 ? "Foram" : "Foi"} encontrado${
                  data.results.length > 1 ? "s" : ""
                } `}
                <span className="font-bold text-govbr-blue-warm-vivid-70">
                  {data.results.length}
                </span>
                {` registro${
                  data.results.length > 1 ? "s" : ""
                } em nossa base de dados.`}
              </p>
            )}
            {table.getFilteredRowModel().rows?.length > 0 &&
              data?.results.length !==
                table.getFilteredRowModel().rows?.length && (
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
