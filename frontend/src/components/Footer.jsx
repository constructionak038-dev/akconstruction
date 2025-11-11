import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <p className="mb-0">© {new Date().getFullYear()} AK Construction</p>
      <p className="small mb-0 text-warning">
        At post Panderi, Tal: Mandangad, Dist: Ratnagiri | +91 72761 02921
      </p>
    </footer>
  );
}
