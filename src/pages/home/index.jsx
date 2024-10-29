import { useEffect } from "react";
import { useFetch } from "../../components/api/constant";
import { Link } from "react-router-dom";

function Home() {
  const { data, isLoading, isError, fetchData } = useFetch(
    "https://v2.api.noroff.dev/holidaze/venues"
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(data);

  if (isLoading) return <div>Loading venues...</div>;
  if (isError) return <div>Error: {isError}</div>;

  return (
    <>
      <main>
        <section id="hero-image-container" className="text-primary">
          <p id="hero-text-1">Your next adventure</p>
          <p id="hero-text-2">starts here..</p>
        </section>
        <h1>Front page</h1>
        {data && data.data ? (
          <div>
            {data.data.map((venue) => (
              <Link key={venue.id} to={venue.id}>
                {venue.name}
              </Link>
            ))}
          </div>
        ) : (
          <p>No venues available</p>
        )}
      </main>
    </>
  );
}

export { Home };
