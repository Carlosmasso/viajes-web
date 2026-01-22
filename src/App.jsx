import { DestinationPage } from "@/pages/DestinationPage";
import { Route, Routes } from 'react-router-dom';
import GlobeMap from './components/GlobeMap';
import { Header } from "./components/Header";

export function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<TravelLanding />} /> */}
      <Route path="/" element={<><Header /><GlobeMap /></>} />
      <Route path="/destino/:id" element={<DestinationPage />} />
    </Routes>
  );
}

export default App;