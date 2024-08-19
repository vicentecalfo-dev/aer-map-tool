import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableSortIcon({ column, children }: any) {
  const sort = column.getIsSorted() === false ? "sort" : column.getIsSorted();
  const sortIcon: any = {
    sort: faSort,
    asc: faSortUp,
    desc: faSortDown,
  };
  return (
    <>
      <span
  
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {children}
        <FontAwesomeIcon icon={sortIcon[sort]}  className="ml-3"/>
      </span>
    </>
  );
}
