import React from "react";
import {
  FaBuilding,
  FaRulerCombined,
  FaDraftingCompass,
  FaTools,
  FaCouch,
  FaClipboardCheck,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    {
      icon: <FaBuilding size={45} className="text-warning mb-3" />,
      title: "Building Construction",
      desc: "End-to-end construction services for residential, commercial, and industrial buildings — handled with precision and quality materials.",
      img: "https://images.unsplash.com/photo-1590650046871-92c887180603",
    },
    {
      icon: <FaRulerCombined size={45} className="text-warning mb-3" />,
      title: "RCC Structural Design",
      desc: "Safe, efficient, and cost-effective structural designs following IS codes and modern engineering practices.",
      img: "https://portfolio.cept.ac.in/assets/projects/visuals/2017/5020/visual_20171208193216_slide1.jpg",
    },
    {
      icon: <FaDraftingCompass size={45} className="text-warning mb-3" />,
      title: "Estimation & Planning",
      desc: "Accurate estimation, 2D/3D planning, and scheduling ensuring no delays and clear cost visibility for clients.",
      img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    },
    {
      icon: <FaClipboardCheck size={45} className="text-warning mb-3" />,
      title: "Supervision",
      desc: "Professional on-site supervision and project monitoring to maintain safety and quality at every stage.",
      img: "https://www.stonehaven.ae/sherpa/images/insight5-slide2.jpg",
    },
    {
      icon: <FaCouch size={45} className="text-warning mb-3" />,
      title: "Interior & Renovation",
      desc: "Stylish and functional interiors, modular kitchens, and space renovation designed to fit your lifestyle.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      icon: <FaTools size={45} className="text-warning mb-3" />,
      title: "Repair & Maintenance",
      desc: "Affordable repair and maintenance solutions to preserve your building’s beauty and safety.",
      img: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
    },
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section
        className="text-white text-center d-flex align-items-center"
        style={{
          height: "50vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <h1 className="fw-bold text-warning">Our Services</h1>
          <p className="lead mt-2">
            End-to-End Civil Engineering Solutions You Can Trust
          </p>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="container py-5">
        <div className="row text-center">
          {services.map((s, i) => (
            <div key={i} className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm hover-shadow">
                <img
                  src={s.img}
                  alt={s.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  {s.icon}
                  <h5 className="fw-bold text-dark">{s.title}</h5>
                  <p className="text-muted">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How We Work Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-warning fw-bold text-center mb-4">How We Work</h2>
          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <div className="p-3 border rounded shadow-sm h-100">
                <h5 className="fw-bold">1. Consultation</h5>
                <p className="text-muted small">
                  We understand your requirements and budget expectations.
                </p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="p-3 border rounded shadow-sm h-100">
                <h5 className="fw-bold">2. Planning & Design</h5>
                <p className="text-muted small">
                  Detailed estimation, design layout, and project timeline.
                </p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="p-3 border rounded shadow-sm h-100">
                <h5 className="fw-bold">3. Execution</h5>
                <p className="text-muted small">
                  Our experts ensure quality construction with constant supervision.
                </p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="p-3 border rounded shadow-sm h-100">
                <h5 className="fw-bold">4. Handover</h5>
                <p className="text-muted small">
                  Final inspection and timely delivery with satisfaction guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg, #1e1e1e, #F97316)",
        }}
      >
        <div className="container">
          <h3 className="fw-bold mb-3">Need Construction or Renovation Help?</h3>
          <p className="mb-4">
            Talk to our experts today and get a detailed estimate for your project.
          </p>
          <Link to="/contact" className="btn btn-light fw-bold">
            Get a Free Estimate
          </Link>
        </div>
      </section>
    </div>
  );
}
