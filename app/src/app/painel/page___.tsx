"use client";
import HeaderGov from "@/components/app/header-gov";
import { useEffect, useState } from "react";
import FilterTitle from "./filterTitle";
import FilterByType from "./filterByType";
import FilterByName from "./filterByName";
import FilterButtons from "./filterButtons";
import { Accordion, Badge, Switch } from "@codeworker.br/govbr-tw-react";
import FilterAccordionItem from "./filterAccordionItem";
import useSelection from "./useSelection";
import useFetchData from "@/lib/useFetchData";
import { SpeciesTable } from "@/components/app/tables/species";
import { columns } from "@/components/app/tables/species/columns";
import FooterGov from "@/components/app/footer-gov";
import states from "../../lib/options/states-options.json" assert { type: "json" };
import establishments from "../../lib/options/establishment-options.json" assert { type: "json" };
import endemism from "../../lib/options/endemism-options.json" assert { type: "json" };
import phytogeographicDomains from "../../lib/options/phytogeographic-domain-options.json" assert { type: "json" };
import assessmentCategories from "../../lib/options/iucn-category-options.json" assert { type: "json" };

const kingdomOptions = [
  { label: "Fungo", value: "Fungi" },
  { label: "Planta", value: "Plantae" },
];

const reassessmentOptions = [
  { label: "Sim", value: "true" },
  { label: "Não", value: "false" },
];

const BASE_API_URL = "http://localhost:3100/data";

