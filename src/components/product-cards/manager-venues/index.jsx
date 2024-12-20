import { useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useFetch } from "../../api/constant";
import { DangerButton } from "../../../styles/styled-components/buttons";
import { DeleteConfirmationModal } from "../../user-messages/remove-confirmation";
import { Modal } from "react-bootstrap";
import { StyledModal } from "../../../styles/styled-components/forms";
import { UpdateVenue } from "../../forms/profile/venue-manager/update";
import { VenueBookingsProductCard } from "../venue-bookings";
const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

/* eslint-disable react/prop-types */

function ManagerVenuesProductCard({ id, image, alt, title, refreshVenues }) {
  const token = JSON.parse(localStorage.getItem("token") || "null");

  const { fetchData, isError } = useFetch(
    `${apiUrl}holidaze/venues/${id}`,
    "DELETE",
    null,
    token,
    apiKey
  );

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);
  const handleShowDeleteConfirm = () => setShowDeleteConfirm(true);

  const handleDeleteVenue = async () => {
    await fetchData();
    if (!isError) {
      setShowDeleteConfirm(false);
      refreshVenues();
    }
  };

  const [showUpdateVenue, setShowUpdateVenue] = useState(false);
  const handleCloseUpdateVenue = () => setShowUpdateVenue(false);
  const handleShowUpdateVenue = () => setShowUpdateVenue(true);

  const handleUpdateVenueSuccess = () => {
    handleCloseUpdateVenue();
  };

  const [showVenueBookings, setShowVenueBookings] = useState(false);
  const handleCloseVenueBookings = () => setShowVenueBookings(false);
  const handleShowVenueBookings = () => setShowVenueBookings(true);

  return (
    <div className="mx-auto my-3 col-10 col-md-6 col-lg-4">
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
              <p className="fw-bold">{title}</p>
              <p>
                <Link to={`/${id}`}>View venue</Link>
              </p>
              <p>
                <span
                  className="text-decoration-underline"
                  role="button"
                  onClick={handleShowUpdateVenue}
                >
                  Update venue
                </span>
              </p>
              <p>
                <span
                  className="text-decoration-underline"
                  role="button"
                  onClick={handleShowVenueBookings}
                >
                  View bookings for venue
                </span>
              </p>
            </div>
            <DangerButton onClick={handleShowDeleteConfirm}>
              Delete venue
            </DangerButton>
          </div>
        </Card.Body>
      </Card>
      <DeleteConfirmationModal
        showDeleteConfirm={showDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleDeleteVenue}
      />
      <StyledModal show={showUpdateVenue} onHide={handleCloseUpdateVenue}>
        <Modal.Header closeButton />
        <Modal.Title>Update venue</Modal.Title>
        <Modal.Body className="m-auto">
          <UpdateVenue
            onSuccess={handleUpdateVenueSuccess}
            refreshVenues={refreshVenues}
            id={id}
          />
        </Modal.Body>
      </StyledModal>
      <StyledModal show={showVenueBookings} onHide={handleCloseVenueBookings}>
        <Modal.Header closeButton />
        <Modal.Title>Venue bookings</Modal.Title>
        <Modal.Body className="m-auto">
          <VenueBookingsProductCard venueId={id} />
        </Modal.Body>
      </StyledModal>
    </div>
  );
}

export { ManagerVenuesProductCard };
