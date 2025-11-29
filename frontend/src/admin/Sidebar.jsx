import React from "react";

export default function Sidebar({ active, setActive, handleLogout }) {
  const links = [
    { name: "Projects", key: "projects" },
    { name: "Add Project", key: "add" },
    { name: "Contacts", key: "contacts" },
    { name: "Quotations", key: "quotations" }, // ✅ Added Quotation tab
    { name: "Estimations", key: "estimations" },
    { name: "Payment Schedule", key: "payments" },
    { name: "New Construction / Planning", key: "planning" }

  ];

  return (
    <div
      className="bg-dark text-white d-flex flex-column p-3"
      style={{ minHeight: "100vh", width: "230px" }}
    >
      <h4 className="text-warning fw-bold mb-4 text-center">AK Admin</h4>
      {links.map((link) => (
        <button
          key={link.key}
          className={`btn text-start mb-2 w-100 ${
            active === link.key ? "btn-warning text-dark" : "btn-outline-light"
          }`}
          onClick={() => setActive(link.key)}
        >
          {link.name}
        </button>
      ))}

      <div className="mt-auto">
        <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
