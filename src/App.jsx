import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Venues } from "./pages/venue";
import { Venue } from "./pages/venues";
import { Profile } from "./pages/profile";
import { About } from "./pages/about";
import "./styles/App.css";
// import { useFetch } from "./components/api/constant";

function App() {
  // const {
  //   data: venues,
  //   isLoading,
  //   isError,
  // } = useFetch("https://v2.api.noroff.dev/holidaze/venues");

  // if (isLoading) return <div>Loading venues...</div>;
  // if (isError) return <div>Error: {isError}</div>;

  // console.log(venues);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path=":id" element={<Venue />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div>Route not found</div>} />
        </Route>
      </Routes>
      {/* <h1>Vite + React</h1>
      {venues && venues.data ? (
        <ul>
          {venues.data.map((venue) => (
            <li key={venue.id}>{venue.name}</li>
          ))}
        </ul>
      ) : (
        <p>No venues available</p>
      )} */}
    </>
  );
}

export default App;
