import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AdminDashboard from "./admin/AdminDashboard";
import ProjectDetails from "./pages/ProjectDetails";



function App() {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
  <Route path="/projects/:id" element={<ProjectDetails />} /> {/* ✅ */}
        <Route path="/contact" element={<Contact />} />
       <Route path="/admin" element={<AdminDashboard />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
