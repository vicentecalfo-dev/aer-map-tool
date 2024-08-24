import Checkbox from "@codeworker.br/govbr-tw-react/dist/components/Checkbox";
import Input from "@codeworker.br/govbr-tw-react/dist/components/Input";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Button } from "@codeworker.br/govbr-tw-react/dist/components/Button";

interface MultiComboBoxProps {
  comboName: string;
  normalizeFilter?: boolean;
  selected?: Array<any>;
  options: Array<any>;
  onSelectionChange?: (selected: any) => void;
  sortOrder?: "asc" | "desc" | "none";
  filterPlaceholder?: string;
  mapTo?: { label: string; value: string };
}

const MultiComboBox = memo(({
  comboName = "comboBoxMulti",
  normalizeFilter = true,
  selected = [],
  options,
  onSelectionChange = () => {},
  sortOrder = "none",
  filterPlaceholder = "Filtro ...",
  mapTo = { label: "label", value: "value" },
}: MultiComboBoxProps) => {

  const [filterValue, setFilterValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selected);

  useEffect(() => {
    setSelectedOptions(selected);
  }, [selected]);

  const removeDiacritics = useCallback((text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }, []);

  const sortedOptions = useMemo(() => {
    if (sortOrder === "none") return options;
    const sorted = [...options];
    sorted.sort((a, b) => 
      sortOrder === "asc" 
        ? a[mapTo.label].localeCompare(b[mapTo.label]) 
        : b[mapTo.label].localeCompare(a[mapTo.label])
    );
    return sorted;
  }, [options, sortOrder, mapTo.label]);

  const filteredOptions = useMemo(() => {
    if (!filterValue) return sortedOptions;
    const lowercasedFilter = normalizeFilter
      ? removeDiacritics(filterValue.toLowerCase())
      : filterValue.toLowerCase();
    
    return sortedOptions.filter(option => {
      const label = normalizeFilter 
        ? removeDiacritics(option[mapTo.label].toLowerCase()) 
        : option[mapTo.label].toLowerCase();
      return label.includes(lowercasedFilter);
    });
  }, [filterValue, sortedOptions, normalizeFilter, mapTo.label, removeDiacritics]);

  const handleFilterValue = useCallback((event: any) => {
    setFilterValue(event.target.value);
  }, []);

  const handleCheckboxChange = useCallback(
    (event: any) => {
      const { value, checked } = event.target;
      setSelectedOptions(prevSelected => {
        const updatedSelection = checked
          ? [...prevSelected, value]
          : prevSelected.filter(option => option !== value);
  
        if (prevSelected !== updatedSelection) {
          onSelectionChange(updatedSelection);
        }
        return updatedSelection;
      });
    },
    [onSelectionChange]
  );
  

  const handleSelectAllChange = useCallback(
    (event: any) => {
      const { checked } = event.target;
      const updatedSelection = checked 
        ? filteredOptions.map(option => option[mapTo.value])
        : [];
      setSelectedOptions(updatedSelection);
      onSelectionChange(updatedSelection);
    },
    [filteredOptions, mapTo.value, onSelectionChange]
  );

  const isAllSelected = useMemo(() => 
    filteredOptions.length > 0 &&
    filteredOptions.every(option => selectedOptions.includes(option[mapTo.value])),
    [filteredOptions, selectedOptions, mapTo.value]
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
            density="high"
            className="placeholder:text-sm"
          />
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            setSelectedOptions([]);
            onSelectionChange([]);
          }}
          density="high"
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>

      <ul className="flex flex-col gap-2">
        <li className="!text-wrap text-sm">
          <Checkbox
            name={`${comboName}-select-all`}
            value="select-all"
            checked={isAllSelected}
            onChange={handleSelectAllChange}
          >
            <span className="text-govbr-gray-60">
              {isAllSelected ? "Deselecionar" : "Selecionar"} Todos
            </span>
          </Checkbox>
        </li>
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
});

export default MultiComboBox;
