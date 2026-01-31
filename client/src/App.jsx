import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Paste from "./pages/Paste";

function App() {
  return (
    <Router>
      <Routes>
        {/* Create Paste Page */}
        <Route path="/" element={<Home />} />

        {/* View Paste Page */}
        <Route path="/p/:id" element={<Paste />} />

        {/* Fallback */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
