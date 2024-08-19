import React from "react";
import { Button } from "@codeworker.br/govbr-tw-react/dist/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFilterCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "@codeworker.br/govbr-tw-react";

interface FilterButtonsProps {
  query: any;
  onSubmit?: any;
  onReset?:any;
  loading: boolean;
}

export default function FilterButtons({ query, onSubmit, loading = false, onReset }: FilterButtonsProps) {
  return (
    <ul className="grid grid-cols-[1fr_auto] gap-5 px-6">
      <li>
        <Button
          className="w-full font-normal"
          disabled={Object.keys(query).length === 0}
          onClick={onSubmit}
        >
          { loading ? <Spinner size="button" variant="invert-light"/> : <FontAwesomeIcon icon={faMagnifyingGlass} />} Buscar
        </Button>
      </li>
    </ul>
  );
}
