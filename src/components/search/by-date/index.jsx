import { useEffect, useState } from "react";
import { useFetch } from "../../api/constant";
import { SearchForm } from "../../forms/search/by-date";
import { StyledModal } from "../../../styles/styled-components/forms";
import { Modal } from "react-bootstrap";
import { ProductCard } from "../../product-cards/venues";

function SearchByDate() {
  const { data, isLoading, isError, fetchData } = useFetch(
    "https://v2.api.noroff.dev/holidaze/venues?_bookings=true"
  );
  const [filteredData, setFilteredData] = useState([]);
  const [showSearchByDateResults, setShowSearchByDateResults] = useState(false);

  const handleShow = () => setShowSearchByDateResults(true);
  const handleClose = () => setShowSearchByDateResults(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterAvailability = (venues, startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return venues.filter((venue) => {
      const isAvailable = venue.bookings.every((booking) => {
        const bookingStart = new Date(booking.dateFrom);
        const bookingEnd = new Date(booking.dateTo);

        return bookingEnd <= start || bookingStart >= end;
      });

      return isAvailable;
    });
  };

  const handleSearch = ({ startDate, endDate }) => {
    if (data?.data && startDate && endDate) {
      const availableVenues = filterAvailability(data.data, startDate, endDate);
      setFilteredData(availableVenues);
      handleShow();
      console.log(availableVenues);
    }
  };

  return (
    <div className="searchByDateContainer bg-info m-auto">
      <SearchForm onSearch={handleSearch} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {isError}</p>}
      <StyledModal show={showSearchByDateResults} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Title>Search Results</Modal.Title>
        <Modal.Body>
          {filteredData.length > 0 ? (
            filteredData.map((venue) => (
              <ProductCard
                key={venue.id}
                id={venue.id}
                title={venue.name}
                image={venue.media[0]?.url || null}
                price={venue.price}
                maxGuests={venue.maxGuests}
              />
            ))
          ) : (
            <p>No available venues found for the selected dates.</p>
          )}
        </Modal.Body>
      </StyledModal>
    </div>
  );
}

export { SearchByDate };
