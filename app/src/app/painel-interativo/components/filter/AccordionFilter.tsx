import Accordion from "@codeworker.br/govbr-tw-react/dist/components/Accordion";
import AccordionFilterTitle from "./AccordionFilterTitle";
import MultiComboBox from "@/components/ui/multi-combo-box";
import { useEffect, useState } from "react";
import SearchByNumber from "@/components/ui/serchByNumber";


export default function AccordionFilter({
  filter,
  onChangeSelection,
  selected = [],
  options = [],
  sortOrder = "asc",
  component,
  help,
  hint
}: any) {
  const [resolvedOptions, setResolvedOptions]: any = useState();

  useEffect(() => {
    (async () => {
      try {
        if (Array.isArray(options) || !(options instanceof Promise)) {
          setResolvedOptions(options);
        } else {
          const resolvedOptions = await options;
          setResolvedOptions(resolvedOptions.data);
        }
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    })();
  }, [filter]);

  const renderSwitch = () => {
    switch (component) {
      case "multiComboBox":
        return (
          <MultiComboBox
            name={filter}
            options={resolvedOptions}
            selected={selected}
            sortOrder={sortOrder}
            hint={hint}
            onChangeSelection={(selection: any) =>
              onChangeSelection({ filter, selection })
            }
          />
        );
      case "searchByNumber":
        return (
          <SearchByNumber
            comparisonTypeDefault={resolvedOptions.comparisonTypeDefault}
            minimumValue = {resolvedOptions.limits[0]}
            maximumValue = {resolvedOptions.limits[1]}
            hint={hint}
            onChange={(selection: any) => {
              //console.log('year',selection)
              onChangeSelection({ filter, selection });
            }}
          />
        );
      default:
        return <>Sem Component</>;
    }
  };

  return (
    <Accordion.Item value={filter} key={filter}>
      <AccordionFilterTitle filter={filter} selected={selected} help={help} />
      {resolvedOptions && renderSwitch()}
    </Accordion.Item>
  );
}
