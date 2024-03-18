import { Select, SelectItem } from "@nextui-org/react";
import { filterMethods, sortOptions } from "../../constants/constant";
import { useSearchParams } from "react-router-dom";

const CabinsHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getSortVal = searchParams.get("filter-by") || "all";

  const handleFilterMethods = (value: string) => {
    if (!value) return;
    searchParams.set("filter-by", value);
    setSearchParams(searchParams);
  };

  const handleSortMethods = (value: string) => {
    if (value === "") return;
    searchParams.set("sort-by", value);
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-5xl w-full flex justify-between items-center flex-col gap-2 py-4 px-10">
      <h1 className="text-white text-lg md:text-xl font-semibold">
        All Cabins
      </h1>

      <div className="w-full flex items-center justify-center flex-col xl:flex-row gap-4">
        <div className="max-w-xl w-full flex items-center justify-center gap-2 bg-black rounded-xl py-2 px-2">
          {filterMethods.map((method) => (
            <button
              key={method.value}
              onClick={() => handleFilterMethods(method.value)}
              className={`py-1 px-2 sm:py-2 sm:px-3 rounded-lg text-white ${
                getSortVal === method.value
                  ? "bg-indigo-600 text-white"
                  : "bg-none"
              } hover:bg-indigo-600  font-semibold text-xs sm:text-sm md:text-lg duration-100 transition-all`}
            >
              {method.label}
            </button>
          ))}
        </div>
        <div className="max-w-xl flex items-center w-full">
          <Select
            value={getSortVal}
            onChange={(e) => handleSortMethods(e.target.value)}
            label="Select Sort Method"
            className="w-full"
          >
            {sortOptions.map((option) => (
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

export default CabinsHeader;
