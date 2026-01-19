import { Routes, Route } from 'react-router-dom';
import { TravelLanding } from "@/components/TravelLanding";
import { DestinationPage } from "@/pages/DestinationPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<TravelLanding />} />
      <Route path="/destino/:id" element={<DestinationPage />} />
    </Routes>
  );
}

export default App;