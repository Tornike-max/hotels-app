export default function ProfileContent() {
  return (
    <div className="w-full flex justify-center items-center flex-col py-8 px-10 mx-10 my-2 rounded-sm border-[1px] border-gray-700">
      <div className="w-full flex justify-center items-center">
        <h1 className="text-xl font-semibold text-white pb-4">
          Bookings History
        </h1>
      </div>
      <div className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        <div className="relative">
          <img
            className="w-full rounded-md"
            alt="NextUI hero Image"
            src="hotel1.jpg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-1">
            <h2 className="text-xs font-bold">Hotel Name</h2>
            <p className="text-xs">Price: $100 per night</p>
          </div>
        </div>
        <div className="relative">
          <img
            className="w-full rounded-md"
            alt="NextUI hero Image"
            src="hotel1.jpg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-1">
            <h2 className="text-xs font-bold">Hotel Name</h2>
            <p className="text-xs">Price: $100 per night</p>
          </div>
        </div>
        <div className="relative">
          <img
            className="w-full rounded-md"
            alt="NextUI hero Image"
            src="hotel1.jpg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-1">
            <h2 className="text-xs font-bold">Hotel Name</h2>
            <p className="text-xs">Price: $100 per night</p>
          </div>
        </div>
        <div className="relative">
          <img
            className="w-full rounded-md"
            alt="NextUI hero Image"
            src="hotel1.jpg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-1">
            <h2 className="text-xs font-bold">Hotel Name</h2>
            <p className="text-xs">Price: $100 per night</p>
          </div>
        </div>
      </div>
    </div>
  );
}
