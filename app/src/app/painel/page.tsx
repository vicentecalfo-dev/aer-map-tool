"use client";
import HeaderGov from "@/components/app/header-gov";
import FilterTitle from "./filterTitle";
import Accordion from "@codeworker.br/govbr-tw-react/dist/components/Accordion";
import FilterButtons from "./filterButtons";
import { SpeciesTable } from "@/components/app/tables/species";
import FooterGov from "@/components/app/footer-gov";
import { columns } from "@/components/app/tables/species/columns";
import { useEffect, useState } from "react";
import useFetchData from "@/lib/useFetchData";
import Badge from "@codeworker.br/govbr-tw-react/dist/components/Badge";
import MultiComboBox from "@/components/ui/multi-combo-box";
import { Spinner } from "@codeworker.br/govbr-tw-react/dist/components/Spinner";
import useSelection from "./useSelection";

import states from "../../lib/options/states-options.json" assert { type: "json" };
import establishments from "../../lib/options/establishment-options.json" assert { type: "json" };
import endemism from "../../lib/options/endemism-options.json" assert { type: "json" };
import phytogeographicDomains from "../../lib/options/phytogeographic-domain-options.json" assert { type: "json" };
import assessmentCategories from "../../lib/options/iucn-category-options.json" assert { type: "json" };
import { Button, Switch } from "@codeworker.br/govbr-tw-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons/faFilterCircleXmark";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterByType from "./filterByType";
import FilterByName from "./filterByName";

const BASE_API_URL = "http://localhost:3100/data";

