import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CropRecommendation from "./pages/CropRecommendation";
import DiseaseDetection from "./pages/DiseaseDetection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crop-recommendation" element={<CropRecommendation />} />
      <Route path="/disease-detection" element={<DiseaseDetection />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;