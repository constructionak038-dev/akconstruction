import React from "react";

export default function AddProjectForm({ newProject, setNewProject, handleAddProject, status }) {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h4 className="fw-bold mb-3 text-warning">Add New Project</h4>
        <form onSubmit={handleAddProject}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Category (Completed/Ongoing)"
                value={newProject.category}
                onChange={(e) =>
                  setNewProject({ ...newProject, category: e.target.value })
                }
              />
            </div>

            <div className="col-md-12 mb-3">
              <input
                type="file"
                className="form-control"
                multiple
                accept="image/*"
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    images: Array.from(e.target.files),
                  })
                }
              />
            </div>

            {newProject.images.length > 0 && (
              <div className="d-flex flex-wrap mb-3">
                {newProject.images.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      marginRight: "10px",
                      marginBottom: "10px",
                      border: "1px solid #ddd",
                    }}
                  />
                ))}
              </div>
            )}

            <div className="col-md-12 mb-3">
              <textarea
                className="form-control"
                placeholder="Project Description"
                rows="3"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-warning fw-bold">
            Add Project
          </button>
          {status && <p className="mt-3 text-muted">{status}</p>}
        </form>
      </div>
    </div>
  );
}
