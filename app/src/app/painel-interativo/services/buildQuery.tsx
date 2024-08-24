const buildMongoQuery = ({ selectedFilters, filters }: any) => {
  const mongoQuery: any = {};

  Object.keys(selectedFilters).forEach((filter) => {
    const dbField = filters[filter]?.dbField;
    const component = filters[filter]?.component;

    if (dbField) {
      if (component === "multiComboBox") {
        // Para MultiComboBox, use $in
        mongoQuery[dbField] = {
          $in: selectedFilters[filter].map((item: any) => {
            if (!isNaN(item)) return Number(item);
            if (item.toLowerCase() === "true") return true;
            if (item.toLowerCase() === "false") return false;
            return item;
          }),
        };
      } 
      
      if (component === "searchByNumber") {
        mongoQuery[dbField] = selectedFilters[filter]; 
      } 
    }
  });
  return mongoQuery;
};

export default buildMongoQuery;
