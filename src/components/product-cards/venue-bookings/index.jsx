import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import { useFetch } from "../../api/constant";
import { API_KEY } from "../../api/constant/urls";
import { Loader } from "../../user-messages/loader";

/* eslint-disable react/prop-types */

function VenueBookingsProductCard({ venueId }) {
  const token = JSON.parse(localStorage.getItem("token") || "null");

  const {
    data,
    isLoading,
    isError,
    fetchData: venueBookings,
  } = useFetch(
    `https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true`,
    "GET",
    null,
    token,
    API_KEY
  );

  useEffect(() => {
    venueBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {isError && <p className="error">{isError}</p>}
      {data &&
      data.data &&
      data.data.bookings &&
      data.data.bookings.length > 0 ? (
        <div className="row m-0">
          {data.data.bookings.map((venueBooking) => {
            const fromDate = new Date(venueBooking.dateFrom);
            const toDate = new Date(venueBooking.dateTo);

            const formattedFromDate = fromDate.toLocaleDateString("en-GB");
            const formattedToDate = toDate.toLocaleDateString("en-GB");

            const timeDifference = toDate - fromDate;
            const nights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

            return (
              <div key={venueBooking.id} className="mx-auto my-3">
                <Card className="productCard">
                  <Card.Body>
                    <p className="fw-bold text-decoration-underline">
                      {venueBooking.customer.name}
                    </p>
                    <p>
                      {formattedFromDate} - {formattedToDate} ({nights}{" "}
                      {nights === 1 ? "night" : "nights"})
                    </p>
                    <p>No. of guests: {venueBooking.guests}</p>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center">No bookings for this venue</p>
      )}
    </div>
  );
}

export { VenueBookingsProductCard };
