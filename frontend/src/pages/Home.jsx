import React from "react";
import { Link } from "react-router-dom";
import { FaHardHat, FaRulerCombined, FaCogs, FaUsers } from "react-icons/fa";

export default function Home() {
  return (
    <div className="home-page">

      {/* Hero Section */}
      <section
        className="text-white text-center d-flex align-items-center"
        style={{
          height: "90vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold text-warning">AK Construction</h1>
          <p className="lead fs-4 mb-4">
            Building Dreams with Strength, Precision & Trust
          </p>
          <Link to="/contact" className="btn btn-warning btn-lg m-2 fw-bold">
            Get Estimate
          </Link>
          <Link to="/projects" className="btn btn-outline-light btn-lg m-2 fw-bold">
            View Projects
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="text-warning fw-bold mb-4">Why Choose Us?</h2>
          <div className="row">
            <div className="col-md-3 mb-4">
              <FaHardHat size={50} className="text-warning mb-3" />
              <h5 className="fw-bold">Experienced Engineers</h5>
              <p className="text-muted">
                Years of hands-on experience delivering reliable construction projects.
              </p>
            </div>
            <div className="col-md-3 mb-4">
              <FaRulerCombined size={50} className="text-warning mb-3" />
              <h5 className="fw-bold">Accurate Planning</h5>
              <p className="text-muted">
                Every project starts with detailed estimation and planning.
              </p>
            </div>
            <div className="col-md-3 mb-4">
              <FaCogs size={50} className="text-warning mb-3" />
              <h5 className="fw-bold">Quality Materials</h5>
              <p className="text-muted">
                We use only high-grade materials ensuring long-lasting durability.
              </p>
            </div>
            <div className="col-md-3 mb-4">
              <FaUsers size={50} className="text-warning mb-3" />
              <h5 className="fw-bold">Client Satisfaction</h5>
              <p className="text-muted">
                Your trust and satisfaction are our top priorities in every build.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="text-warning fw-bold mb-4">Our Core Services</h2>
          <div className="row">
            {[
              {
                title: "Building Construction",
                desc: "End-to-end construction with focus on safety and precision.",
                img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
              },
              {
                title: "RCC Structural Design",
                desc: "Modern, efficient, and safe RCC design practices.",
                img: "https://tse3.mm.bing.net/th/id/OIP.jQuBdWfWrGaoWTTVWsmZMQHaFj?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
              },
              {
                title: "Interior & Renovation",
                desc: "Aesthetic and functional designs for homes and offices.",
                img: "https://ckbuildersinc.com/wp-content/uploads/3-interior-home-renovations-holladay.jpeg",
              },
            ].map((service, i) => (
              <div key={i} className="col-md-4 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="fw-bold">{service.title}</h5>
                    <p className="text-muted">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/services" className="btn btn-warning fw-bold mt-3">
            View All Services
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-5 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #1e1e1e, #F97316)",
        }}
      >
        <div className="container">
          <h3 className="fw-bold mb-3">
            Ready to Start Your Construction Project?
          </h3>
          <p className="mb-4">
            Let AK Construction deliver quality and precision on your next project.
          </p>
          <Link to="/contact" className="btn btn-light fw-bold">
            Contact Now
          </Link>
        </div>
      </section>
    </div>
  );
}
