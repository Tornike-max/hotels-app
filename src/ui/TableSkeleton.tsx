const TableSkeleton = () => {
  return (
    <div className="max-w-5xl w-full h-screen flex items-center gap-3 px-4">
      <div className="w-full animate-pulse h-full flex flex-col gap-2 ">
        <div className="h-10 sm:h-14 md:h-20 w-full rounded-lg bg-slate-700" />
        <div className="h-10 sm:h-14 md:h-20 w-full rounded-lg bg-slate-700" />
        <div className="h-10 sm:h-14 md:h-20 w-full rounded-lg bg-slate-700" />
        <div className="h-10 sm:h-14 md:h-20 w-full rounded-lg bg-slate-700" />
        <div className="h-10 sm:h-14 md:h-20 w-full rounded-lg bg-slate-700" />
        <div className="h-10 sm:h-14 md:h-20 w-full rounded-lg bg-slate-700" />
        <div className="h-10 sm:h-14 md:h-20 w-full rounded-lg bg-slate-700" />
        <div className="h-10 sm:h-14 md:h-20 w-full rounded-lg bg-slate-700" />
      </div>
    </div>
  );
};

export default TableSkeleton;
