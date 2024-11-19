import { useEffect } from "react";
import { useFetch } from "../../components/api/constant";
import { VenuesProductCard } from "../../components/product-cards/venues";
import { Loader } from "../../components/user-messages/loader";

function Venues() {
  const { data, isLoading, isError, fetchData } = useFetch(
    "https://v2.api.noroff.dev/holidaze/venues?_bookings=true"
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div className="venues-img">
        <h1 className="venuesH1 text-center pt-3">Venues</h1>
      </div>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {isError && <p>Error: {isError}</p>}
      {data && data.data ? (
        <div className="venuesContainer row d-flex flex-wrap justify-content-around m-auto">
          {data.data.map((venue) => (
            <div
              key={venue.id}
              className="venueContainer col-10 col-md-5 productCard m-3 rounded"
            >
              <VenuesProductCard
                className="productCard"
                key={venue.id}
                id={venue.id}
                title={venue.name}
                image={venue.media[0]?.url || null}
                price={venue.price}
                maxGuests={venue.maxGuests}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No venues available</p>
      )}
    </main>
  );
}

export { Venues };
