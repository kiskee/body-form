import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Home from "./pages/Home";
import Layaut from "./components/Layaut";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Layaut>
        <SpeedInsights />
        <Routes>
          {/* Ruta pública */}
          <Route path="/" element={<Home />} />
          
          {/* Rutas protegidas */}
          <Route path="/page1" element={<ProtectedRoute element={<Page1 />} />} />
          <Route path="/page2" element={<ProtectedRoute element={<Page2 />} />} />
        </Routes>
      </Layaut>
    </Router>
  );
}
