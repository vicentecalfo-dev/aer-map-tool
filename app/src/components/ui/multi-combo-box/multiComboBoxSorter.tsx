const multiComboBoxSorter = ({ order, map, options }: any) => {
  if (order === "none") return options;
  const sorted = [...options];
  sorted.sort((a, b) =>
    order === "asc"
      ? a[map.label].localeCompare(b[map.label])
      : b[map.label].localeCompare(a[map.label])
  );
  return sorted;
};

export default multiComboBoxSorter;