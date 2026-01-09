export default function ItemForm({ item, setItem, addItem }) {
  return (
    <>
      <h6 className="mt-3 fw-bold">Add Item</h6>
      <div className="row g-2">
        {["description", "unit", "area", "rate", "amount"].map((field) => (
          <div className="col-md-2" key={field}>
            <input
              className="form-control"
              placeholder={field}
              value={item[field]}
              onChange={(e) =>
                setItem({ ...item, [field]: e.target.value })
              }
            />
          </div>
        ))}
        <div className="col-md-1">
          <button onClick={addItem} className="btn btn-success w-100">
            ➕
          </button>
        </div>
      </div>
    </>
  );
}
