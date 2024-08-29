import Accordion from "@codeworker.br/govbr-tw-react/dist/components/Accordion";
import AccordionFilterTitle from "./AccordionFilterTitle";
import MultiComboBox from "@/components/ui/multi-combo-box";
import { useEffect, useState } from "react";
import SearchByNumber from "@/components/ui/searchByNumber";
import SearchByText from "@/components/ui/searchByText";
import { useTranslations } from "next-intl";

export default function AccordionFilter({
  filter,
  onChangeSelection,
  selected,
  options = [],
  sortOrder,
  validColumns,
  component,
  exists,
  help,
  hint,
  translate,
  isExactMatch,
  isExactMatchValue,
}: any) {
  const [resolvedOptions, setResolvedOptions]: any = useState();
  const t: any = useTranslations(translate);
  const translateOptions = ({ options }: any) => {
    if (component === "multiComboBox" && typeof translate === "string") {
      options = options.map(({ label, value }: any) => ({
        value,
        label: t(value),
      }));
    }
    return options;
  };
  useEffect(() => {
    (async () => {
      try {
        if (Array.isArray(options) || !(options instanceof Promise)) {
          options = translateOptions({ options });
          setResolvedOptions(options);
        } else {
          const resolvedOptions = await options;
          options = translateOptions({ options: resolvedOptions.data });
          setResolvedOptions(options);
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
            hint={hint ? t('hint') : hint}
            exists={exists}
            isExactMatchDefault={isExactMatchValue}
            isExactMatchButtonEnable={isExactMatch}
            onChangeSelection={(selection: any) => {
              console.log(selection);
              onChangeSelection({ filter, selection });
            }}
          />
        );
      case "searchByNumber":
        return (
          <SearchByNumber
            comparisonTypeDefault={resolvedOptions.comparisonTypeDefault}
            minimumValue={resolvedOptions.limits[0]}
            maximumValue={resolvedOptions.limits[1]}
            exists={exists}
            hint={hint ? t('hint') : hint}
            onChange={(selection: any) => {
              onChangeSelection({ filter, selection });
            }}
          />
        );
      default:
        return (
          <>
            <SearchByText
              name={filter}
              selected={selected}
              onChangeSelection={(selection: any) =>
                onChangeSelection({ filter, selection })
              }
              selectionTitle={t("selectionTitle")}
              inputPlaceholder={t("inputPlaceholder")}
              isExactMatchDefault={isExactMatchValue}
              isExactMatchButtonEnable={isExactMatch}
              validColumns = {validColumns}
            />
          </>
        );
    }
  };

  let selectedHasSelection = selected.hasOwnProperty("selection");
  if (selectedHasSelection) selected = selected.selection;

  return (
    <Accordion.Item value={filter} key={filter}>
      <AccordionFilterTitle filter={filter} selected={selected} help={help} />
      {resolvedOptions && renderSwitch()}
    </Accordion.Item>
  );
}
