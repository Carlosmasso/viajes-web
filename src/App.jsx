import { DestinationPage } from "@/pages/DestinationPage";
import { Route, Routes } from 'react-router-dom';
import GlobeMap from './components/GlobeMap';
import { Header } from "./components/Header";
import DayNightGlobe from "./components/DayNightGlobe";

export function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<TravelLanding />} /> */}
      <Route path="/" element={<><Header /><DayNightGlobe /></>} />
      <Route path="/destino/:id" element={<DestinationPage />} />
    </Routes>
  );
}

export default App;