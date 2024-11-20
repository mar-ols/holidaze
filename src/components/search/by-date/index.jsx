import { useEffect, useState } from "react";
import { useFetch } from "../../api/constant";
import { SearchForm } from "../../forms/search/by-date";
import { StyledModal } from "../../../styles/styled-components/forms";
import { Modal } from "react-bootstrap";
import { VenuesProductCard } from "../../product-cards/venues";
import { Loader } from "../../user-messages/loader";
const apiUrl = import.meta.env.VITE_API_URL;

function SearchByDate() {
  const { data, isLoading, isError, fetchData } = useFetch(
    `${apiUrl}holidaze/venues?_bookings=true`
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
    }
  };

  return (
    <div className="searchByDateContainer bg-info m-auto">
      <SearchForm onSearch={handleSearch} />
      {isError && <p className="error">{isError}</p>}
      <StyledModal show={showSearchByDateResults} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Title>Search Results</Modal.Title>
        <Modal.Body>
          {isLoading && (
            <div>
              <Loader />
            </div>
          )}
          {filteredData.length > 0 ? (
            filteredData.map((venue) => (
              <VenuesProductCard
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
