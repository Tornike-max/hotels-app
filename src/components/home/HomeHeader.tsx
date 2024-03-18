import { useSearchParams } from "react-router-dom";

const HomeHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getParams = searchParams.get("last") || "7";

  const handleChangeDays = (value: string) => {
    if (value === "7") {
      searchParams.set("last", value);
      setSearchParams(searchParams);
    }

    if (value === "30") {
      searchParams.set("last", value);
      setSearchParams(searchParams);
    }

    if (value === "90") {
      searchParams.set("last", value);
      setSearchParams(searchParams);
    }
  };
  return (
    <div className="w-full flex justify-between items-center bg-black rounded-md py-2 px-4">
      <h1 className="text-white text-xl sm:text-2xl font-semibold">
        Dashboard
      </h1>
      <div className="flex items-center gap-2 py-1 px-2 bg-gray-950 rounded-md">
        <button
          onClick={() => handleChangeDays("7")}
          className={`py-1 px-2 rounded-md hover:bg-primary-600  text-white ${
            getParams === "7" ? "bg-primary-600" : "bg-none"
          }  font-semibold`}
        >
          Last 7 days
        </button>
        <button
          onClick={() => handleChangeDays("30")}
          className={`py-1 px-2 rounded-md hover:bg-primary-600  text-white ${
            getParams === "30" ? "bg-primary-600" : "bg-none"
          }  font-semibold`}
        >
          Last 30 days
        </button>
        <button
          onClick={() => handleChangeDays("90")}
          className={`py-1 px-2 rounded-md hover:bg-primary-600  text-white ${
            getParams === "90" ? "bg-primary-600" : "bg-none"
          }  font-semibold`}
        >
          Last 90 days
        </button>
      </div>
    </div>
  );
};

export default HomeHeader;
