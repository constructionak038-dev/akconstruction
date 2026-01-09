export default function QuotationList({ quotations, onDelete, onDownload }) {
  return (
    <>
      <h5>📜 Saved Quotations</h5>
      {quotations.map((q) => (
        <div key={q._id} className="border p-3 mb-2 bg-light">
          <h6>{q.projectTitle}</h6>
          <p>Owner: {q.ownerName}</p>
          <p>Total: Rs. {q.totalAmount}</p>

          <button
            className="btn btn-sm btn-success me-2"
            onClick={() => onDownload(q)}
          >
            Download PDF
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(q._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
