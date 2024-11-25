import { useEffect, useState } from "react";
import { useFetch } from "../../components/api/constant";
import { VenuesProductCard } from "../../components/product-cards/venues";
import { Loader } from "../../components/user-messages/loader";
import { ThemedButton } from "../../styles/styled-components/buttons";
const apiUrl = import.meta.env.VITE_API_URL;

function Venues() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data, isLoading, isError, fetchData } = useFetch(
    `${apiUrl}holidaze/venues?_bookings=true`
  );

  useEffect(() => {
    document.title = "Holidaze - Venues";
  }, []);

  useEffect(() => {
    fetchData(null, "GET", { limit: 100, page: currentPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (data?.meta) {
      setTotalPages(data.meta.pageCount);
    }
  }, [data]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <main>
      <div className="venues-img background-image-position background-image-size-450 background-image-position-x-right">
        <h1 className="venuesH1 text-center pt-3">Venues</h1>
      </div>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {isError && <p className="error">{isError}</p>}
      {data && data.data ? (
        <>
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
          <div className="text-center mt-4">
            <ThemedButton
              className="btn btn-primary m-2"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </ThemedButton>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <ThemedButton
              className="btn btn-primary m-2"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </ThemedButton>
          </div>
        </>
      ) : (
        <p>No venues available</p>
      )}
    </main>
  );
}

export { Venues };
