import { useEffect } from "react";
import { useFetch } from "../../components/api/constant";
import { SearchByDate } from "../../components/search/by-date";
import { VenuesProductCard } from "../../components/product-cards/venues";
import { Link } from "react-router-dom";
import { Loader } from "../../components/user-messages/loader";
import Accommodation from "../../assets/icons/accommodation.png";
import Rent from "../../assets/icons/rent.png";
const apiUrl = import.meta.env.VITE_API_URL;

function Home() {
  const { data, isLoading, isError, fetchData } = useFetch(
    `${apiUrl}holidaze/venues?_bookings=true`
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const topVenues = data?.data
    ?.sort((a, b) => b.bookings.length - a.bookings.length)
    .slice(0, 3);

  return (
    <main>
      <section id="hero-image-container">
        <p id="hero-text-1">Your next adventure</p>
        <p id="hero-text-2">starts here..</p>
      </section>
      <section className="optionsContainer d-sm-flex my-4 mx-auto py-3">
        <div className="iconsContainer d-flex align-items-center justify-content-around border border-primary rounded my-3 mx-2 p-2">
          <img
            src={Accommodation}
            alt="Icon of a bed and nightstand with a lamp"
            className="optionsIcons"
          />
          <p className="mx-2">Book accommodations</p>
        </div>
        <div className="iconsContainer d-flex align-items-center justify-content-around border border-primary rounded my-3 mx-2 p-2">
          <img
            src={Rent}
            alt="Icon of building with a rent sign in front"
            className="optionsIcons"
          />
          <p className="mx-2">Rent out and manage your venues</p>
        </div>
      </section>
      <section className="introContainer d-md-flex justify-content-center m-auto">
        <SearchByDate />
        <div className="introText m-auto border-primary border-top border-bottom p-4">
          <h1>Holidaze Booking</h1>
          <h2>Why choose us?</h2>
          <ul>
            <li>
              <span className="fw-bold">Easy Booking:</span> Our seamless
              interface allows you to search, book, and manage your trips with
              just a few clicks.
            </li>
            <li>
              <span className="fw-bold">Host-Friendly:</span> Own a property?
              You can easily register and manage your accommodations for rent
              through our platform.
            </li>
            <li>
              <span className="fw-bold">Customer-Centric:</span> From our
              responsive customer support to our personalized recommendations,
              we are always here to make your holiday planning a breeze.
            </li>
          </ul>
          <p>
            Holidaze is more than just a booking site—it is a community of
            passionate travelers and dedicated hosts. Whether you are planning a
            weekend getaway or a month-long adventure, Holidaze is here to help
            you find the perfect place for your next adventure.
          </p>
          <p>
            But don&apos;t just take our word for it, check out all our exciting
            venues{" "}
            <Link to="/venues" className="fw-bold">
              here
            </Link>
            .
          </p>
        </div>
      </section>
      <div className="destinationImage my-5"></div>
      <section className="w-75 m-auto">
        <h3>Popular destinations right now..</h3>
        <div className="d-lg-flex">
          {isLoading && (
            <div>
              <Loader />
            </div>
          )}
          {isError && <p className="error">{isError}</p>}
          {topVenues && topVenues.length > 0 ? (
            topVenues.map((venue) => (
              <div
                key={venue.id}
                className="popDestinations productCard m-3 rounded col-4"
              >
                <VenuesProductCard
                  key={venue.id}
                  id={venue.id}
                  title={venue.name}
                  image={venue.media[0]?.url || null}
                  price={venue.price}
                  maxGuests={venue.maxGuests}
                />
              </div>
            ))
          ) : (
            <p>No available venues available.</p>
          )}
        </div>
        <h6>
          <Link to="/venues">View all venues</Link>
        </h6>
      </section>
    </main>
  );
}

export { Home };
