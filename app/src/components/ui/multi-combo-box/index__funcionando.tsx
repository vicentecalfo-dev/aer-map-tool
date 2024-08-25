import {
  Checkbox,
  Input,
  Button,
  Tooltip,
  Switch,
} from "@codeworker.br/govbr-tw-react";
import multiComboBoxSorter from "./multiComboBoxSorter";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

const MultiComboBox = ({
  name,
  options,
  selected = [],
  order = "none", // "asc" | "desc" | "none"
  isExactMatchDefault = true,
  map = { label: "label", value: "value" },
  itemsPerPage = 5,
  onChangeSelection = ([]) => {},
  showSelectAll = true,
  initialSelectAll = false,
  hint,
  paginate = true, // Prop para controlar a exibição da paginação
}: any) => {
  const t = useTranslations("MultiComboBox");
  const [isExactMatch, setIsExactMatch] = useState(isExactMatchDefault);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selected);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [selectAll, setSelectAll] = useState(initialSelectAll);

  // Atualiza selectedOptions quando selected muda
  useEffect(() => {
    setSelectedOptions(selected);
  }, [selected]);

  // Atualiza selectAll com base nas opções selecionadas
  useEffect(() => {
    const allOptions = options.map((option) => option[map.value]);
    setSelectAll(
      allOptions.length > 0 &&
        allOptions.every((value) => selectedOptions.includes(value))
    );
  }, [options, selectedOptions, map.value]);

  // Ordenando as opções
  options = multiComboBoxSorter({ options, map, order });

  // Filtrando as opções com base no texto do filtro
  const filteredOptions = options.filter((option) =>
    option[map.label].toLowerCase().includes(filterText.toLowerCase())
  );

  // Calcula o total de páginas com base nas opções filtradas
  const totalPages = Math.ceil(filteredOptions.length / itemsPerPage);

  // Filtra os itens da página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = paginate
    ? filteredOptions.slice(startIndex, endIndex)
    : filteredOptions;

  // Função para lidar com mudanças na seleção
  function handleSelectionChange(event: any) {
    const { value, checked } = event.target;
    let updatedSelected = [...selectedOptions];

    if (checked) {
      // Adiciona o item selecionado
      updatedSelected.push(value);
    } else {
      // Remove o item desmarcado
      updatedSelected = updatedSelected.filter((item) => item !== value);
    }

    setSelectedOptions(updatedSelected); // Atualiza o estado local
    onChangeSelection(updatedSelected);
  }

  // Função para selecionar ou desmarcar todas as opções
  function handleSelectAllChange(event: any) {
    const { checked } = event.target;
    setSelectAll(checked);

    if (checked) {
      const allValues = options.map((option) => option[map.value]);
      setSelectedOptions(allValues);
      onChangeSelection(allValues);
    } else {
      setSelectedOptions([]);
      onChangeSelection([]);
    }
  }

  // Funções de navegação entre páginas
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Função para lidar com a mudança no texto de filtro
  const handleFilterTextChange = (event: any) => {
    setFilterText(event.target.value);
    setCurrentPage(1); // Volta para a primeira página quando o filtro muda
  };

  // Função para remover todas as seleções
  const handleRemoveAllSelections = () => {
    setSelectedOptions([]); // Limpa as seleções
    onChangeSelection([]); // Notifica o componente pai
  };


  return (
    <div className="grid grid-rows-[auto_1fr_auto] gap-3 w-full">

      <div className="flex gap-3 w-full items-center">
        <div className="flex-1">
          <Input
            type="text"
            value={filterText}
            onChange={handleFilterTextChange}
            placeholder="Filtrar..."
          />
        </div>
        <Tooltip position="left" className="text-xs">
          <Button
            size="icon"
            variant="outline"
            onClick={handleRemoveAllSelections}
            density="high"
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
          {t("clearSelection")}
        </Tooltip>
      </div>
      <div className="overflow-y-auto max-h-[170px]">
        <ul className="flex flex-col gap-1">
          {(showSelectAll && filteredOptions.length > 0) && (
            <li className="!text-wrap text-sm">
              <Checkbox checked={selectAll} onChange={handleSelectAllChange}>
                <span className="text-govbr-gray-60">
                  {selectAll ? t("deselectAll") : t("selectAll")}
                </span>
              </Checkbox>
            </li>
          )}
          {
            filteredOptions.length === 0 ? <span className="text-govbr-gray-20 text-sm flex">
            {t("noOptionFound")}
          </span> : ""
          }
          {currentItems.map((option: any) => (
            <li className="!text-wrap text-sm" key={option[map.value]}>
              <Checkbox
                name={name}
                value={option[map.value]}
                checked={selectedOptions.includes(option[map.value])}
                onChange={handleSelectionChange}
              >
                {option[map.label]}
              </Checkbox>
            </li>
          ))}
        </ul>
      </div>

      {paginate && options.length > itemsPerPage && (
        <div className="flex gap-1 items-center">
          <Button
            size="icon"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            density="high"
            variant="ghost"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <div className="flex-1 text-xs text-center">
            {currentPage}/{totalPages}
          </div>
          <Button
            size="icon"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            density="high"
            variant="ghost"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MultiComboBox;
