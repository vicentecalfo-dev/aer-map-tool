import React from "react";
import Input from "@codeworker.br/govbr-tw-react/dist/components/Input";

interface FilterByNameProps {
  filterByNameValue: string;
  handleFilterByName: (event: any) => void;
}

export default function FilterByName({
  filterByNameValue,
  handleFilterByName,
}: FilterByNameProps) {
  return (
    <div>
      <Input
        placeholder="Nome Científico"
        type="text"
        value={filterByNameValue}
        onChange={handleFilterByName}
      />
    </div>
  );
}