export default function DashboardPage() {
  const [query, setQuery] = useState<any>({});
  const [filterByTypeValue, setFilterByTypeValue] = useState("");
  const [filterByNameValue, setFilterByNameValue] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function handleFilterByTypeValue(event: any) {
    const selectedType = event.target.value;
    const newQuery = { ...query };
    if (filterByTypeValue) {
      delete newQuery[filterByTypeValue];
    }

    if (selectedType !== "Escolha ..." && filterByNameValue) {
      newQuery[selectedType] = filterByNameValue;
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
        updatedQuery[filterByTypeValue] = inputValue;
      }

      return updatedQuery;
    });
  }

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

  const {
    selectedItems: selectedKingdom,
    handleSelectionChange: handleKingdomSelectionChange,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedFamilies,
    handleSelectionChange: handleFamilySelectionChange,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedPhyla,
    handleSelectionChange: handlePhylumSelectionChange,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedClasses,
    handleSelectionChange: handleClassSelectionChange,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedOrders,
    handleSelectionChange: handleOrderSelectionChange,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedLifeforms,
    handleSelectionChange: handleLifeformSelectionChange,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedHabitats,
    handleSelectionChange: handleHabitatSelectionChange,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedVegetationTypes,
    handleSelectionChange: handleVegetationTypeSelectionChange,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedStates,
    handleSelectionChange: handleStateSelectionChange,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedEstablishments,
    handleSelectionChange: handleEstablishmentSelectionChange,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedEndemism,
    handleSelectionChange: handleEndemismSelectionChange,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedPhytogeographicDomains,
    handleSelectionChange: handlePhytogeographicDomainSelectionChange,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedAssessmentCategories,
    handleSelectionChange: handleAssessmentCategorySelectionChange,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedAssessmentCriteria,
    handleSelectionChange: handleAssessmentCriteriaSelectionChange,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedReAssessment,
    handleSelectionChange: handleReAssessmentSelectionChange,
  } = useSelection<string>([]);

  const {
    selectedItems: selectedAssessmentYears,
    handleSelectionChange: handleAssessmentYearSelectionChange,
  } = useSelection<string>([]);

  // Atualiza a query global com base no filtro do Accordion
  function handleQueryUpdate(key: string, values: any[]) {
    if (key === "assessment.reassessment")
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

  // Configuração dos componentes de filtro
  const filtersConfig = [
    {
      title: "Reino",
      context: "Taxonomia",
      options: kingdomOptions,
      selectedItems: selectedKingdom,
      handleSelectionChange: handleKingdomSelectionChange,
      field: "kingdom",
    },
    {
      title: "Família",
      context: "Taxonomia",
      options: families,
      selectedItems: selectedFamilies,
      handleSelectionChange: handleFamilySelectionChange,
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
      onQueryUpdate: handleQueryUpdate,
      field: "distribution.states",
    },
    {
      title: "Origem",
      context: "Distribuição Geográfica",
      options: establishments,
      selectedItems: selectedEstablishments,
      handleSelectionChange: handleEstablishmentSelectionChange,
      onQueryUpdate: handleQueryUpdate,
      field: "distribution.establishmentMeans",
    },
    {
      title: "Endemismo",
      context: "Distribuição Geográfica",
      options: endemism,
      selectedItems: selectedEndemism,
      handleSelectionChange: handleEndemismSelectionChange,
      onQueryUpdate: handleQueryUpdate,
      field: "distribution.endemism",
    },
    {
      title: "Biomas",
      context: "Distribuição Geográfica",
      options: phytogeographicDomains,
      selectedItems: selectedPhytogeographicDomains,
      handleSelectionChange: handlePhytogeographicDomainSelectionChange,
      onQueryUpdate: handleQueryUpdate,
      field: "distribution.phytogeographicDomain",
    },
    {
      title: "Categoria",
      context: "Avaliação do Risco de Extinção",
      options: assessmentCategories,
      selectedItems: selectedAssessmentCategories,
      handleSelectionChange: handleAssessmentCategorySelectionChange,
      onQueryUpdate: handleQueryUpdate,
      field: "assessment.category",
    },
    {
      title: "Critério",
      context: "Avaliação do Risco de Extinção",
      options: assessmentCriteria,
      selectedItems: selectedAssessmentCriteria,
      handleSelectionChange: handleAssessmentCriteriaSelectionChange,
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
      onQueryUpdate: handleQueryUpdate,
      field: "assessment.reassessment",
    },
    {
      title: "Ano de Avaliação",
      context: "Avaliação do Risco de Extinção",
      options: assessmentYears,
      selectedItems: selectedAssessmentYears,
      handleSelectionChange: handleAssessmentYearSelectionChange,
      onQueryUpdate: handleQueryUpdate,
      loading: assessmentYearLoading,
      field: "assessment.year",
    },
  ];

  useEffect(() => {
    console.log(JSON.stringify(query, null, 2));
  }, [query]);

  // Submit
  const [fetchQuery, setFetchQuery] = useState<{
    url: string;
    options?: any;
  } | null>(null);
  let { data: queryResultRaw, loading: queryFetchLoading } = useFetchData(
    fetchQuery?.url || "",
    fetchQuery?.options
  );
  const [queryResult, setQueryResult] = useState<any[]>([]);
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

  //Reseta todos os filtros
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
    setQuery({});
    setQueryResult([]);
  }

  return (
    <>
      {isMounted && (
        <div className="h-screen w-screen bg-govbr-gray-5 overflow-hidden grid grid-rows-[auto_1fr_auto]">
          <HeaderGov />
          <main className="px-10 gap-5 row-span-1 grid grid-cols-[auto_1fr] overflow-hidden">
            <aside className="w-[350px] grid grid-rows-[1fr_auto] gap-5 overflow-hidden">
              <div className="grid grid-rows-[1fr] overflow-y-auto overflow-x-hidden">
                <h3 className="font-bold text-govbr-blue-warm-vivid-70 px-5">
                  Filtros Disponíveis
                </h3>
                <FilterTitle>Nomes</FilterTitle>
                <div className="max-w-[320px] flex flex-col gap-2 border-b border-govbr-gray-10 pb-2 px-5">
                  <FilterByType
                    filterByTypeValue={filterByTypeValue}
                    handleFilterByTypeValue={handleFilterByTypeValue}
                  />
                  <FilterByName
                    filterByNameValue={filterByNameValue}
                    handleFilterByName={handleFilterByName}
                  />
                </div>
                <Accordion
                  value=""
                  multi={false}
                  className="bg-white max-w-[320px]"
                >
                  {filtersConfig.map((filter, index) => (
                    <FilterAccordionItem
                      key={index}
                      title={filter.title}
                      context={filter.context}
                      options={filter.options}
                      selectedItems={filter.selectedItems}
                      handleSelectionChange={filter.handleSelectionChange}
                      onQueryUpdate={handleQueryUpdate}
                      field={filter.field}
                      loading={filter.loading}
                    />
                  ))}
                </Accordion>
              </div>
              <FilterButtons
                query={query}
                onSubmit={handleSubmitQuery}
                loading={queryFetchLoading}
                onReset={handleClearAllFilters}
              />
            </aside>
            <div className="overflow-hidden rounded-md grid grid-rows-[1fr]">
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
