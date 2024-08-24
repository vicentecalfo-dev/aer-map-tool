import AccordionFilterHint from "@/app/painel-interativo/components/filter/AccordionFilterHint";
import {
  Button,
  Input,
  NativeSelect,
  Tooltip,
} from "@codeworker.br/govbr-tw-react";
import { faCircleInfo, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import React, { useState, ChangeEvent } from "react";

interface SearchByNumberProps {
  comparisonTypeDefault?: string;
  minimumValue?: number;
  maximumValue?: number;
  onChange?: any;
  hint?: boolean;
}

const buildQuery = ({
  validateNumber,
  value1,
  value2,
  comparisonType,
}: any) => {
  let newQuery = null;

  const value1Int = parseInt(value1, 10);
  const value2Int = parseInt(value2, 10);

  const isValue1Valid = !isNaN(value1Int) && validateNumber(value1Int);
  const isValue2Valid = !isNaN(value2Int) && validateNumber(value2Int);

  switch (comparisonType) {
    case "$eq":
      if (isValue1Valid) {
        newQuery = { $eq: value1Int };
      }
      break;
    case "$ne":
      if (isValue1Valid) {
        newQuery = { $ne: value1Int };
      }
      break;
    case "$gt":
      if (isValue1Valid) {
        newQuery = { $gt: value1Int };
      }
      break;
    case "$gte":
      if (isValue1Valid) {
        newQuery = { $gte: value1Int };
      }
      break;
    case "$lt":
      if (isValue1Valid) {
        newQuery = { $lt: value1Int };
      }
      break;
    case "$lte":
      if (isValue1Valid) {
        newQuery = { $lte: value1Int };
      }
      break;
    case "$gt-$lt":
      if (isValue1Valid && isValue2Valid && value1Int < value2Int) {
        newQuery = { $gt: value1Int, $lt: value2Int };
      }
      break;
    case "$gte-$lte":
      if (isValue1Valid && isValue2Valid && value1Int <= value2Int) {
        newQuery = { $gte: value1Int, $lte: value2Int };
      }
      break;
    default:
      newQuery = null;
  }
  return newQuery;
};

const SearchByNumber: React.FC<SearchByNumberProps> = ({
  comparisonTypeDefault = "$gte",
  minimumValue = 0,
  maximumValue = 100,
  onChange,
  hint = false,
}) => {
  const t = useTranslations("SearchByNumber");
  const [comparisonType, setComparisonType] = useState<string>(
    comparisonTypeDefault
  );
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");
  const [value1Error, setValue1Error] = useState<string | null>(null);
  const [value2Error, setValue2Error] = useState<string | null>(null);

  const validateNumber = (value: number) =>
    value >= minimumValue && value <= maximumValue;

  const handleComparisonTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newComparisonType = e.target.value;
    setComparisonType(newComparisonType);

    if (newComparisonType === "") {
      setValue1("");
      setValue2("");
      setValue1Error(null);
      setValue2Error(null);
    }

    const newQuery = buildQuery({
      validateNumber,
      value1: newComparisonType === "" ? "" : value1,
      value2: newComparisonType === "" ? "" : value2,
      comparisonType: newComparisonType,
    });
    if (onChange) onChange(newQuery);
  };

  const handleValue1Change = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue1(value);

    const numberValue = parseInt(value, 10);
    let error = null;

    if (!validateNumber(numberValue)) {
      error = t("errorMessageBetween", {
        minimumValue,
        maximumValue,
      });
    } else if (
      (comparisonType === "$gt-$lt" || comparisonType === "$gte-$lte") &&
      value2 &&
      numberValue >= parseInt(value2, 10)
    ) {
      error = t("errorInitialLessThanFinal");
    }

    setValue1Error(error);
    setValue2Error(null); // Limpa o erro do value2 se houver

    const newQuery = buildQuery({
      validateNumber,
      value1: value,
      value2: error ? "" : value2,
      comparisonType,
    });
    if (onChange) onChange(newQuery);
  };

  const handleValue2Change = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue2(value);

    const numberValue = parseInt(value, 10);
    let error = null;

    if (!validateNumber(numberValue)) {
      error = t("errorMessageBetween", {
        minimumValue,
        maximumValue,
      });
    } else if (
      (comparisonType === "$gt-$lt" || comparisonType === "$gte-$lte") &&
      value1 &&
      numberValue <= parseInt(value1, 10)
    ) {
      error = t("errorFinalGreaterThanInitial");
    }

    setValue2Error(error);
    setValue1Error(null); // Limpa o erro do value1 se houver

    const newQuery = buildQuery({
      validateNumber,
      value1: error ? "" : value1,
      value2: value,
      comparisonType,
    });
    if (onChange) onChange(newQuery);
  };

  const clearFields = () => {
    setValue1("");
    setValue2("");
    setValue1Error(null);
    setValue2Error(null);
    if (onChange) onChange(null);
  };

  return (
    <div className="h-[130px] flex w-full flex-col gap-3">
      {hint && (
        <>
          <AccordionFilterHint></AccordionFilterHint>
        </>
      )}
      <div className="flex gap-3 items-center">
        <div className="flex-1">
          <NativeSelect
            value={comparisonType}
            onChange={handleComparisonTypeChange}
            options={[
              "$eq",
              "$ne",
              "$gt",
              "$gte",
              "$lt",
              "$lte",
              "$gt-$lt",
              "$gte-$lte",
            ].map((operator) => ({
              value: operator,
              label: t(operator),
            }))}
          />
        </div>
        <div>
          <Tooltip position="left" className="text-xs">
            <Button
              size="icon"
              variant="outline"
              onClick={clearFields}
              density="high"
            >
              <FontAwesomeIcon icon={faXmark} />
            </Button>
            {t("clearSelection")}
          </Tooltip>
        </div>
      </div>

      <div className="flex gap-3">
        <div
          className={`relative ${
            comparisonType === "$gt-$lt" || comparisonType === "$gte-$lte"
              ? "w-1/2"
              : "w-full"
          }`}
        >
          <Input
            type="number"
            placeholder={
              comparisonType === "$gt-$lt" || comparisonType === "$gte-$lte"
                ? "Valor Inicial"
                : "Valor"
            }
            value={value1}
            onChange={handleValue1Change}
            max={maximumValue}
            min={minimumValue}
            variant={value1Error ? "danger" : "default"}
          />
        </div>
        {(comparisonType === "$gt-$lt" || comparisonType === "$gte-$lte") && (
          <div className="relative w-1/2">
            <Input
              type="number"
              placeholder="Valor Final"
              value={value2}
              onChange={handleValue2Change}
              max={maximumValue}
              min={minimumValue}
              variant={value2Error ? "danger" : "default"}
            />
          </div>
        )}
      </div>
      <div>
        {value1Error && (
          <span className="text-govbr-red-vivid-50 text-xs">{value1Error}</span>
        )}
        {value2Error && (
          <span className="text-govbr-red-vivid-50 text-xs">{value2Error}</span>
        )}
      </div>
    </div>
  );
};

export default SearchByNumber;
