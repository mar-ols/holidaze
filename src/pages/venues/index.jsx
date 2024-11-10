import { useEffect } from "react";
import { useFetch } from "../../components/api/constant";
import { ProductCard } from "../../components/product-cards/venues";

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
      {isLoading && <p>Loading venues...</p>}
      {isError && <p>Error: {isError}</p>}
      {data && data.data ? (
        <div className="venuesContainer d-flex flex-wrap justify-content-around m-auto">
          {data.data.map((venue) => (
            <div
              key={venue.id}
              className="venueContainer productCard m-3 rounded"
            >
              <ProductCard
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
