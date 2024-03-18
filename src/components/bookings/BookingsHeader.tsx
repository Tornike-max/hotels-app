import { useSearchParams } from "react-router-dom";
import {
  bookingSortOptions,
  filterBookingMethods,
} from "../../constants/constant";
import { Select, SelectItem } from "@nextui-org/react";

const BookingsHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getFilterVal = searchParams.get("bookings-filterBy") || "all";
  const getSortVal = searchParams.get("bookings-sortBy");

  const handleFilterMethods = (value: string) => {
    if (!value) return;
    searchParams.set("bookings-filterBy", value);
    setSearchParams(searchParams);
  };

  const handleSortMethods = (value: string) => {
    if (value === "") return;
    searchParams.set("bookings-sortBy", value);
    setSearchParams(searchParams);
  };
  return (
    <div className="max-w-5xl w-full flex justify-center items-center flex-col gap-2 py-4 px-10">
      <h1 className="text-white text-lg md:text-2xl font-semibold pb-4">
        All Bookings
      </h1>

      <div className="w-full flex items-center justify-center flex-col xl:flex-row gap-4">
        <div className="max-w-xl w-full flex items-center justify-center gap-2 bg-black rounded-xl py-2 px-2">
          {filterBookingMethods.map((method) => (
            <button
              key={method.value}
              onClick={() => handleFilterMethods(method.value)}
              className={`py-1 px-2 sm:py-2 sm:px-3 rounded-lg text-white ${
                getFilterVal === method.value
                  ? "bg-primary-500 text-white"
                  : "bg-none"
              } hover:bg-primary-500  font-semibold text-xs sm:text-sm md:text-base 2xl:text-lg duration-100 transition-all`}
            >
              {method.label}
            </button>
          ))}
        </div>
        <div className="max-w-xl flex items-center w-full">
          <Select
            value={getSortVal || ""}
            onChange={(e) => handleSortMethods(e.target.value)}
            label="Select Sort Method"
            className="xl:max-w-sm w-full"
          >
            {bookingSortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BookingsHeader;
