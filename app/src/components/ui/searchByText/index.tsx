import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Checkbox,
  Input,
  Button,
  Tooltip,
  Badge,
  Switch,
} from "@codeworker.br/govbr-tw-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faFileArrowUp,
  faPlus,
  faXmark,
  faTrash,
  faSortAlphaDown,
  faSortAlphaUp,
  faSort,
  faFileCsv,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

const SearchByText = ({
  validColumns = ["espécie", "nome científico", "species", "scientificName"],
  sortOrderDefault = "asc",
  isExactMatchDefault = true,
  isExactMatchButtonEnable = false,
  selectionTitle = "",
  inputPlaceholder = "",
  onChangeSelection = ([]) => {},
  selected = [],
  name = "searchByText",
}: any) => {
  const t = useTranslations("SearchByText");
  const [isExactMatch, setIsExactMatch] = useState(isExactMatchDefault);
  const [inputValue, setInputValue] = useState("");
  const [selection, setSelection] = useState<string[]>(selected);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">(
    sortOrderDefault
  );
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 5;

  useEffect(() => {
    setSelection(selected);
  }, [selected]);

  const handleCheckboxChange = () => {
    setIsExactMatch((prev:any) => !prev);
    onChangeSelection({
      selection: selection,
      isExactMatch: !isExactMatch,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddName = () => {
    if (inputValue.trim() !== "") {
      const newSelection = Array.from(
        new Set([inputValue.trim(), ...selection])
      );
      setSelection(newSelection);
      setInputValue("");
      onChangeSelection({
        selection: newSelection,
        isExactMatch,
      });
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        processFile(text);
      };
      reader.readAsText(file);
    }
  };

  const cleanName = (name: string) => {
    return name.replace(/"/g, "").trim();
  };

  const processFile = (text: string) => {
    const lines = text.split("\n");
    //const validColumns = ["espécie", "nome científico", "scientificName"];
    let newNames: string[] = [];

    if (lines.length > 0) {
      const header = lines[0].split(/[,\t]/);
      let columnIndex = -1;

      for (let i = 0; i < header.length; i++) {
        if (validColumns.includes(header[i])) {
          columnIndex = i;
          break;
        }
      }

      if (columnIndex !== -1) {
        for (let i = 1; i < lines.length; i++) {
          const columns = lines[i].split(/[,\t]/);
          let name = columns[columnIndex]?.trim();
          if (name) {
            name = cleanName(name);
            newNames.push(name);
          }
        }
        setError(null)
        const newSelection = Array.from(new Set([...newNames, ...selection]));
        setSelection(newSelection);
        onChangeSelection({
          selection: newSelection,
          isExactMatch,
        });
      }else{
        setError("Nenhuma coluna válida foi encontrada.")
      }
    }

  };

  const handleDeleteName = (nameToDelete: string) => {
    const newSelection = selection.filter((name) => name !== nameToDelete);
    setSelection(newSelection);
    onChangeSelection({
      selection: newSelection,
      isExactMatch,
    });
  };

  const handleClearAll = () => {
    setSelection([]);
    setInputValue("");
    setSearchFilter("");
    onChangeSelection(null);
  };

  const handleSortOrderChange = () => {
    setSortOrder((prev) => {
      if (prev === "asc") return "desc";
      if (prev === "desc") return "none";
      return "asc";
    });
  };

  // useEffect(()=>{
  //   if(selection.length === 0) handleClearAll();
  // }, [selection])

  const filteredSelection = selection.filter((name) =>
    name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const sortedSelection = [...filteredSelection].sort((a, b) => {
    if (sortOrder === "none") return 0;
    if (sortOrder === "asc") return a.localeCompare(b);
    if (sortOrder === "desc") return b.localeCompare(a);
    return 0;
  });

  const paginatedSelection = sortedSelection.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedSelection.length / itemsPerPage);

  return (
    <div className="grid grid-rows-[auto_280px_auto] overflow-hidden gap-3">
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-3 items-center w-full">
          {isExactMatchButtonEnable && (
            <div className="flex-1">
              {/* <Checkbox checked={isExactMatch} onChange={handleCheckboxChange}>
              Buscar Exata
            </Checkbox> */}
              <div className="flex text-xs gap-3 items-center">
                <Checkbox
                  checked={isExactMatch}
                  onChange={handleCheckboxChange}
                />
                <span className="flex-1 flex flex-col">
                  <span
                    className={
                      isExactMatch ? `text-govbr-gray-60` : `text-govbr-gray-20`
                    }
                  >
                    {t("isExactMatch")}
                  </span>
                </span>
                <span>
                  {/* <Switch
                  checked={isExactMatch}
                  onChange={handleCheckboxChange}
                  density="high"
                /> */}
                </span>
              </div>
            </div>
          )}
         
        </div>

        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 w-full">
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder={inputPlaceholder}
              className="placeholder:text-sm"
            />
          </div>
          <Tooltip position="left" className="text-xs">
            <Button
              size="icon"
              variant="outline"
              onClick={handleAddName}
              density="high"
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
            {t("add")}
          </Tooltip>
          <div className="flex relative justify-center">
            <div className="w-auto">
              <Tooltip position="left" className="text-xs">
                <>
                  <label
                    htmlFor={name}
                    className="w-full h-full absolute z-50 rounded-full cursor-pointer"
                    onClick={(event) => event.stopPropagation()}
                  >
                    &nbsp;
                  </label>

                  <Button size="icon" variant="outline" density="high">
                    <FontAwesomeIcon icon={faFileCsv} />
                  </Button>
                </>
                {t("upload")}
              </Tooltip>
            </div>

            <Input
              type="file"
              accept=".csv,.tsv"
              onChange={handleFileUpload}
              className="hidden"
              id={name}
              name={name}
            />
          </div>
        </div>

        <div className="flex w-full">
          <div className="!w-full">
            <Input
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={t("filterPlaceholder")}
              className="placeholder:text-sm "
              disabled={selection.length === 0} // Desabilitar campo de busca se não houver seleção
            />
          </div>
        </div>
      </div>

      <div className="overflow-y-auto w-full">
      {error && ( // Exibir mensagem de erro
          <div className="text-red-500 text-xs text-center py-3 mb-3">{t('noValidColumns')}</div>
        )}
        {selection.length > 0 && (
          <div className="py-3 text-govbr-blue-warm-vivid-70 text-sm flex gap-3 items-center">
            <span className="flex-1 text-xs">{selectionTitle}</span>
            {/* <Badge>{selection.length}</Badge> */}
            <Tooltip position="left" className="text-xs">
              <Button
                size="icon"
                variant="outline"
                onClick={handleSortOrderChange}
                density="high"
              >
                <FontAwesomeIcon
                  icon={
                    sortOrder === "asc"
                      ? faSortAlphaUp
                      : sortOrder === "desc"
                      ? faSortAlphaDown
                      : faSort
                  }
                />
              </Button>
              {sortOrder === "asc"
                ? t("sortAsc")
                : sortOrder === "desc"
                ? t("sortDesc")
                : t("sortNone")}
            </Tooltip>

            <Tooltip position="left" className="text-xs">
              <Button
                size="icon"
                variant="outline"
                onClick={handleClearAll}
                density="high"
              >
                <FontAwesomeIcon icon={faXmark} />
              </Button>
              {t("clearSelection")}
            </Tooltip>
          </div>
        )}
        <ul className="text-xs h-auto">
          {selection.length === 0 && (
            <li className="flex gap-2 h-full w-full bg-govbr-gray-2 rounded-md items-center text-left text-govbr-gray-60/80 p-6">
              <span className="flex flex-col gap-3">
                {!isExactMatch && <span>{t("similarityMatch")}</span>}

                <span>
                  {t.rich("instructions", {
                    columns: validColumns.join(", "),
                  })}
                </span>
              </span>
            </li>
          )}
          {paginatedSelection.map((name, index) => (
            <li
              key={index}
              className="flex items-center border-b border-govbr-gray-10 py-1"
            >
              <span className="flex-1">{name}</span>
              <Tooltip position="left" className="text-xs">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDeleteName(name)}
                  density="high"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </Button>
                {t("remove")}
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>

      {/* Paginação com visibilidade controlada */}
      <div
        className={`flex gap-1 items-center ${
          selection.length === 0 ? "invisible" : "visible"
        }`}
      >
        <Button
          size="icon"
          onClick={() => setCurrentPage((prev) => prev - 1)}
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
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          density="high"
          variant="ghost"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </div>
    </div>
  );
};

export default SearchByText;
