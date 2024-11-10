import { Link } from "react-router-dom";
import { CtaButton } from "../../../styles/styled-components/buttons";
import DefaultImage from "../../../assets/images/default-image.png";

/* eslint-disable react/prop-types */

function VenuesProductCard({ id, title, image, price, maxGuests }) {
  return (
    <div key={id} className="mt-3 mx-2">
      {image ? (
        <Link to={`/${id}`}>
          <img src={image} alt={title} className="productCardImg" />
        </Link>
      ) : (
        <img
          src={DefaultImage}
          alt="Gray default image"
          className="productCardImg"
        />
      )}
      <h4>
        <Link to={`/${id}`}>{title}</Link>
      </h4>
      <p>{price}NOK/night</p>
      <p>Max guests: {maxGuests}</p>
      <Link to={`/${id}`}>
        <CtaButton className="mb-3">View Venue</CtaButton>
      </Link>
    </div>
  );
}

export { VenuesProductCard };
