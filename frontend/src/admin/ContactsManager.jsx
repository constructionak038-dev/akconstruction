import React from "react";

export default function ContactsManager({ contacts, deleteMessage }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h4 className="fw-bold mb-3 text-warning">Contact Messages</h4>
        {contacts.length === 0 ? (
          <p className="text-muted">No messages yet.</p>
        ) : (
          <ul className="list-group">
            {contacts.map((c) => (
              <li
                key={c._id}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div>
                  <strong>{c.name}</strong> <br />
                  <small>{c.email}</small> <br />
                  <span>{c.message}</span>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteMessage(c._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
  