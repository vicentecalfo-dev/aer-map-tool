import IUCNCategoryBadge from "@/components/app/IUCN/IUCNCategoryBadge";
import ScientificName from "@/components/app/ScientificName";
import TableSortIcon from "@/components/app/tables/sortIcon";
import Badge from "@codeworker.br/govbr-tw-react/dist/components/Badge";
import { ColumnDef } from "@tanstack/react-table";

export const getColumuns = ({ headers }: any): ColumnDef<any>[] => {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <span className="w-[150px] block">
          <TableSortIcon column={column}>{headers.id}</TableSortIcon>
        </span>
      ),
      cell: ({ row }) => {
        return (
          <a
            href={row.original.fbLink}
            className="hover:text-govbr-blue-warm-vivid-70 flex gap-1 items-center"
            target="blank"
          >
            <img src="/images/fb-icon.png" className="w-4" />
            FB {row.getValue("id")}
          </a>
        );
      },
    },
    {
      accessorKey: "family",
      header: ({ column }) => (
        <span className="w-[140px] block">
          <TableSortIcon column={column}>{headers.family}</TableSortIcon>
        </span>
      ),
    },
    {
      accessorKey: "scientificName",
      header: ({ column }) => (
        <span className="w-auto block">
          <TableSortIcon column={column}>
            {headers.scientificName}
          </TableSortIcon>
        </span>
      ),
      cell: ({ row }) => {
        return (
          <ScientificName>{row.getValue("scientificName")}</ScientificName>
        );
      },
    },
    {
      accessorKey: "assessmentCategory",
      header: ({ column }) => (
        <span className="w-[150px] block">
          <TableSortIcon column={column}>
            {headers.assessmentCategory}
          </TableSortIcon>
        </span>
      ),
      cell: ({ row }) => {
        return (
          <IUCNCategoryBadge category={row.getValue("assessmentCategory")} />
        );
      },
    },
    {
      accessorKey: "assessmentYear",
      header: ({ column }) => (
        <span className="w-[100px] block">
          <TableSortIcon column={column}>
            {headers.assessmentYear}
          </TableSortIcon>
        </span>
      ),
      cell: ({ row }) => {
        return <span>{row.getValue("assessmentYear")}</span>;
      },
    },
    {
      accessorKey: "governmentOfficialList",
      header: ({ column }) => (
        <span className="w-[90px] block">
          <TableSortIcon column={column}>
            {headers.governmentOfficialList}
          </TableSortIcon>
        </span>
      ),
      cell: ({ row }: any) => {
        return (
          <>
            {row.getValue("governmentOfficialList") === "Não" ? (
              <Badge variant="danger-light">{headers.no}</Badge>
            ) : (
              <Badge variant="success-light">{headers.yes}</Badge>
            )}
          </>
        );
      },
    },
  ];
};

//
