import { Accordion, Badge, Spinner } from "@codeworker.br/govbr-tw-react";
import MultiComboBox from "@/components/ui/multi-combo-box";
import { useEffect } from "react";

interface FilterAccordionItemProps {
  title: string;
  options: { label: string; value: string }[];
  selectedItems: string[];
  handleSelectionChange: (selected: string[]) => void;
  onQueryUpdate: (key: string, values: string[]) => void;
  loading?: boolean;
  field: string;
  context?: string;
}

export default function FilterAccordionItem({
  title,
  options,
  selectedItems,
  handleSelectionChange,
  onQueryUpdate,
  loading = false,
  field,
  context=""
}: FilterAccordionItemProps) {
  // Atualiza a query global quando os itens selecionados mudam
  useEffect(() => {
    console.log(field);
    onQueryUpdate(field, selectedItems);
  }, [selectedItems]);

  return (
    <Accordion.Item value={title.toLowerCase()}>
      <div className="flex gap-5 items-center">
        <span className="flex-1 text-sm items-center gap-2 flex">
          {loading ? <Spinner size="button" /> : ""}
          <span>
          <span className="block">{title}</span>
          <span className="text-xs !font-light text-gray-400">{context}</span>
          </span>
        </span>
        <Badge>{selectedItems.length}</Badge>
      </div>

      <div className="flex flex-col gap-5">
        <MultiComboBox
          comboName={title.toLowerCase()}
          options={options}
          selected={selectedItems}
          onSelectionChange={handleSelectionChange}
          sortOrder="asc"
        />
      </div>
    </Accordion.Item>
  );
}
