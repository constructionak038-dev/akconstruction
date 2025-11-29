import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import AddProjectForm from "./AddProjectForm";
import ProjectsManager from "./ProjectsManager";
import ContactsManager from "./ContactsManager";
import QuotationManager from "./QuotationManager";
import EstimationManager from "./EstimationManager";
import PaymentScheduleManager from "./PaymentScheduleManager";
import PlanningManager from "./PlanningManager";

const ADMIN_KEY = "akconstruction@admin";

// ✅ Dynamic API URL for both Local and Render
const API_URL =
  process.env.REACT_APP_API_URL || "https://akconstruction-backend.onrender.com";

export default function AdminDashboard() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [active, setActive] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "",
    images: [],
  });
  const [status, setStatus] = useState("");
  const [editProject, setEditProject] = useState(null);

  // 🧠 Fetch Data
  useEffect(() => {
    if (localStorage.getItem("adminAuth") === "true") {
      setAuth(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const p = await axios.get(`${API_URL}/api/projects`);
      const c = await axios.get(`${API_URL}/api/contact/list`);
      setProjects(p.data);
      setContacts(c.data);
    } catch (err) {
      console.error("❌ Error fetching data:", err.message);
    }
  };

  // 🔐 Login
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/admin/login`, { password });
      if (res.data.success) {
        setAuth(true);
        localStorage.setItem("adminAuth", "true");
        fetchData();
      } else alert("Wrong password");
    } catch {
      alert("❌ Incorrect password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setAuth(false);
    setPassword("");
  };

  // 🧱 Add Project
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", newProject.title);
      formData.append("description", newProject.description);
      formData.append("category", newProject.category);
      newProject.images.forEach((img) => formData.append("images", img));

      await axios.post(`${API_URL}/api/projects`, formData, {
        headers: {
          Authorization: ADMIN_KEY,
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus("✅ Project added!");
      setNewProject({ title: "", description: "", category: "", images: [] });
      fetchData();
    } catch {
      setStatus("❌ Upload failed");
    }
  };

  // 🗑 Delete Project
  const deleteProject = async (id) => {
    if (!window.confirm("Delete project?")) return;
    await axios.delete(`${API_URL}/api/projects/${id}`, {
      headers: { Authorization: ADMIN_KEY },
    });
    fetchData();
  };

  // 📨 Delete Contact Message
  const deleteMessage = async (id) => {
    if (!window.confirm("Delete message?")) return;
    await axios.delete(`${API_URL}/api/contact/${id}`);
    fetchData();
  };

  // 🔒 Admin login screen
  if (!auth)
    return (
      <div className="text-center py-5">
        <h2 className="text-warning">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          className="form-control w-50 mx-auto mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="btn btn-warning">
          Login
        </button>
      </div>
    );

  // 🧭 Dashboard UI
  return (
    <div className="d-flex">
      <Sidebar active={active} setActive={setActive} handleLogout={handleLogout} />

      <div className="flex-grow-1 p-4">
        {active === "add" && (
          <AddProjectForm
            newProject={newProject}
            setNewProject={setNewProject}
            handleAddProject={handleAddProject}
            status={status}
          />
        )}

        {active === "projects" && (
          <ProjectsManager
            projects={projects}
            deleteProject={deleteProject}
            openEditModal={setEditProject}
          />
        )}

        {active === "contacts" && (
          <ContactsManager contacts={contacts} deleteMessage={deleteMessage} />
        )}

        {active === "quotations" && <QuotationManager />}
        {active === "estimations" && <EstimationManager />}
        {active === "payments" && <PaymentScheduleManager />}
        {active === "planning" && <PlanningManager />}


      </div>

      {/* 🧱 Edit Project Modal */}
      {editProject && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-warning">Edit Project</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditProject(null)}
                ></button>
              </div>

              <div className="modal-body">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      const formData = new FormData();
                      formData.append("title", editProject.title);
                      formData.append("description", editProject.description);
                      formData.append("category", editProject.category);

                      if (editProject.newImages?.length > 0) {
                        editProject.newImages.forEach((img) =>
                          formData.append("images", img)
                        );
                      }

                      await axios.put(
                        `${API_URL}/api/projects/${editProject._id}`,
                        formData,
                        {
                          headers: {
                            Authorization: ADMIN_KEY,
                            "Content-Type": "multipart/form-data",
                          },
                        }
                      );

                      setStatus("✅ Project updated!");
                      setEditProject(null);
                      fetchData();
                    } catch (err) {
                      console.error(err);
                      setStatus("❌ Update failed");
                    }
                  }}
                >
                  {/* Inputs */}
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Project Title"
                    value={editProject.title}
                    onChange={(e) =>
                      setEditProject({ ...editProject, title: e.target.value })
                    }
                    required
                  />

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Category"
                    value={editProject.category}
                    onChange={(e) =>
                      setEditProject({ ...editProject, category: e.target.value })
                    }
                  />

                  <textarea
                    className="form-control mb-3"
                    placeholder="Description"
                    rows="4"
                    value={editProject.description}
                    onChange={(e) =>
                      setEditProject({
                        ...editProject,
                        description: e.target.value,
                      })
                    }
                  ></textarea>

                  <input
                    type="file"
                    multiple
                    className="form-control mb-3"
                    onChange={(e) =>
                      setEditProject({
                        ...editProject,
                        newImages: Array.from(e.target.files),
                      })
                    }
                  />

                  {/* Preview existing images */}
                  {editProject.images?.length > 0 && (
                    <div className="d-flex flex-wrap mb-3">
                      {editProject.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="position-relative me-2 mb-2"
                          style={{ width: "100px", height: "100px" }}
                        >
                          <img
                            src={img}
                            alt={`Project ${idx}`}
                            className="img-fluid rounded shadow-sm"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              border: "1px solid #ddd",
                            }}
                          />
                          <button
                            type="button"
                            onClick={async () => {
                              if (!window.confirm("Delete this image?")) return;
                              try {
                                await axios.delete(
                                  `${API_URL}/api/projects/${editProject._id}/images/${idx}`,
                                  { headers: { Authorization: ADMIN_KEY } }
                                );
                                setEditProject((prev) => ({
                                  ...prev,
                                  images: prev.images.filter((_, i) => i !== idx),
                                }));
                                fetchData();
                              } catch (err) {
                                console.error(err);
                                alert("❌ Failed to delete image");
                              }
                            }}
                            className="btn btn-sm btn-danger position-absolute top-0 end-0"
                            style={{
                              borderRadius: "50%",
                              padding: "2px 6px",
                              fontSize: "0.8rem",
                              transform: "translate(30%, -30%)",
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-end d-flex justify-content-between align-items-center mt-3">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setEditProject(null)}
                    >
                      Cancel
                    </button>

                    <div>
                      <button type="submit" className="btn btn-success me-2">
                        Save Changes
                      </button>

                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={async () => {
                          if (!editProject.newImages?.length) {
                            return alert("⚠️ Please select new images first!");
                          }

                          const formData = new FormData();
                          editProject.newImages.forEach((img) =>
                            formData.append("images", img)
                          );

                          try {
                            await axios.post(
                              `${API_URL}/api/projects/${editProject._id}/add-images`,
                              formData,
                              {
                                headers: {
                                  Authorization: ADMIN_KEY,
                                  "Content-Type": "multipart/form-data",
                                },
                              }
                            );

                            alert("✅ Images added successfully!");
                            setEditProject(null);
                            fetchData();
                          } catch (err) {
                            console.error(err);
                            alert("❌ Failed to add images");
                          }
                        }}
                      >
                        ➕ Add Images
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
