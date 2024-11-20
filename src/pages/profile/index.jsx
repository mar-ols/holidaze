import { useFetch } from "../../components/api/constant";
import { useState, useEffect } from "react";
import { UserBookingsProductCard } from "../../components/product-cards/user-bookings";
import { StyledModal } from "../../styles/styled-components/forms";
import { Modal } from "react-bootstrap";
import { EditProfileForm } from "../../components/forms/profile/edit";
import { ManagerSection } from "../../components/profile/manager-section";
import { Loader } from "../../components/user-messages/loader";
import DefaultBanner from "../../assets/images/rodion-kutsaiev-tRPguWLUBiY-unsplash.webp";
import DefaultAvatar from "../../assets/images/getty-images-GkcvpZE1w0U-unsplash.webp";
const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

function Profile() {
  const storageProfile = JSON.parse(localStorage.getItem("profile") || "null");
  const token = JSON.parse(localStorage.getItem("token") || "null");

  const { data, isLoading, isError, fetchData } = useFetch(
    `${apiUrl}holidaze/profiles/${storageProfile.data.name}/bookings?_venue=true`,
    "GET",
    null,
    token,
    apiKey
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshBookings = () => {
    fetchData();
  };

  const bannerImg = storageProfile?.data?.banner?.url || DefaultBanner;
  const bannerAlt = storageProfile?.data?.banner?.alt || "Default banner";
  const avatarImg = storageProfile?.data?.avatar?.url || DefaultAvatar;
  const avatarAlt = storageProfile?.data?.avatar?.alt || "Default avatar";
  const venueManager = storageProfile?.data.venueManager;

  const [showEditProfile, setShowEditProfile] = useState(false);
  const handleCloseEditProfile = () => setShowEditProfile(false);
  const handleShowEditProfile = () => setShowEditProfile(true);

  const handleEditSuccess = () => {
    handleCloseEditProfile();
  };

  return (
    <main>
      <div className="banner-container">
        <img src={bannerImg} alt={bannerAlt} className="bannerImg w-100" />
        <div className="avatarContainer text-center">
          <img src={avatarImg} alt={avatarAlt} className="userAvatar" />
        </div>
      </div>
      <h1 className="text-center py-4">{storageProfile.data.name}</h1>
      <div className="productCard border rounded col-11 col-md-8 col-lg-4 m-auto p-2">
        <p>
          <span className="fw-bold">Venue manager?</span>{" "}
          {venueManager === false ? <span>No</span> : <span>Yes</span>}
        </p>
        <p>
          <span className="fw-bold">Bio:</span> {storageProfile.data.bio}
        </p>
        <p className="text-center">
          <span
            role="button"
            className="text-decoration-underline"
            onClick={handleShowEditProfile}
          >
            Edit profile
          </span>
        </p>
      </div>
      <StyledModal show={showEditProfile} onHide={handleCloseEditProfile}>
        <Modal.Header closeButton />
        <Modal.Title>Edit profile</Modal.Title>
        <Modal.Body className="m-auto">
          <EditProfileForm
            name={storageProfile?.data?.name}
            onSuccess={handleEditSuccess}
          />
        </Modal.Body>
      </StyledModal>
      <div>
        <h3 className="text-center pt-5 my-4">Your bookings</h3>
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
        {isError && <p className="error">{isError}</p>}
        {data && data.data && data.data.length > 0 ? (
          <div className="row m-0">
            {data.data.map((booking) => (
              <UserBookingsProductCard
                key={booking.id}
                bookingID={booking.id}
                id={booking.venue.id}
                city={booking.venue.location.city}
                fromDate={booking.dateFrom}
                toDate={booking.dateTo}
                title={booking.venue.name}
                image={booking.venue.media[0]?.url}
                alt={booking.venue.media[0]?.alt}
                guests={booking.guests}
                price={booking.venue.price}
                refreshBookings={refreshBookings}
              />
            ))}
          </div>
        ) : (
          <p className="text-center">No bookings made</p>
        )}
      </div>
      {venueManager === true ? <ManagerSection /> : ""}
    </main>
  );
}

export { Profile };
