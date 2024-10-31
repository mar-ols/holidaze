import { useState } from "react";
import { CtaButton } from "../../../../styles/styled-components/buttons";

/* eslint-disable react/prop-types */

function SearchForm({ onSearch }) {
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ startDate, endDate, location });
  };

  return (
    <form className="p-3 p-md-4 p-lg-5 mb-3" onSubmit={handleSubmit}>
      <label htmlFor="fromDate" className="fw-bold">
        From:
      </label>
      <input
        type="date"
        id="fromDate"
        name="fromDate"
        className="form-control mb-3"
        value={startDate}
        min={today}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label htmlFor="toDate" className="fw-bold">
        To:
      </label>
      <input
        type="date"
        id="toDate"
        name="toDate"
        className="form-control mb-3"
        value={endDate}
        min={startDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <CtaButton type="submit" className="mt-2 w-100">
        Search
      </CtaButton>
    </form>
  );
}

export { SearchForm };
