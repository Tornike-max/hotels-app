import CabinsContent from "../components/cabins/CabinsContent";
import CabinsHeader from "../components/cabins/CabinsHeader";

const CabinsPage = () => {
  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col gap-2 pb-10">
      <CabinsHeader />
      <CabinsContent />
    </div>
  );
};

export default CabinsPage;
