import "./styles/App.css";
import { useFetch } from "./components/api/constant";

function App() {
  const {
    data: venues,
    isLoading,
    isError,
  } = useFetch("https://v2.api.noroff.dev/holidaze/venues");

  if (isLoading) return <div>Loading venues...</div>;
  if (isError) return <div>Error: {isError}</div>;

  console.log(venues);

  return (
    <>
      <h1>Vite + React</h1>
      {venues && venues.data ? (
        <ul>
          {venues.data.map((venue) => (
            <li key={venue.id}>{venue.name}</li>
          ))}
        </ul>
      ) : (
        <p>No venues available</p>
      )}
    </>
  );
}

export default App;
