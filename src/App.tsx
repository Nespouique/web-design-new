import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Liste from "./pages/Liste";
import Fiche from "./pages/Fiche";
import Battle from "./pages/Battle";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/liste" element={<Liste />} />
      <Route path="/fiche/:id" element={<Fiche />} />
      <Route path="/battle" element={<Battle />} />
      <Route path="/about" element={<About />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </Layout>
);

export default App;
