import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Venue } from "./pages/venue";
import { Venues } from "./pages/venues";
import { Profile } from "./pages/profile";
import { About } from "./pages/about";
import "./styles/App.css";

function App() {
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
    </>
  );
}

export default App;
