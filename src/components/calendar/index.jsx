import { useState } from "react";
import Calendar from "react-calendar";
import { CtaButton } from "../../styles/styled-components/buttons";
import "react-calendar/dist/Calendar.css";

/* eslint-disable react/prop-types */

function BookingCalendar({ bookings, maxGuests, venueId, onBookingSubmit }) {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [guestCount, setGuestCount] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const storageUser = JSON.parse(localStorage.getItem("profile"));

  const bookedDates = bookings.flatMap((booking) => {
    const start = new Date(booking.dateFrom);
    const end = new Date(booking.dateTo);
    const dates = [];
    let current = new Date(start);

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  });

  const isDateBooked = (date) => {
    return bookedDates.some(
      (bookedDate) => bookedDate.toDateString() === date.toDateString()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const getLocalDateString = (date) => {
      const localDate = new Date(date);
      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, "0");
      const day = String(localDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const bookingData = {
      dateFrom: getLocalDateString(dateRange[0]),
      dateTo: getLocalDateString(dateRange[1]),
      guests: guestCount,
      venueId: venueId,
    };

    onBookingSubmit(bookingData);
  };

  return (
    <>
      <div className="m-auto d-md-flex justify-content-around mb-4">
        <Calendar
          className="mx-auto m-md-0"
          onChange={setDateRange}
          value={dateRange}
          selectRange={true}
          tileDisabled={({ date }) => isDateBooked(date) || date < new Date()}
        />
        <form onSubmit={handleSubmit} className="mb-4">
          <label htmlFor="bookingName">Name</label>
          <input
            type="text"
            id="bookingName"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="bookingEmail">Email</label>
          <input
            type="email"
            id="bookingEmail"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="guestCount">Guests</label>
          <input
            type="number"
            id="guestCount"
            min="1"
            className="form-control"
            max={maxGuests}
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            required
          />
          {!storageUser ? (
            <CtaButton type="submit" className="mt-3" disabled>
              Book Now
            </CtaButton>
          ) : (
            <CtaButton type="submit" className="mt-3">
              Book Now
            </CtaButton>
          )}
        </form>
      </div>
    </>
  );
}

export { BookingCalendar };
