import { addDays, format } from "date-fns";

export const formatDateRange = (
  startDateString: string,
  daysToAdd: number
): string => {
  const startDate = new Date(startDateString);
  const endDate = addDays(startDate, daysToAdd);

  const formattedStartDate = format(startDate, "MMM d");
  const formattedEndDate = format(endDate, "MMM d");

  return `${formattedStartDate} - ${formattedEndDate}`;
};
