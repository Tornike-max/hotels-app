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
    <div className="w-full flex justify-between items-center py-10 px-10">
      <h1 className="text-white text-sm sm:text-base md:text-lg font-semibold">
        All Cabins
      </h1>

      <div className="max-w-3xl w-full flex items-center gap-4">
        <div className="w-full flex items-center justify-center gap-2 bg-slate-700 rounded-xl py-2 px-2">
          {filterMethods.map((method) => (
            <button
              key={method.value}
              onClick={() => handleFilterMethods(method.value)}
              className={`py-1 px-2 sm:py-2 sm:px-3 rounded-lg text-white ${
                getSortVal === method.value
                  ? "bg-indigo-600 text-white"
                  : "bg-none"
              } hover:bg-indigo-600  font-semibold text-sm sm:text-base md:text-lg duration-100 transition-all`}
            >
              {method.label}
            </button>
          ))}
        </div>
        <div className="flex items-center w-full">
          <Select
            value={getSortVal}
            onChange={(e) => handleSortMethods(e.target.value)}
            label="Select Sort Method"
            className="max-w-xs"
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
