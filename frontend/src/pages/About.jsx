import React from "react";
import {  FaBuilding, FaBullseye, FaHandshake, FaTools, FaCogs, FaHardHat, FaUsers} from "react-icons/fa";

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section
        className="text-white text-center d-flex align-items-center"
        style={{
          height: "50vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1599423300746-b62533397364')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <h1 className="fw-bold text-warning">About AK Construction</h1>
          <p className="lead mt-2">
            Quality. Commitment. Precision in Every Project.
          </p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1599423300746-b62533397364"
              alt="Civil Engineer Arfat Kazi"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <h2 className="text-warning fw-bold mb-3">Civil Engineer Arfat Kazi</h2>
            <p className="text-secondary">
              At <b>AK Construction</b>, we believe that every structure should be
              strong, safe, and timeless. Founded and managed by
              <b> Civil Engineer Arfat Kazi</b>, our firm brings together
              innovation, design, and engineering expertise to build
              reliable, modern spaces that last for generations.
            </p>
            <p className="text-secondary">
              From planning to execution, every project is handled with precision
              and transparency. We serve residential, commercial, and industrial
              clients across Maharashtra with a focus on trust and quality.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Experience */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="text-warning fw-bold mb-4">Our Core Principles</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <FaBullseye size={50} className="text-warning mb-3" />
              <h5 className="fw-bold">Our Mission</h5>
              <p className="text-muted">
                To deliver high-quality construction projects that exceed
                expectations — on time and within budget.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <FaBuilding size={50} className="text-warning mb-3" />
              <h5 className="fw-bold">Our Vision</h5>
              <p className="text-muted">
                To be recognized as a leading construction company known for
                innovation, integrity, and precision.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <FaTools size={50} className="text-warning mb-3" />
              <h5 className="fw-bold">Our Experience</h5>
              <p className="text-muted">
                With years of practical fieldwork, we bring technical excellence
                and hands-on expertise to every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container py-5">
        <h2 className="text-warning fw-bold mb-4 text-center">Our Values</h2>
        <div className="row text-center">
          <div className="col-md-3 mb-4">
            <FaHandshake size={40} className="text-warning mb-2" />
            <h6 className="fw-bold">Integrity</h6>
            <p className="text-muted small">
              We maintain honesty and transparency with our clients.
            </p>
          </div>
          <div className="col-md-3 mb-4">
            <FaCogs size={40} className="text-warning mb-2" />
            <h6 className="fw-bold">Innovation</h6>
            <p className="text-muted small">
              We constantly adopt modern methods and sustainable techniques.
            </p>
          </div>
          <div className="col-md-3 mb-4">
            <FaHardHat size={40} className="text-warning mb-2" />
            <h6 className="fw-bold">Safety</h6>
            <p className="text-muted small">
              We prioritize worker safety and structural stability always.
            </p>
          </div>
          <div className="col-md-3 mb-4">
            <FaUsers size={40} className="text-warning mb-2" />
            <h6 className="fw-bold">Customer Focus</h6>
            <p className="text-muted small">
              Client satisfaction is at the heart of everything we do.
            </p>
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
          <h3 className="fw-bold mb-3">Let’s Build Something Great Together</h3>
          <p className="mb-4">
            Contact us today for planning, estimation, and reliable construction
            service in your area.
          </p>
          <a href="/contact" className="btn btn-light fw-bold">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
