import Card from "react-bootstrap/Card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../api/constant";
import { API_KEY } from "../../api/constant/urls";
import {
  DangerButton,
  CtaButton,
} from "../../../styles/styled-components/buttons";
import { Modal } from "react-bootstrap";
import { StyledModal } from "../../../styles/styled-components/forms";

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
  const storageUser = JSON.parse(localStorage.getItem("profile"));
  const token = storageUser?.data.accessToken;

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
    <div className="mx-auto my-3">
      {city?.length > 1 ? <h4>{city}</h4> : <h4>City not specified</h4>}
      <p>
        {formattedFromDate} - {formattedToDate}
      </p>
      <Card>
        <Card.Body>
          <img src={image} alt={alt} className="card-img-top userBookingImg" />
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
      <StyledModal show={showDeleteConfirm} onHide={handleCloseDeleteConfirm}>
        <Modal.Header closeButton />
        <Modal.Title>Are you sure you want to delete?</Modal.Title>
        <Modal.Body className="m-auto">
          <DangerButton onClick={handleDelete}>Yes</DangerButton>{" "}
          <CtaButton onClick={handleCloseDeleteConfirm}>No</CtaButton>
        </Modal.Body>
      </StyledModal>
    </div>
  );
}

export { UserBookingsProductCard };
