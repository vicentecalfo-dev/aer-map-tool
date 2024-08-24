"use client";
import Accordion from "@codeworker.br/govbr-tw-react/dist/components/Accordion";
import FilterLayout from "./components/layout";
import AccordionFilter from "./components/filter/AccordionFilter";
import { useEffect, useState } from "react";
import axios from "axios";
import getFiltersService from "./services/getFilters";
import buildMongoQuery from "./services/buildQuery";
import { useTranslations } from "next-intl";
const BASE_API_URL = "http://localhost:3100/data";

export default function DashboardPage() {

  const [results, setResults] = useState<any>([]);
  const [filters, setFilters] = useState<any>([]);
  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    (async () => {
      const filterConfig: any = getFiltersService();
      setFilters(filterConfig);
      setIsMounted(true);
    })();
  }, []);

  const handleFilterSubmit = async () => {
    const query = buildMongoQuery({ selectedFilters, filters });
    console.log(query);
    const { data } = await axios.post(`${BASE_API_URL}/query`, query);
    setResults(data);
  };
  function handleFilterSelection({ filter, selection }: any) {
    setSelectedFilters((prevFilters: any) => {
      const updatedFilters = { ...prevFilters };
      if (selection && selection.length > 0 || selection !== null) {
        updatedFilters[filter] = selection;
      } else {
        delete updatedFilters[filter];
      }
      return updatedFilters;
    });
  }

  return (
    <>
      {isMounted && (
        <FilterLayout onFilterSubmit={handleFilterSubmit}>
          <Accordion value="" multi={false} className="bg-white w-full">
            {Object.keys(filters).map((filter) => (
              <AccordionFilter
                key={filter}
                filter={filter}
                options={filters[filter].options}
                onChangeSelection={handleFilterSelection}
                selected={selectedFilters[filter] || []}
                help={filters[filter]?.help || false}
                hint={filters[filter]?.hint || false}
                component={filters[filter]?.component}
              />
            ))}
          </Accordion>
          <>{JSON.stringify(results, null, 2)}</>
        </FilterLayout>
      )}
    </>
  );
}
