function generateYearOptions(startYear: number, endYear: number): { value: number; label: string }[] {
  const years: { value: number; label: string }[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ value: year, label: year.toString() });
  }
  return years;
}

const today = new Date();
const currentYear = today.getFullYear();
const prevYear = currentYear - 1;
const periodYearsOptions = generateYearOptions(prevYear, currentYear).reverse();

export default periodYearsOptions;