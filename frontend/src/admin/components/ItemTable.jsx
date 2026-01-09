export default function ItemTable({ items }) {
  if (!items.length) return null;

  return (
    <table className="table table-sm mt-3">
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Unit</th>
          <th>Area</th>
          <th>Rate</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {items.map((it, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{it.description}</td>
            <td>{it.unit}</td>
            <td>{it.area}</td>
            <td>{it.rate}</td>
            <td>{it.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
