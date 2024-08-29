"use client";
import Accordion from "@codeworker.br/govbr-tw-react/dist/components/Accordion";
import FilterLayout from "./components/layout";
import AccordionFilter from "./components/filter/AccordionFilter";
import { useEffect, useState } from "react";
import axios from "axios";
import getFiltersService from "./services/getFilters";
import buildMongoQuery from "./services/buildQuery";
import { useTranslations } from "next-intl";
import Input from "@codeworker.br/govbr-tw-react/dist/components/Input";
import Tooltip from "@codeworker.br/govbr-tw-react/dist/components/Tooltip";
import { Button } from "@codeworker.br/govbr-tw-react/dist/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Badge from "@codeworker.br/govbr-tw-react/dist/components/Badge";
import { columns } from "@/components/app/tables/species/columns";
import { SpeciesTable } from "@/components/app/tables/species";
import DashboardResultTable from "./components/results";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const BASE_API_URL = "http://localhost:3100/data";

export default function DashboardPage() {
  const [results, setResults] = useState<any>({
    results: [],
    notFound: [],
    searchedScientificNames: [],
  });
  const [filters, setFilters] = useState<any>([]);
  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const t = useTranslations(); // Hook para traduções

  useEffect(() => {
    (async () => {
      const filterConfig: any = getFiltersService();
      setFilters(filterConfig);
      setIsMounted(true);
    })();
  }, []);

  const handleFilterSubmit = async () => {
    setLoading(true);
    const query = buildMongoQuery({ selectedFilters, filters });
    console.log(query);
    const { data } = await axios.post(`${BASE_API_URL}/query`, query);
    console.log(data);

    console.log(selectedFilters);

    setResults(data);
    setLoading(false);
  };

  function handleFilterSelection({ filter, selection }: any) {
    console.log({ filter, selection });
    setSelectedFilters((prevFilters: any) => {
      const updatedFilters = { ...prevFilters };
      if ((selection && selection.length > 0) || selection !== null) {
        updatedFilters[filter] = selection;
      } else {
        delete updatedFilters[filter];
      }
      return updatedFilters;
    });
  }

  function handleClearFilters() {
    setSelectedFilters([]);
    //setSearchTerm("");
    setResults({
      results: [],
      notFound: [],
      searchedScientificNames: [],
    });
  }

  const filteredFilters = Object.keys(filters).filter((filter) => {
    const translatedTitle = t(`Filters.${filter}.label`);
    return translatedTitle.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const noFiltersFound = filteredFilters.length === 0;

  return (
    <>
      {isMounted && (
        <FilterLayout>
          <div className="grid grid-rows-[auto_1fr] gap-3 w-full overflow-hidden">
            <div className="flex  flex-col w-full gap-3 border-b border-govbr-gray-10 pb-3">
              <div className="flex gap-3 items-center">
                <div className="text-govbr-blue-warm-vivid-70 font-semibold pl-6 flex gap-3 w-1/2 items-center">
                  <span className="flex-1 text-xs">Filtros Disponíveis</span>
                  <Badge>{Object.keys(filters).length}</Badge>
                </div>
                <div className="text-govbr-blue-warm-vivid-70 font-semibold pl-6 flex gap-3 w-1/2 items-center">
                  <div className="flex-1 text-xs">Filtros Selecionados</div>
                  <Sheet>
                    <SheetTrigger><Badge>{Object.keys(selectedFilters).length}</Badge></SheetTrigger>
                    <SheetContent side="left" className="bg-white w-[600px] !max-w-[600px]">
                      <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <SheetDescription>
                          <ul className="flex flex-col gap-6">
                          {Object.keys(selectedFilters).map((key:any)=>(
                            <li>{t(`Filters.${key}.label`)}{ selectedFilters[key].selection.length}<div className="flex gap-2 max-h-[120px]"><div className="overflow-auto flex gap-2 flex-wrap">{
                              selectedFilters[key].selection.map((option:any) => (<Badge>{option}</Badge>) )
                            }</div></div></li>
                          ))}
                          </ul>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
              <div className="flex w-full pl-6  gap-3 items-center">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Buscar filtros..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    iconPosition="right"
                  />
                </div>
                <div>
                  <Tooltip position="left" className="text-xs">
                    <Button size="icon" variant="outline" density="high">
                      <FontAwesomeIcon icon={faXmark} />
                    </Button>
                    Limpar Seleção Geral
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto flex h-full w-full">
              {!noFiltersFound && (
                <Accordion value="" multi={false} className="bg-white w-full">
                  {filteredFilters.map((filter) => (
                    <AccordionFilter
                      key={filter}
                      filter={filter}
                      options={filters[filter].options}
                      onChangeSelection={handleFilterSelection}
                      selected={selectedFilters[filter] || []}
                      help={filters[filter].help || false}
                      hint={filters[filter].hint || false}
                      sortOrder={filters[filter].sortOrder || "asc"}
                      component={filters[filter].component}
                      exists={filters[filter].exists}
                      validColumns={filters[filter].validColumns}
                      translate={
                        filters[filter].translate
                          ? filters[filter].translate
                          : null
                      }
                      isExactMatch={
                        filters[filter].isExactMatch
                          ? filters[filter].isExactMatch
                          : false
                      }
                      isExactMatchValue={
                        filters[filter].isExactMatchValue
                          ? filters[filter].isExactMatchValue
                          : false
                      }
                    />
                  ))}
                </Accordion>
              )}
              {noFiltersFound && (
                <span className="p-6 text-sm text-govbr-gray-20 w-full">
                  Nenhuma filtro encontrado com o termo "{searchTerm}".
                </span>
              )}
            </div>
          </div>
          <>
            {results && (
              <DashboardResultTable data={results} loading={loading} />
            )}
          </>
          <>
            <Button
              onClick={handleFilterSubmit}
              className="w-1/2 !font-normal"
              disabled={Object.keys(selectedFilters).length === 0}
            >
              {t("Filters.form.search")}
            </Button>
            <Button
              onClick={handleClearFilters}
              className="w-1/2 !font-normal"
              variant="outline"
            >
              {t("Filters.form.clearSearch")}
            </Button>
          </>
        </FilterLayout>
      )}
    </>
  );
}
