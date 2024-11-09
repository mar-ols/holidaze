import { useEffect, useState } from "react";
import { useFetch } from "../../components/api/constant";
import { useParams } from "react-router-dom";
import { BookingCalendar } from "../../components/calendar";
import { API_KEY } from "../../components/api/constant/urls";
import DefaultImage from "../../assets/images/default-image.png";
import Star from "../../assets/icons/star-filled.png";
import BreakfastIcon from "../../assets/icons/breakfast.png";
import NoBreakfastIcon from "../../assets/icons/no-breakfast.png";
import ParkingIcon from "../../assets/icons/parking.png";
import NoParkingIcon from "../../assets/icons/no-parking.png";
import WifiIcon from "../../assets/icons/wifi.png";
import NoWifiIcon from "../../assets/icons/no-wifi.png";
import PetsIcon from "../../assets/icons/pets.png";
import NoPetsIcon from "../../assets/icons/no-pets.png";

function Venue() {
  const { id } = useParams();
  const [bookingMessage, setBookingMessage] = useState("");
  const storageUser = JSON.parse(localStorage.getItem("profile"));
  const token = storageUser?.data.accessToken;

  const { data, isLoading, isError, fetchData } = useFetch(
    `https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`
  );

  const { fetchData: makeBooking } = useFetch(
    "https://v2.api.noroff.dev/holidaze/bookings",
    "POST",
    null,
    token,
    API_KEY
  );

  const handleBooking = async (bookingDetails) => {
    setBookingMessage("");

    try {
      await makeBooking(bookingDetails);
      setBookingMessage("Booking successful!");
    } catch (error) {
      setBookingMessage(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const city = data?.data?.location?.city?.trim()
    ? data.data.location.city
    : "City not specified";
  const country = data?.data?.location?.country?.trim()
    ? data.data.location.country
    : "Country not specified";
  const image = data?.data?.media[0].url;
  const rating = data?.data?.rating;
  const breakfast = data?.data?.meta.breakfast;
  const parking = data?.data?.meta.parking;
  const wifi = data?.data?.meta.wifi;
  const pets = data?.data?.meta.pets;
  const bookings = data?.data?.bookings || [];
  const stars = Array.from({ length: rating });

  return (
    <main className="venuesContainer mx-auto my-3 px-3">
      {isLoading && <p>Loading venue...</p>}
      {isError && <p>Error: {isError}</p>}

      {data && data.data ? (
        <>
          <h1 className="mt-5">{data.data.name}</h1>
          <p className="m-0">
            {city}, {country}
          </p>
          <div className="mb-2">
            {stars.map((_, index) => (
              <img key={index} src={Star} alt="Star icon" />
            ))}
          </div>
          {image ? (
            <img src={image} alt={data.data.name} className="productCardImg" />
          ) : (
            <img
              src={DefaultImage}
              alt="Gray default image"
              className="productCardImg"
            />
          )}
          <div className="facilitiesContainer">
            <div className="facilities">
              {parking === true ? (
                <div className="d-flex align-items-center justify-content-center m-3 p-2">
                  <img
                    src={ParkingIcon}
                    alt="Parking icon"
                    className="facilitiesIcon me-3"
                  />{" "}
                  <span>Parking</span>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center m-3 p-2">
                  <img
                    src={NoParkingIcon}
                    alt="No parking icon"
                    className="facilitiesIcon me-3"
                  />{" "}
                  <span>No on-site parking</span>
                </div>
              )}
              {wifi === true ? (
                <div className="d-flex align-items-center justify-content-center m-3 p-2">
                  <img
                    src={WifiIcon}
                    alt="Wifi icon"
                    className="facilitiesIcon me-3"
                  />{" "}
                  <span>Wifi</span>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center m-3 p-2">
                  <img
                    src={NoWifiIcon}
                    alt="Wifi icon"
                    className="facilitiesIcon me-3"
                  />{" "}
                  <span> No wifi</span>
                </div>
              )}
            </div>
            <div className="facilities">
              {breakfast === true ? (
                <div className="d-flex align-items-center justify-content-center m-3 p-2">
                  <img
                    src={BreakfastIcon}
                    alt="Breakfast icon"
                    className="facilitiesIcon me-3"
                  />{" "}
                  <span>Breakfast</span>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center m-3 p-2">
                  <img
                    src={NoBreakfastIcon}
                    alt="Breakfast icon"
                    className="facilitiesIcon me-3"
                  />{" "}
                  <span>No breakfast</span>
                </div>
              )}
              {pets === true ? (
                <div className="d-flex align-items-center justify-content-center m-3 p-2">
                  <img
                    src={PetsIcon}
                    alt="Pets icon"
                    className="facilitiesIcon me-3"
                  />{" "}
                  <span>Pet-friendly</span>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center m-3 p-2">
                  <img
                    src={NoPetsIcon}
                    alt="Pets icon"
                    className="facilitiesIcon me-3"
                  />{" "}
                  <span>No pets</span>
                </div>
              )}
            </div>
          </div>
          <div className="pb-2">
            <p className="fw-bold">${data?.data?.price}/night</p>
            <p className="fw-bold">Max. guests: {data?.data?.maxGuests}</p>
            <p>{data?.data?.description}</p>
          </div>
          <div className=" border-primary border-top my-5"></div>
          <div>
            <p className="fw-bold text-center">Book this venue</p>
            <BookingCalendar
              bookings={bookings}
              maxGuests={data?.data?.maxGuests}
              venueId={id}
              onBookingSubmit={handleBooking}
            />
            {bookingMessage && <p className="text-center">{bookingMessage}</p>}
          </div>
        </>
      ) : (
        !isLoading && !isError && <p>Venue data could not be loaded</p>
      )}
    </main>
  );
}

export { Venue };