export default function DashboardPage() {
  //Carregamento da página
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //Query
  const [query, setQuery] = useState<any>({});
  useEffect(() => {
    console.log(JSON.stringify(query, null, 2));
  }, [query]);

  function handleQueryUpdate(key: string, values: any[]) {
    if (key === "assessment.reassessment" || key === "redList" || key === "assessment.reasonsForReAssessment.change")
      values = values.map((value) => value === "true");
    if (key === "assessment.year")
      values = values.map((value) => Number(value));
    setQuery((prevQuery: any) => {
      const updatedQuery = { ...prevQuery };
      if (values.length > 0) {
        updatedQuery[key] = { $in: values };
      } else {
        delete updatedQuery[key];
      }
      return updatedQuery;
    });
  }

  //Query Result
  const [queryResult, setQueryResult] = useState<any[]>([]);
  const [fetchQuery, setFetchQuery] = useState<{
    url: string;
    options?: any;
  } | null>(null);
  let { data: queryResultRaw, loading: queryFetchLoading } = useFetchData(
    fetchQuery?.url || "",
    fetchQuery?.options
  );
  useEffect(() => {
    if (!queryFetchLoading && fetchQuery?.url) {
      setQueryResult(queryResultRaw || []);
    }
  }, [queryFetchLoading, queryResultRaw]);
  function handleSubmitQuery() {
    setFetchQuery({
      url: `${BASE_API_URL}/query`,
      options: {
        method: "POST",
        body: query,
      },
    });
  }

  //Clear All Filters
  function handleClearAllFilters() {
    handleKingdomSelectionChange([]);
    handleFamilySelectionChange([]);
    handlePhylumSelectionChange([]);
    handleClassSelectionChange([]);
    handleOrderSelectionChange([]);
    handleLifeformSelectionChange([]);
    handleHabitatSelectionChange([]);
    handleVegetationTypeSelectionChange([]);
    handleStateSelectionChange([]);
    handleEstablishmentSelectionChange([]);
    handleEndemismSelectionChange([]);
    handlePhytogeographicDomainSelectionChange([]);
    handleAssessmentCategorySelectionChange([]);
    handleAssessmentCriteriaSelectionChange([]);
    handleReAssessmentSelectionChange([]);
    handleAssessmentYearSelectionChange([]);
    handleRedListSelectionChange([]);
    setFilterByNameValue("");
    setQuery({});
    setQueryResult([]);
  }

  // API Options
  const { data: families, loading: familiesLoading } = useFetchData(
    `${BASE_API_URL}/family`
  );
  const { data: phyla, loading: phylaLoading } = useFetchData(
    `${BASE_API_URL}/phylum`
  );
  const { data: classes, loading: classesLoading } = useFetchData(
    `${BASE_API_URL}/class`
  );
  const { data: orders, loading: ordersLoading } = useFetchData(
    `${BASE_API_URL}/order`
  );
  const { data: lifeForms, loading: lifeFormsLoading } = useFetchData(
    `${BASE_API_URL}/lifeForm`
  );

  const { data: habitats, loading: habitatsLoading } = useFetchData(
    `${BASE_API_URL}/habitat`
  );
  const { data: vegetationTypes, loading: vegetationTypesLoading } =
    useFetchData(`${BASE_API_URL}/vegetationType`);

  const { data: assessmentCriteria, loading: assessmentCriteriaLoading } =
    useFetchData(`${BASE_API_URL}/assessmentCriteira`);

  const { data: assessmentYears, loading: assessmentYearLoading } =
    useFetchData(`${BASE_API_URL}/assessmentYear`);

  // Controllers Filter
  const [filterByTypeValue, setFilterByTypeValue] = useState("scientificName");
  const [filterByNameValue, setFilterByNameValue] = useState("");

  function buildLikeQuery(string: any) {
    const sanitizedStringExtraSpaces = string.replace(/\s+/g, " ").trim();
    const sanitizedString = sanitizedStringExtraSpaces
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .trim();
    return { $regex: sanitizedString, $options: "i" };
  }

  function handleFilterByTypeValue(event: any) {
    const selectedType = event.target.value;
    const newQuery = { ...query };
    if (filterByTypeValue) {
      delete newQuery[filterByTypeValue];
    }

    if (selectedType !== "Escolha ..." && filterByNameValue) {
      newQuery[selectedType] = buildLikeQuery(filterByNameValue);
    }

    setFilterByTypeValue(selectedType);
    setQuery(newQuery);
  }

  function handleFilterByName(event: any) {
    const inputValue = event.target.value;
    setFilterByNameValue(inputValue);

    setQuery((prevQuery: any) => {
      const updatedQuery = { ...prevQuery };
      if (
        !inputValue ||
        filterByTypeValue === "" ||
        filterByTypeValue === "Escolha ..."
      ) {
        delete updatedQuery[filterByTypeValue];
      } else {
        updatedQuery[filterByTypeValue] = buildLikeQuery(inputValue);
      }

      return updatedQuery;
    });
  }

  const {
    selectedItems: selectedKingdom,
    handleSelectionChange: handleKingdomSelectionChange,
    handleRemoveSelection: handleKingdomSelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedFamilies,
    handleSelectionChange: handleFamilySelectionChange,
    handleRemoveSelection: handleFamilySelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedPhyla,
    handleSelectionChange: handlePhylumSelectionChange,
    handleRemoveSelection: handlePhylumSelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedClasses,
    handleSelectionChange: handleClassSelectionChange,
    handleRemoveSelection: handleClassSelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedOrders,
    handleSelectionChange: handleOrderSelectionChange,
    handleRemoveSelection: handleOrderSelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedLifeforms,
    handleSelectionChange: handleLifeformSelectionChange,
    handleRemoveSelection: handleLifeformSelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedHabitats,
    handleSelectionChange: handleHabitatSelectionChange,
    handleRemoveSelection: handleHabitatSelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedVegetationTypes,
    handleSelectionChange: handleVegetationTypeSelectionChange,
    handleRemoveSelection: handleVegetationTypeSelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedStates,
    handleSelectionChange: handleStateSelectionChange,
    handleRemoveSelection: handleStateSelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedEstablishments,
    handleSelectionChange: handleEstablishmentSelectionChange,
    handleRemoveSelection: handleEstablishmentSelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedEndemism,
    handleSelectionChange: handleEndemismSelectionChange,
    handleRemoveSelection: handleEndemismSelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedPhytogeographicDomains,
    handleSelectionChange: handlePhytogeographicDomainSelectionChange,
    handleRemoveSelection: handlePhytogeographicDomainSelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedAssessmentCategories,
    handleSelectionChange: handleAssessmentCategorySelectionChange,
    handleRemoveSelection: handleAsessmentCategorySelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedAssessmentCriteria,
    handleSelectionChange: handleAssessmentCriteriaSelectionChange,
    handleRemoveSelection: handlAssessmentCriteriaSelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedReAssessment,
    handleSelectionChange: handleReAssessmentSelectionChange,
    handleRemoveSelection: handleReAssessmentSelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedReAssessmentWithChange,
    handleSelectionChange: handleReAssessmentWithChangeSelectionChange,
    handleRemoveSelection: handleReAssessmentWithChangeSelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedAssessmentYears,
    handleSelectionChange: handleAssessmentYearSelectionChange,
    handleRemoveSelection: handleAssessmentYearSelectionRemove,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedRedList,
    handleSelectionChange: handleRedListSelectionChange,
    handleRemoveSelection: handleRedListSelectionRemove,
  } = useSelection<string>([]);

  const kingdoms: any = [
    { label: "Fungo", value: "Fungi" },
    { label: "Planta", value: "Plantae" },
  ];
  const reassessmentOptions = [
    { label: "Sim", value: "true" },
    { label: "Não", value: "false" },
  ];
  const redListOptions = [
    { label: "Sim", value: "true" },
    { label: "Não", value: "false" },
  ];

  //Configuração do Config
  const filtersConfig = [
    {
      title: "Reino",
      context: "Taxonomia",
      options: kingdoms,
      selectedItems: selectedKingdom,
      handleSelectionChange: handleKingdomSelectionChange,
      handleRemoveSelection: handleKingdomSelectionRemove,
      field: "kingdom",
    },
    {
      title: "Família",
      context: "Taxonomia",
      options: families,
      selectedItems: selectedFamilies,
      handleSelectionChange: handleFamilySelectionChange,
      handleRemoveSelection: handleFamilySelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      loading: familiesLoading,
      field: "family",
    },
    {
      title: "Filo",
      context: "Taxonomia",
      options: phyla,
      selectedItems: selectedPhyla,
      handleSelectionChange: handlePhylumSelectionChange,
      handleRemoveSelection: handlePhylumSelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      loading: phylaLoading,
      field: "phylum",
    },
    {
      title: "Classe",
      context: "Taxonomia",
      options: classes,
      selectedItems: selectedClasses,
      handleSelectionChange: handleClassSelectionChange,
      handleRemoveSelection: handleClassSelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      loading: classesLoading,
      field: "class",
    },
    {
      title: "Ordem",
      context: "Taxonomia",
      options: orders,
      selectedItems: selectedOrders,
      handleSelectionChange: handleOrderSelectionChange,
      handleRemoveSelection: handleOrderSelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      loading: ordersLoading,
      field: "order",
    },
    {
      title: "Forma de Vida",
      context: "Perfil",
      options: lifeForms,
      selectedItems: selectedLifeforms,
      handleSelectionChange: handleLifeformSelectionChange,
      handleRemoveSelection: handleLifeformSelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      loading: lifeFormsLoading,
      field: "profile.lifeForm",
    },
    {
      title: "Habitat",
      context: "Perfil",
      options: habitats,
      selectedItems: selectedHabitats,
      handleSelectionChange: handleHabitatSelectionChange,
      handleRemoveSelection: handleHabitatSelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      loading: habitatsLoading,
      field: "profile.habitat",
    },
    {
      title: "Tipo de Vegetação",
      context: "Perfil",
      options: vegetationTypes,
      selectedItems: selectedVegetationTypes,
      handleSelectionChange: handleVegetationTypeSelectionChange,
      handleRemoveSelection: handleVegetationTypeSelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      loading: vegetationTypesLoading,
      field: "profile.vegetationType",
    },
    {
      title: "Estado",
      context: "Distribuição Geográfica",
      options: states,
      selectedItems: selectedStates,
      handleSelectionChange: handleStateSelectionChange,
      handleRemoveSelection: handleStateSelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      field: "distribution.states",
    },
    {
      title: "Origem",
      context: "Distribuição Geográfica",
      options: establishments,
      selectedItems: selectedEstablishments,
      handleSelectionChange: handleEstablishmentSelectionChange,
      handleRemoveSelection: handleEstablishmentSelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      field: "distribution.establishmentMeans",
    },
    {
      title: "Endemismo",
      context: "Distribuição Geográfica",
      options: endemism,
      selectedItems: selectedEndemism,
      handleSelectionChange: handleEndemismSelectionChange,
      handleRemoveSelection: handleEndemismSelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      field: "distribution.endemism",
    },
    {
      title: "Biomas",
      context: "Distribuição Geográfica",
      options: phytogeographicDomains,
      selectedItems: selectedPhytogeographicDomains,
      handleSelectionChange: handlePhytogeographicDomainSelectionChange,
      handleRemoveSelection: handlePhytogeographicDomainSelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      field: "distribution.phytogeographicDomain",
    },
    {
      title: "Lista Vermelha MMA",
      context: "Avaliação do Risco de Extinção",
      options: redListOptions,
      selectedItems: selectedRedList,
      handleSelectionChange: handleRedListSelectionChange,
      handleRemoveSelection: handleRedListSelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      field: "redList",
    },
    {
      title: "Categoria",
      context: "Avaliação do Risco de Extinção",
      options: assessmentCategories,
      selectedItems: selectedAssessmentCategories,
      handleSelectionChange: handleAssessmentCategorySelectionChange,
      handleRemoveSelection: handleAsessmentCategorySelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      field: "assessment.category",
    },
    {
      title: "Critério",
      context: "Avaliação do Risco de Extinção",
      options: assessmentCriteria,
      selectedItems: selectedAssessmentCriteria,
      handleSelectionChange: handleAssessmentCriteriaSelectionChange,
      handleRemoveSelection: handlAssessmentCriteriaSelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      loading: assessmentCriteriaLoading,
      field: "assessment.criteria",
    },
    {
      title: "Reavaliação",
      context: "Avaliação do Risco de Extinção",
      options: reassessmentOptions,
      selectedItems: selectedReAssessment,
      handleSelectionChange: handleReAssessmentSelectionChange,
      handleRemoveSelection: handleReAssessmentSelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      field: "assessment.reassessment",
    },
    {
      title: "Reavaliação Com Mudança de Categoria",
      context: "Avaliação do Risco de Extinção",
      options: reassessmentOptions,
      selectedItems: selectedReAssessmentWithChange,
      handleSelectionChange: handleReAssessmentWithChangeSelectionChange,
      handleRemoveSelection: handleReAssessmentWithChangeSelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      field: "assessment.reasonsForReAssessment.change",
    },
    {
      title: "Ano de Avaliação",
      context: "Avaliação do Risco de Extinção",
      options: assessmentYears,
      selectedItems: selectedAssessmentYears,
      handleSelectionChange: handleAssessmentYearSelectionChange,
      handleRemoveSelection: handleAssessmentYearSelectionRemove,
      onQueryUpdate: handleQueryUpdate,
      loading: assessmentYearLoading,
      field: "assessment.year",
    },
  ];

  return (
    <>
      {isMounted && (
        <div className="h-screen w-screen bg-govbr-gray-5 overflow-hidden grid grid-rows-[auto_1fr_auto]">
          <HeaderGov>
            Painel Interativo sobre o Estado de Conservação das Espécies da
            Flora Brasileira
          </HeaderGov>
          <main className="gap-5 row-span-1 grid grid-cols-[auto_1fr] overflow-hidden">
            <aside className="w-[350px] grid grid-rows-[1fr_auto] gap-5 overflow-hidden">
              <div className="overflow-y-auto overflow-x-hidden">
                <div className="flex gap-3 items-center">
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-bold text-govbr-blue-warm-vivid-70 px-6">
                      Filtros Disponíveis
                    </h3>

                    {Object.keys(query).length > 0 ? (
                      <span className="px-6 text-xs text-govbr-gray-60">
                        Você selecionou&nbsp;
                        <strong className="text-govbr-blue-warm-vivid-70">
                          {Object.keys(query).length}
                        </strong>
                        &nbsp;
                        {Object.keys(query).length === 1 ? "filtro" : "filtros"}
                        .
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="flex pr-5">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          disabled={Object.keys(query).length === 0}
                          desity="high"
                        >
                          <FontAwesomeIcon icon={faFilter} />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="top" className="bg-govbr-pure-0">
                        <SheetHeader>
                          <div className="flex gap-5 items-center">
                            <SheetTitle className="flex-1">
                              Filtros Ativados
                            </SheetTitle>
                            <SheetClose asChild>
                              <Button size="icon" variant="ghost">
                                <FontAwesomeIcon icon={faXmark} />
                              </Button>
                            </SheetClose>
                          </div>
                        </SheetHeader>
                        <div className="flex py-4 max-h-[300px] overflow-hidden">
                          <ul className="flex gap-1 flex-wrap overflow-y-auto">
                            {filtersConfig.map(
                              ({
                                selectedItems,
                                options,
                                field,
                                title,
                                handleRemoveSelection,
                                handleSelectionChange,
                              }) =>
                                selectedItems.length > 0 && (
                                  <>
                                    <li key={`${field}_title`}>
                                      <Badge variant="neutral">
                                        {title}
                                        <FontAwesomeIcon
                                          icon={faXmark}
                                          onClick={() => {
                                            handleSelectionChange([]);
                                            handleSubmitQuery();
                                          }}
                                        />
                                      </Badge>
                                    </li>
                                    {options
                                      .filter(({ label, value }: any) =>
                                        selectedItems.includes(value)
                                      )
                                      .map(({ label, value }: any) => (
                                        <li key={`${field}_options_${value}`}>
                                          <Badge>
                                            {label}
                                            <FontAwesomeIcon
                                              icon={faXmark}
                                              onClick={() => {
                                                handleRemoveSelection(value);
                                                handleSubmitQuery();
                                              }}
                                            />
                                          </Badge>
                                        </li>
                                      ))}
                                  </>
                                )
                            )}
                          </ul>
                        </div>
                      </SheetContent>
                    </Sheet>

                    <Button
                      size="icon"
                      variant="ghost-danger"
                      disabled={Object.keys(query).length === 0}
                      onClick={handleClearAllFilters}
                      desity="high"
                    >
                      <FontAwesomeIcon icon={faFilterCircleXmark} />
                    </Button>
                  </div>
                </div>
                <FilterTitle>
                  <span>Nome</span>
                  <span className="text-xs !font-light text-gray-400">
                    Taxonomia
                  </span>
                </FilterTitle>
                <div className="w-full flex flex-col gap-2 border-b border-govbr-gray-10 pb-6 px-6">
                  <FilterByType
                    filterByTypeValue={filterByTypeValue}
                    handleFilterByTypeValue={handleFilterByTypeValue}
                  />
                  <FilterByName
                    filterByNameValue={filterByNameValue}
                    handleFilterByName={handleFilterByName}
                  />
                </div>
                <Accordion value="" multi={false} className="bg-white w-full">
                  {filtersConfig.map(
                    (
                      {
                        field,
                        title,
                        context,
                        loading,
                        selectedItems,
                        options,
                        handleSelectionChange,
                      },
                      index: number
                    ) => (
                      <Accordion.Item value={field} key={`${field}_${index}`}>
                        <div className="flex gap-5 items-center">
                          <span className="flex-1 text-sm items-center gap-2 flex">
                            {loading ? <Spinner size="button" /> : ""}
                            <span>
                              <span className="block">{title}</span>
                              <span className="text-xs !font-light text-gray-400">
                                {context}
                              </span>
                            </span>
                          </span>
                          <Badge>{selectedItems.length}</Badge>
                        </div>

                        <div className="flex flex-col gap-5">
                          <MultiComboBox
                            comboName={field}
                            options={options}
                            selected={selectedItems}
                            onSelectionChange={(items) => {
                              handleSelectionChange(items);
                              handleQueryUpdate(field, items);
                            }}
                            sortOrder="asc"
                          />
                        </div>
                      </Accordion.Item>
                    )
                  )}
                </Accordion>
              </div>
              <FilterButtons
                query={query}
                onSubmit={handleSubmitQuery}
                loading={queryFetchLoading}
              />
            </aside>
            <div className="overflow-hidden rounded-md grid grid-rows-[1fr] pr-6">
              {queryResult && (
                <SpeciesTable
                  columns={columns}
                  data={queryResult}
                  isLoading={queryFetchLoading}
                />
              )}
            </div>
          </main>
          <FooterGov />
        </div>
      )}
    </>
  );
}
