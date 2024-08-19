import Checkbox from "@codeworker.br/govbr-tw-react/dist/components/Checkbox";
import Input from "@codeworker.br/govbr-tw-react/dist/components/Input";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Button } from "@codeworker.br/govbr-tw-react/dist/components/Button";

interface MultiComboBoxProps {
  comboName: string;
  normalizeFilter?: boolean;
  selected?: Array<any>;
  options: Array<any>;
  onSelectionChange?: (selected: string[]) => void;
  sortOrder?: "asc" | "desc" | "none";
  filterPlaceholder?: string;
  mapTo?: { label: string; value: string };
}

export default function MultiComboBox({
  comboName = "comboBoxMulti",
  normalizeFilter = true,
  selected = [],
  options,
  onSelectionChange,
  sortOrder = "none",
  filterPlaceholder = "Filtro ...",
  mapTo = { label: "label", value: "value" }, // Prop padrão para mapeamento
  ...props
}: MultiComboBoxProps) {
  function removeDiacritics(text: string) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const [filterValue, setFilterValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selected);

  useEffect(() => {
    setSelectedOptions(selected);
  }, [selected]);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedOptions); // Chama a função do pai sempre que a seleção mudar
    }
  }, [selectedOptions]);

  useEffect(() => {
    const sortedOptions = [...options];
    if (sortOrder === "asc") {
      sortedOptions.sort((a, b) =>
        a[mapTo.label].localeCompare(b[mapTo.label])
      );
    } else if (sortOrder === "desc") {
      sortedOptions.sort((a, b) =>
        b[mapTo.label].localeCompare(a[mapTo.label])
      );
    }

    setFilteredOptions(sortedOptions);
  }, [sortOrder, options]);

  function handleFilterValue(event: any) {
    const value = event.target.value;
    setFilterValue(value);

    const filtered = value
      ? options.filter((option) => {
          const label = option[mapTo.label];
          if (normalizeFilter)
            return removeDiacritics(label.toLowerCase()).includes(
              removeDiacritics(value.toLowerCase())
            );
          return label.toLowerCase().includes(value.toLowerCase());
        })
      : options;

    setFilteredOptions(filtered);
  }

  function handleCheckboxChange(event: any) {
    const { value, checked } = event.target;

    setSelectedOptions((prevSelectedOptions) =>
      checked
        ? [...prevSelectedOptions, value]
        : prevSelectedOptions.filter((option) => option !== value)
    );
    event.stopPropagation()
  }

  function handleSelectAllChange(event: any) {
    const { checked } = event.target;
    if (checked) {
      setSelectedOptions(filteredOptions.map((option) => option[mapTo.value]));
    } else {
      setSelectedOptions([]);
    }
    event.stopPropagation()
  }

  const isAllSelected =
    filteredOptions.length > 0 &&
    filteredOptions.every((option) =>
      selectedOptions.includes(option[mapTo.value])
    );

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-5 items-center">
        <div className="flex-1">
          <Input
            placeholder={filterPlaceholder}
            type="text"
            value={filterValue}
            onChange={handleFilterValue}
          />
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setSelectedOptions([])}
         density="high"
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>
     
      <ul className="flex flex-col gap-2">
        <li className="!text-wrap text-sm"> <Checkbox
        name={`${comboName}-select-all`}
        value="select-all"
        checked={isAllSelected}
        onChange={handleSelectAllChange}
      >
        <span className="text-govbr-gray-60">
          {isAllSelected ? `Deselecionar` : `Selecionar`} Todos
        </span>
      </Checkbox></li>
        {filteredOptions.map((option, index) => (
          <li key={index} className="!text-wrap text-sm">
            <Checkbox
              name={comboName}
              value={option[mapTo.value]}
              checked={selectedOptions.includes(option[mapTo.value])}
              onChange={handleCheckboxChange}
            >
              {option[mapTo.label]}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );
}
