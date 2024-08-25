// "use client";
// import Accordion from "@codeworker.br/govbr-tw-react/dist/components/Accordion";
// import FilterLayout from "./components/layout";
// import AccordionFilter from "./components/filter/AccordionFilter";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import getFiltersService from "./services/getFilters";
// import buildMongoQuery from "./services/buildQuery";
// import { useTranslations } from "next-intl";
// const BASE_API_URL = "http://localhost:3100/data";

// export default function DashboardPage() {

//   const [results, setResults] = useState<any>([]);
//   const [filters, setFilters] = useState<any>([]);
//   const [selectedFilters, setSelectedFilters] = useState<any>({});
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const filterConfig: any = getFiltersService();
//       setFilters(filterConfig);
//       setIsMounted(true);
//     })();
//   }, []);

//   const handleFilterSubmit = async () => {
//     const query = buildMongoQuery({ selectedFilters, filters });
//     console.log(query);
//     const { data } = await axios.post(`${BASE_API_URL}/query`, query);
//     setResults(data);
//   };
//   function handleFilterSelection({ filter, selection }: any) {
//     setSelectedFilters((prevFilters: any) => {
//       const updatedFilters = { ...prevFilters };
//       if (selection && selection.length > 0 || selection !== null) {
//         updatedFilters[filter] = selection;
//       } else {
//         delete updatedFilters[filter];
//       }
//       return updatedFilters;
//     });
//   }

//   return (
//     <>
//       {isMounted && (
//         <FilterLayout onFilterSubmit={handleFilterSubmit}>
//           <Accordion value="" multi={false} className="bg-white w-full">
//             {Object.keys(filters).map((filter) => (
//               <AccordionFilter
//                 key={filter}
//                 filter={filter}
//                 options={filters[filter].options}
//                 onChangeSelection={handleFilterSelection}
//                 selected={selectedFilters[filter] || []}
//                 help={filters[filter]?.help || false}
//                 hint={filters[filter]?.hint || false}
//                 component={filters[filter]?.component}
//                 translate={filters[filter]?.translate || null}
//               />
//             ))}
//           </Accordion>
//           <>
//           {results.length}
//           <br />
//           {JSON.stringify(results, null, 2)}
//           </>
//         </FilterLayout>
//       )}
//     </>
//   );
// }
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

const BASE_API_URL = "http://localhost:3100/data";

export default function DashboardPage() {
  const [results, setResults] = useState<any>([]);
  const [filters, setFilters] = useState<any>([]);
  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(false)
  const t = useTranslations(); // Hook para traduções

  useEffect(() => {
    (async () => {
      const filterConfig: any = getFiltersService();
      setFilters(filterConfig);
      setIsMounted(true);
    })();
  }, []);

  const handleFilterSubmit = async () => {
    setLoading(true)
    const query = buildMongoQuery({ selectedFilters, filters });
    console.log(query);
    const { data } = await axios.post(`${BASE_API_URL}/query`, query);
    console.log(data)
    setResults(data);
    setLoading(false)
  };

  function handleFilterSelection({ filter, selection }: any) {
    console.log({filter,selection})
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


  // pe, rj, es, ba

  return (
    <>
      {isMounted && (
        <FilterLayout onFilterSubmit={handleFilterSubmit}>
          <div className="grid grid-rows-[auto_1fr] gap-3 w-full overflow-hidden">
            <div className="flex  flex-col w-full gap-3">
            <h2 className="text-govbr-blue-warm-vivid-70 text-base font-semibold px-6 flex gap-3">
                      <span className="flex-1">Filtros Disponíveis</span>
                      <Badge>{Object.keys(filters).length}</Badge>
                    </h2>
              <div className="flex w-full px-6 gap-3 items-center">
                <div className="flex-1">
                   
                    <Input
                      type="text"
                      placeholder="Buscar filtros..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
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
            <div className="overflow-x-auto flex h-full">
              <Accordion value="" multi={false} className="bg-white w-full">
                {Object.keys(filters)
                  .filter((filter) => {
                    const translatedTitle = t(`Filters.${filter}.label`);
                    return translatedTitle
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                  })
                  .map((filter) => (
                    <AccordionFilter
                      key={filter}
                      filter={filter}
                      options={filters[filter].options}
                      onChangeSelection={handleFilterSelection}
                      selected={selectedFilters[filter] || []}
                      help={filters[filter].help || false}
                      hint={filters[filter].hint || false}
                      component={filters[filter].component}
                      translate={filters[filter].translate ? filters[filter].translate : null}
                      isExactMatch={filters[filter].isExactMatch ? filters[filter].isExactMatch : false}
                      isExactMatchValue={filters[filter].isExactMatchValue ? filters[filter].isExactMatchValue : false }
                    />
                  ))}
              </Accordion>
            </div>
          </div>
          <>
          {loading && "Carregandoooooo"}
            {results.length}
            <br />
            {JSON.stringify(results, null, 2)}
          </>
        </FilterLayout>
      )}
    </>
  );
}
