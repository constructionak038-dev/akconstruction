import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");

  // Initialize animations
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // Fetch projects from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data))
      .catch(() => console.log("Error fetching projects"));
  }, []);

  // Filter logic
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category?.toLowerCase() === filter.toLowerCase());

  return (
    <div className="projects-page">
      {/* Header */}
      <section
        className="text-white text-center d-flex align-items-center"
        style={{
          height: "50vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1581092334554-18d4a4e7f9e2')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <h1 className="fw-bold text-warning">Our Projects</h1>
          <p className="lead mt-2">Showcasing the Work That Builds Our Reputation</p>
        </div>
      </section>

      {/* Filters */}
      <div className="container py-4 text-center">
        <div className="btn-group">
          {["All", "Completed", "Ongoing"].map((cat) => (
            <button
              key={cat}
              className={`btn ${
                filter === cat ? "btn-warning text-white" : "btn-outline-warning"
              } mx-1`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container pb-5">
        <div className="row">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((p, i) => (
              <div key={i} className="col-md-4 mb-4" data-aos="fade-up">
                {/* ✅ Each project links to its details page */}
                <Link
                  to={`/projects/${p._id}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="card border-0 shadow-sm h-100 position-relative overflow-hidden">
                    <img
                      src={
                        p.images && p.images.length > 0
                          ? p.images[0]
                          : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                      }
                      alt={p.title}
                      className="card-img-top"
                      style={{
                        height: "250px",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                    />
                    <div
                      className="card-img-overlay d-flex align-items-end p-0"
                      style={{
                        background:
                          "linear-gradient(transparent, rgba(0,0,0,0.8))",
                      }}
                    >
                      <div className="p-3 text-white w-100">
                        <h5 className="fw-bold mb-1">{p.title}</h5>
                        <small className="text-light">
                          {p.category || "General Project"}
                        </small>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center text-muted">
              <p>No projects found yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <section
        className="text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg, #1e1e1e, #F97316)",
        }}
      >
        <div className="container">
          <h3 className="fw-bold mb-3">Want Your Dream Project Built by Us?</h3>
          <p className="mb-4">
            Whether it’s a home, commercial complex, or renovation — we’re ready to help.
          </p>
          <a href="/contact" className="btn btn-light fw-bold">
            Contact AK Construction
          </a>
        </div>
      </section>
    </div>
  );
}
