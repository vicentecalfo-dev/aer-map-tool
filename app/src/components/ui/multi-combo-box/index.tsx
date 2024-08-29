import {
  Checkbox,
  Input,
  Button,
  Tooltip,
  Switch,
  Radio,
  FeaturedTitle,
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
  sortOrder, // "asc" | "desc" | "none"
  isExactMatchDefault,
  isExactMatchButtonEnable,
  map = { label: "label", value: "value" },
  itemsPerPage = 5,
  onChangeSelection = ([]) => {},
  showSelectAll = true,
  initialSelectAll = false,
  exists = true,
  hint,
  paginate = true, // Prop para controlar a exibição da paginação,
}: any) => {
  // console.log(name, sortOrder);
  const t = useTranslations("MultiComboBox");
  const [isExactMatch, setIsExactMatch] = useState(isExactMatchDefault);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selected);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [selectAll, setSelectAll] = useState(initialSelectAll);
  const [existsFilter, setExistsFilter] = useState<string | null>(null);

  // Atualiza selectedOptions quando selected muda
  useEffect(() => {
    setSelectedOptions(selected);
  }, [selected]);

  // Atualiza selectAll com base nas opções selecionadas
  useEffect(() => {
    const allOptions = filteredOptions.map((option: any) => option[map.value]);
    setSelectAll(
      allOptions.length > 0 &&
        allOptions.every((value: any) => selectedOptions.includes(value))
    );
  }, [options, selectedOptions, map.value]);

  // Ordenando as opções
  options = multiComboBoxSorter({ options, map, sortOrder });

  // Filtrando as opções com base no texto do filtro
  // console.log(name, options);
  const filteredOptions = options.filter((option: any) =>
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
    onChangeSelection({
      selection: updatedSelected,
      isExactMatch: isExactMatch,
    });
  }

  // Função para selecionar ou desmarcar todas as opções
  function handleSelectAllChange(event: any) {
    const { checked } = event.target;
    setSelectAll(checked);

    if (checked) {
      const allValues = filteredOptions.map((option: any) => option[map.value]);
      setSelectedOptions(allValues);
      onChangeSelection({
        selection: allValues,
        isExactMatch: isExactMatch,
      });
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
    setExistsFilter(null);
    onChangeSelection([]); // Notifica o componente pai
  };

  const handleCheckboxChange = () => {
    setIsExactMatch((prev: any) => !prev);
    onChangeSelection({
      selection: selectedOptions,
      isExactMatch: !isExactMatch,
    });
  };

  const handleSelectionExists = (event: any) => {
    const value = event.target.value;

    // Atualiza o estado baseado no valor do checkbox
    setExistsFilter((prev) => {
      if (value === prev) {
        // Se o valor clicado for o mesmo que o filtro existente, remova todas as seleções
        handleRemoveAllSelections();
        return null;
      } else {
        //if (value === "$exists:false") {
        // Se for "$exists:false", remova todas as seleções
        handleRemoveAllSelections();
        // }
        setSelectedOptions([value]); // Atualiza o estado local
        onChangeSelection({
          selection: [value], // Este valor pode estar desatualizado aqui
          isExactMatch: isExactMatch,
        });
        return value; // Atualiza o estado de existsFilter
      }
    });
  };

  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] gap-3 w-full">
      {exists && (
        <ul className="flex flex-col gap-1 mt-3">
          <li className="!text-wrap text-sm text-govbr-gray-60 flex gap-3">
            <Radio
              name={name}
              value="$exists:true"
              checked={existsFilter === "$exists:true"}
              onClick={handleSelectionExists}
              onChange={()=>{}}
            >{t("exists.yes")}</Radio>
              
              
          </li>
          <li className="!text-wrap text-sm flex gap-3">
            <Radio
              name={name}
              value="$exists:false"
              checked={existsFilter === "$exists:false"}
              onClick={handleSelectionExists}
              onChange={()=>{}}
            >{t("exists.no")}</Radio>
              
       
          </li>
        </ul>
      )}
     

      <div className="relative flex gap-3 flex-col">
        <div
          className={`h-full w-full z-50  text-govbr-gray-80 text-sm absolute top-0 bg-govbr-gray-2 p-6 rounded-md ${
            existsFilter !== null ? "flex" : "hidden"
          }`}
        >
          {existsFilter === "$exists:true" ? (
            <span className=" h-auto">{t("exists.yesWarning")}</span>
          ) : (
            <span className=" h-auto">{t("exists.noWarning")}</span>
          )}
        </div>
        {exists && <FeaturedTitle>
        <span>ou</span>
      </FeaturedTitle>}
        {isExactMatchButtonEnable && (
          <div className="flex items-center gap-3">
            <Checkbox
              checked={isExactMatch}
              onChange={handleCheckboxChange}
              disabled={existsFilter !== null}
            >
              <span className="flex-1 flex text-xs items-center">
                <span
                  className={
                    isExactMatch ? `text-govbr-gray-60` : `text-govbr-gray-60`
                  }
                >
                  {isExactMatch ? t("isExactMatch") : t("atLeastOn")}
                </span>
              </span>
            </Checkbox>
          </div>
        )}
        <div className="flex gap-3 w-full items-center">
          <div className="flex-1">
            <Input
              type="text"
              value={filterText}
              onChange={handleFilterTextChange}
              placeholder="Filtrar..."
              disabled={existsFilter !== null}
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
        <div className="overflow-y-auto max-h-[220px]">
          <ul className="flex flex-col gap-1">
            {showSelectAll && filteredOptions.length > 0 && (
              <li className="!text-wrap text-sm">
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  disabled={existsFilter !== null}
                >
                 
                    {selectAll ? t("deselectAll") : t("selectAll")}
           
                </Checkbox>
              </li>
            )}
            {filteredOptions.length === 0 ? (
              <span className="text-govbr-gray-60 text-xs flex">
                {t("noOptionFound", {
                  term: filterText,
                })}
              </span>
            ) : (
              ""
            )}
            {currentItems.map((option: any) => (
              <li className="!text-wrap text-sm" key={option[map.value]}>
                <Checkbox
                  name={name}
                  value={option[map.value]}
                  checked={selectedOptions.includes(option[map.value])}
                  onChange={handleSelectionChange}
                  disabled={existsFilter !== null}
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
    </div>
  );
};

export default MultiComboBox;
