import React from "react";

export default function ProjectsManager({ projects, openEditModal, deleteProject }) {
  return (
    <div>
      <h4 className="fw-bold mb-3 text-warning">Existing Projects</h4>
      <div className="row">
        {projects.map((p) => (
          <div key={p._id} className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm">
              <img
                src={
                  p.images && p.images.length > 0
                    ? p.images[0]
                    : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                }
                className="card-img-top"
                alt={p.title}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="fw-bold">{p.title}</h5>
                <p className="text-muted">{p.category}</p>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openEditModal(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteProject(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
