import Card from "react-bootstrap/Card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../api/constant";
import { API_KEY } from "../../api/constant/urls";
import { DangerButton } from "../../../styles/styled-components/buttons";
import { DeleteConfirmationModal } from "../../user-messages/remove-confirmation";

/* eslint-disable react/prop-types */

function UserBookingsProductCard({
  bookingID,
  id,
  city,
  fromDate,
  toDate,
  image,
  alt,
  title,
  guests,
  price,
  refreshBookings,
}) {
  const token = JSON.parse(localStorage.getItem("token") || "null");

  const { fetchData, isError } = useFetch(
    `https://v2.api.noroff.dev/holidaze/bookings/${bookingID}`,
    "DELETE",
    null,
    token,
    API_KEY
  );

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);
  const handleShowDeleteConfirm = () => setShowDeleteConfirm(true);

  const handleDelete = async () => {
    await fetchData();
    if (!isError) {
      setShowDeleteConfirm(false);
      refreshBookings();
    }
  };

  const apiFromDate = new Date(fromDate);
  const apiToDate = new Date(toDate);

  const formattedFromDate = apiFromDate.toLocaleDateString("en-GB");
  const formattedToDate = apiToDate.toLocaleDateString("en-GB");

  return (
    <div className="mx-auto my-3 col-10 col-md-6 col-lg-4">
      {city?.length > 1 ? <h4>{city}</h4> : <h4>City not specified</h4>}
      <p>
        {formattedFromDate} - {formattedToDate}
      </p>
      <Card className="productCard">
        <Card.Body>
          <Link to={`/${id}`}>
            <img
              src={image}
              alt={alt}
              className="card-img-top userBookingImg"
            />
          </Link>
          <div className="d-flex flex-column justify-content-between">
            <div>
              <p className="fw-bold">
                {title} <span className="ms-3">${price}/night</span>
              </p>
              <p>No. of guests: {guests}</p>
              <p>
                <Link to={`/${id}`}>View venue</Link>
              </p>
            </div>
            <DangerButton onClick={handleShowDeleteConfirm}>
              Delete booking
            </DangerButton>
          </div>
        </Card.Body>
      </Card>
      <DeleteConfirmationModal
        showDeleteConfirm={showDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export { UserBookingsProductCard };
