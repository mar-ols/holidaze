import { useFetch } from "../../components/api/constant";
import { API_KEY } from "../../components/api/constant/urls";
import { useEffect } from "react";
import { UserBookingsProductCard } from "../../components/product-cards/user-bookings";
import DefaultBanner from "../../assets/images/rodion-kutsaiev-tRPguWLUBiY-unsplash.webp";
import DefaultAvatar from "../../assets/images/getty-images-GkcvpZE1w0U-unsplash.webp";

function Profile() {
  const storageProfile = JSON.parse(localStorage.getItem("profile") || "null");
  const token = storageProfile?.data.accessToken;

  const { data, isLoading, isError, fetchData } = useFetch(
    `https://v2.api.noroff.dev/holidaze/profiles/${storageProfile.data.name}/bookings?_venue=true`,
    "GET",
    null,
    token,
    API_KEY
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshBookings = () => {
    fetchData();
  };

  console.log(data);

  const bannerImg = storageProfile?.data?.banner?.url || DefaultBanner;
  const bannerAlt = storageProfile?.data?.banner?.alt || "Default banner";
  const avatarImg = storageProfile?.data?.avatar?.url || DefaultAvatar;
  const avatarAlt = storageProfile?.data?.avatar?.alt || "Default avatar";

  return (
    <main>
      <div className="banner-container">
        <img src={bannerImg} alt={bannerAlt} className="bannerImg w-100" />
        <div className="avatarContainer text-center">
          <img src={avatarImg} alt={avatarAlt} className="userAvatar" />
        </div>
      </div>
      <h1 className="text-center">{storageProfile.data.name}</h1>
      <div>
        {isLoading && <p>Loading bookings</p>}
        {isError && <p>Error: {isError}</p>}
        <h3 className="text-center my-4">Your bookings</h3>
        {data && data.data && data.data > 0 ? (
          <div className="row">
            {data.data.map((booking) => (
              <UserBookingsProductCard
                className="card col-2"
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
    </main>
  );
}

export { Profile };
