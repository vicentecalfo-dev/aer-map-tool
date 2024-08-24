import React from "react";
import NativeSelect from "@codeworker.br/govbr-tw-react/dist/components/NativeSelect";
import filterNameOptions from "../../lib/options/filter-name-options.json" assert { type: "json" };

interface FilterByTypeProps {
  filterByTypeValue: string;
  handleFilterByTypeValue: (event: any) => void;
}

export default function FilterByType({
  filterByTypeValue,
  handleFilterByTypeValue,
}: FilterByTypeProps) {
  return (
    <div>
      <NativeSelect
        options={filterNameOptions}
        selected={filterByTypeValue}
        onChange={handleFilterByTypeValue}
      />
    </div>
  );
}
