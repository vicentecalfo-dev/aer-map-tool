const sanitizedString = (string: any) => {
  string = string.replace(/\s+/g, " ").trim();
  string = string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim();
  return string;
};

const buildMongoQuery = ({ selectedFilters, filters }: any) => {
  const mongoQuery: any = {};

  Object.keys(selectedFilters).forEach((filter) => {
    const dbField = filters[filter]?.dbField;
    const component = filters[filter]?.component;

    if (dbField) {
      if (
        component === "multiComboBox" &&
        selectedFilters[filter]?.selection?.length > 0
      ) {
        const isExactMatch = selectedFilters[filter].isExactMatch;

        const existsQueries = selectedFilters[filter].selection.filter(
          (item: any) => item === "$exists:true" || item === "$exists:false"
        );

        const terms = selectedFilters[filter].selection
          .filter(
            (item: any) => item !== "$exists:true" && item !== "$exists:false"
          )
          .map((item: any) => {
            if (!isNaN(item)) return Number(item);
            if (item.toLowerCase() === "true") return true;
            if (item.toLowerCase() === "false") return false;
            return item;
          });
        if (isExactMatch) {
          mongoQuery[dbField] = terms;
        } else {
          mongoQuery[dbField] = {
            $in: terms,
          };
        }

        if (existsQueries.length > 0) {
          existsQueries.forEach((query:any) =>{
            const value = query.split(":")
            mongoQuery[dbField] = {
              [value[0]]: value[1] === "true",
            };
          })
        }
      }

      if (component === "searchByNumber") {
        mongoQuery[dbField] = selectedFilters[filter];
      }

      if (
        component === "searchByText" &&
        selectedFilters[filter].selection.length > 0
      ) {
        const isExactMatch = selectedFilters[filter].isExactMatch;
        if (isExactMatch) {
          mongoQuery[dbField] = {
            $in: selectedFilters[filter].selection,
          };
        } else {
          mongoQuery["$or"] = selectedFilters[filter].selection.map(
            (term: any) => ({
              [dbField]: {
                $regex: `.*${sanitizedString(term)}.*`,
                $options: "i",
              },
            })
          );
        }
        //mongoQuery[dbField] = selectedFilters[filter];
      }
    }
  });
  return mongoQuery;
};

export default buildMongoQuery;
