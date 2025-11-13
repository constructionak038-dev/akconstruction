import React, { useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL =
      process.env.REACT_APP_API_URL || "http://localhost:5000";

      await axios.post(`${API_URL}/api/contact`, form);
      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("❌ Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Banner */}
      <section
        className="text-white text-center d-flex align-items-center"
        style={{
          height: "50vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1581092795360-fd1ca04f7c5b')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <h1 className="fw-bold text-warning">Get in Touch</h1>
          <p className="lead mt-2">
            Have a project in mind? Let’s build something great together.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="container py-5">
        <div className="row">
          {/* Contact Info */}
          <div className="col-md-5 mb-4">
            <h3 className="text-warning fw-bold mb-3">Contact Information</h3>
            <p className="text-secondary">
              Feel free to reach out to us anytime for inquiries, quotes, or site visits.
            </p>

            <div className="d-flex align-items-center mb-3">
              <FaMapMarkerAlt className="text-warning me-3 fs-4" />
              <span>At Post: Panderi, Taluka: Mandangad, Dist: Ratnagiri</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <FaPhoneAlt className="text-warning me-3 fs-4" />
              <span>+91 72761 02921</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <FaEnvelope className="text-warning me-3 fs-4" />
              <span>arafatkazi094@gmail.com</span>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/917276102921"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success mt-2 fw-bold"
            >
              <FaWhatsapp className="me-2" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="col-md-7">
            <h3 className="text-warning fw-bold mb-3">Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Your Message"
                  rows="5"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-warning w-100 fw-bold">
                Send Message
              </button>
            </form>
            {status && <p className="mt-3 text-center text-muted">{status}</p>}
          </div>
        </div>
      </section>

      {/* Google Map Embed */}
      <section className="pb-5">
        <div className="container">
          <h3 className="text-warning fw-bold text-center mb-4">Find Us on Map</h3>
          <div className="ratio ratio-16x9 shadow">
            <iframe
              title="AK Construction Location"
              src="https://www.google.com/maps?q=Panderi%20Mandangad%20Ratnagiri&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section
        className="text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg, #1e1e1e, #F97316)",
        }}
      >
        <div className="container">
          <h3 className="fw-bold mb-3">We’re Just One Call Away</h3>
          <p className="mb-4">
            Get in touch with AK Construction for estimation, planning, or site visits.
          </p>
          <a href="tel:+917276102921" className="btn btn-light fw-bold">
            Call Now
          </a>
        </div>
      </section>
    </div>
  );
}
