export function generateYearOptions(
  startYear: number
): { label: string; value: number }[] {
  const yearArray: { label: string; value: number }[] = [];
  const endYear = new Date().getFullYear();

  for (let year = startYear; year <= endYear; year++) {
    yearArray.push({
      label: year.toString(),
      value: year,
    });
  }

  return yearArray;
}
