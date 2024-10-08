import {
  faArrowDownWideShort,
  faArrowUpWideShort,
  faMinus,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableSortIcon({ column, children }: any) {
  const sort = column.getIsSorted() === false ? "sort" : column.getIsSorted();
  const sortIcon: any = {
    sort: faMinus,
    asc: faArrowUpWideShort,
    desc: faArrowDownWideShort,
  };
  return (
    <>
      <span
      className="cursor-pointer flex gap-1 items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>{children}</span>
        <FontAwesomeIcon icon={sortIcon[sort]}  className="ml-3"/>
      </span>
    </>
  );
}
