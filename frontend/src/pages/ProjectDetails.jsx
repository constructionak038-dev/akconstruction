import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch(() => console.log("Error loading project"));
  }, [id]);

  if (!project) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/projects" className="btn btn-outline-secondary">
          ← Back to Projects
        </Link>
        <h4 className="text-warning fw-bold m-0">Project Gallery</h4>
      </div>

      {/* ✅ Gallery Grid Only */}
      <div className="row">
        {project.images?.length > 0 ? (
          project.images.map((img, idx) => (
            <div key={idx} className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm">
                <img
                  src={img}
                  alt={`Project ${idx}`}
                  className="img-fluid rounded"
                  style={{
                    height: "250px",
                    width: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted py-5">
            <p>No images found for this project.</p>
          </div>
        )}
      </div>
    </div>
  );
}
