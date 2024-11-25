import { useState, useEffect } from "react";
import { StyledModal } from "../../../styles/styled-components/forms";
import { Modal } from "react-bootstrap";
import { CreateVenue } from "../../forms/profile/venue-manager/create";
import { useFetch } from "../../api/constant";
import { ManagerVenuesProductCard } from "../../product-cards/manager-venues";
import { Loader } from "../../user-messages/loader";
const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

function ManagerSection() {
  const localStorageProfile = JSON.parse(
    localStorage.getItem("profile") || "null"
  );
  const manager = localStorageProfile.data.name;
  const token = JSON.parse(localStorage.getItem("token") || "null");

  const {
    data: venueManagerData,
    fetchData: managerVenues,
    isLoading,
    isError,
  } = useFetch(
    `${apiUrl}holidaze/profiles/${manager}/venues?_bookings=true`,
    "GET",
    null,
    token,
    apiKey
  );

  useEffect(() => {
    managerVenues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showCreateVenue, setShowCreateVenue] = useState(false);
  const handleCloseCreateVenue = () => setShowCreateVenue(false);
  const handleShowCreateVenue = () => setShowCreateVenue(true);

  const handleCreateVenueSuccess = () => {
    handleCloseCreateVenue();
  };

  const refreshVenues = () => {
    managerVenues();
  };

  return (
    <div>
      <div className=" border-primary border-top my-5 w-75 mx-auto"></div>
      <h3 className="text-center">Your venues</h3>
      <h6 className="text-center">
        <span role="button" onClick={handleShowCreateVenue}>
          +Create venue
        </span>
      </h6>
      <StyledModal show={showCreateVenue} onHide={handleCloseCreateVenue}>
        <Modal.Header closeButton />
        <Modal.Title>Create venue</Modal.Title>
        <Modal.Body className="m-auto">
          <CreateVenue
            onSuccess={handleCreateVenueSuccess}
            refreshVenues={refreshVenues}
          />
        </Modal.Body>
      </StyledModal>
      <div className="px-md-3">
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
        {isError && <p className="error">{isError}</p>}
        {venueManagerData && venueManagerData.data ? (
          <div className="row m-0">
            {venueManagerData.data.map((venue) => (
              <ManagerVenuesProductCard
                key={venue.id}
                id={venue.id}
                image={venue.media[0].url}
                alt={venue.media[0].alt}
                title={venue.name}
                refreshVenues={refreshVenues}
              />
            ))}
          </div>
        ) : (
          <p>No venues created</p>
        )}
      </div>
    </div>
  );
}

export { ManagerSection };
