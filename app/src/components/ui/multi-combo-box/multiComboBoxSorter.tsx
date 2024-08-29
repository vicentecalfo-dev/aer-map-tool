const multiComboBoxSorter = ({ sortOrder, map, options }: any) => {
  if (sortOrder === "none") return options;
  const sorted = [...options];
  sorted.sort((a, b) =>
    sortOrder === "asc"
      ? a[map.label].localeCompare(b[map.label])
      : b[map.label].localeCompare(a[map.label])
  );
  return sorted;
};

export default multiComboBoxSorter;