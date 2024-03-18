import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { formatCurrency } from "../../ui/formatCurrency";
import { Blurhash } from "react-blurhash";
import { useNavigate } from "react-router-dom";

export default function ProfileBookingImages({
  booking,
}: {
  booking: Models.Document;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoaded(true);
    };
    image.src = booking.cabin.imageUrl;
  }, [booking?.cabin?.imageUrl]);

  return (
    <div key={booking.cabin.$id} className="relative">
      {!imageLoaded && (
        <Blurhash
          hash={booking?.cabin?.hush}
          width={"100%"}
          height={180}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
      {imageLoaded && (
        <>
          <img
            className="w-full rounded-md bg-cover cursor-pointer"
            alt="NextUI hero Image"
            src={booking.cabin.imageUrl}
            onClick={() => navigate(`/booking/details/${booking.$id}`)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-1">
            <h2 className="text-xs font-bold">Cabin #{booking.cabin.name}</h2>
            <p className="text-xs">
              Price: {formatCurrency(booking.cabinPrice)} per night
            </p>
          </div>
        </>
      )}
    </div>
  );
}
