import { ColumnDef } from "@tanstack/react-table";
import IUCNCategoryBadge from "../../IUCN/IUCNCategoryBadge";
import Badge from "@codeworker.br/govbr-tw-react/dist/components/Badge";
import TableSortIcon from "../sort-icon";
import { Button } from "@codeworker.br/govbr-tw-react/dist/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DownloadButton from "../../download-button";
import { _categoriesLabels } from "../../IUCN/config";
import { AssessmentSheet } from "../../assessment-sheet";

export type Species = {
  id: string;
  family: string;
  scientificName: string;
  category: string;
  criteria: string;
  redList: boolean;
  assessmentYear: number;
  reassessment: boolean;
};

export const columnsHeader = {
  id: "",
  family: "Família",
  scientificName: "Nome Científico",
  category: "Categoria de Risco de Extinção",
  //criteria: "Critério de avaliação",
  assessmentYear: "Ano de Avaliação",
  reassessment: "Reavaliação",
  redList: "Lista Vermelha MMA",
};

 export function ScientificName({ scientificName }: any) {
  const nameParts = scientificName.split(" ");
  const genus = nameParts[0];
  const specificEpithet = nameParts.length > 2 ? nameParts[1] : null;
  const authorship = nameParts.slice(specificEpithet ? 2 : 1).join(" ");
  return (
    <>
      <span className="italic">
        {genus} {specificEpithet ? specificEpithet : ""}
      </span>
      &nbsp;&nbsp;
      <span className="text-govbr-gray-60">{authorship}</span>
    </>
  );
}

export const columns: ColumnDef<Species>[] = [
  {
    accessorKey: "family",
    header: ({ column }) => (
      <TableSortIcon column={column}>{columnsHeader.family}</TableSortIcon>
    ),
    cell: ({ row }) => {
      return (
        <span className="min-w-[150px] block">{row.getValue("family") === "" ? "-" : row.getValue("family")}</span>
      );
    },
  },
  {
    accessorKey: "scientificName",
    header: ({ column }) => (
      <TableSortIcon column={column}>
        {columnsHeader.scientificName}
      </TableSortIcon>
    ),
    cell: ({ row }) => {
      const scientificName = row.getValue("scientificName") as string;

      return (
        <span className="min-w-[250px] block">
          <ScientificName scientificName={scientificName} />
        </span>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <TableSortIcon column={column}>{columnsHeader.category}</TableSortIcon>
    ),
    cell: ({ row }) => (
      <span className="flex w-full justify">
        <IUCNCategoryBadge category={row.getValue("category")} />
      </span>
    ),
  },
  // {
  //   accessorKey: "criteria",
  //   header: ({ column }) => (
  //     <TableSortIcon column={column}>{columnsHeader.criteria}</TableSortIcon>
  //   ),
  //   cell: ({ row }) => {
  //     const criteria = row.getValue("criteria");
  //     return (
  //       criteria && <Badge variant="neutral">{row.getValue("criteria")}</Badge>
  //     );
  //   },
  // },
  {
    accessorKey: "assessmentYear",
    header: ({ column }) => (
      <TableSortIcon column={column}>
        {columnsHeader.assessmentYear}
      </TableSortIcon>
    ),
    cell: ({ row }) => (
      row.getValue("assessmentYear") === "" ? <Badge variant="neutral" className="opacity-50">Não se Aplica</Badge> : <span className="text-right">{row.getValue("assessmentYear")}</span>
    ),
  },
  {
    accessorKey: "reassessment",
    header: ({ column }) => (
      <TableSortIcon column={column}>
        {columnsHeader.reassessment}
      </TableSortIcon>
    ),
    cell: ({ row }) => {
      const label = row.getValue("reassessment") ? "Sim" : "Não";
      const categoryNE = row.getValue("category") === "NE";
      return (
        <span className="min-w-[120px] block">
          {categoryNE ? (
            <Badge variant="neutral" className="opacity-50">Não se Aplica</Badge>
          ) : (
            <Badge
              variant={
                row.getValue("reassessment") ? "success-light" : "danger-light"
              }
            >
              {label}
            </Badge>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "redList",
    header: ({ column }) => (
      <TableSortIcon column={column}>{columnsHeader.redList}</TableSortIcon>
    ),
    cell: ({ row }) => {
      const redList = row.getValue("redList");
     // console.log(redList);
      const label = redList ? "Sim" : "Não";
      return (
        <Badge variant={redList ? "success-light" : "danger-light"}>
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const scientificName = row.getValue("scientificName") as string;
      const categoryNE = row.getValue("category") === "NE";
      return (
        <Sheet>
          <SheetTrigger>
            <Button variant="outline" density="high" disabled={categoryNE}>
              <span className="text-xs">Abrir</span>{" "}
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </SheetTrigger>
          <SheetContent className=" !min-w-[90vw] !p-0 !grid !grid-rows-[auto_1fr_auto] h-screen gap-0 border-0">
            <SheetHeader className="p-5 bg-govbr-gray-2">
              <SheetTitle className=" !font-normal">
                <div className="flex gap-5 ml-[-55px] items-center">
                  <span className="">
                    <IUCNCategoryBadge
                      category={row.getValue("category")}
                      size="w-14 h-14"
                      textSize="text-xl"
                    />
                  </span>
                  <h1 className="flex flex-col gap-0 flex-1">
                    <span className="font-bold">{row.getValue("family")}</span>
                    <span className="mt-[-5px]">
                      <ScientificName scientificName={scientificName} />
                    </span>
                  </h1>
                  <div className="flex gap-3">
                    {row.getValue("redList") === true && <Badge variant="danger">Lista Vermelha MMA</Badge>}
                  
                    <Badge>{row.getValue("assessmentYear")}</Badge>
                    {row.getValue("reassessment") ? (
                      <Badge variant="success-light">
                        {row.getValue("reassessment")}Reavaliação
                      </Badge>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <SheetClose asChild>
                      <Button size="icon" variant="ghost">
                        <FontAwesomeIcon icon={faXmark} />
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto bg-govbr-pure-0">
              <AssessmentSheet row={row} id={row.getValue("id")}/>
            </div>
            <SheetFooter>
              <div className="p-5 bg-govbr-gray-2 w-full flex gap-3 items-center">
                <DownloadButton
                  label={`Baixar Ficha de Avaliação`}
                  fileName={`ficha_`}
                  fileType="csv"
                  data={[]}
                />
                <DownloadButton
                  label={`Baixar Conjunto de Ocorrências`}
                  fileName={`ficha_`}
                  fileType="csv"
                  data={[]}
                />
                <div className="flex-1"></div>
                <a
                  href={`http://reflora.jbrj.gov.br/reflora/listaBrasil/FichaPublicaTaxonUC/FichaPublicaTaxonUC.do?id=${row.getValue(
                    "id"
                  )}`}
                  className="w-[70px]"
                >
                  <img src="https://ckan.jbrj.gov.br/uploads/group/2020-08-24-091124.907717Logo-Reflora.png" />
                </a>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>

      );
    },
  },
];
