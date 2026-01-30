import { Table, Button } from "react-bootstrap";
import { useState } from "react";

const ProductTable = ({ products = [], onEdit, onDelete }) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...products].sort((a, b) => {
    if (!sortKey) return 0;
    if (a[sortKey] < b[sortKey]) return sortDir === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const start = (page - 1) * pageSize;
  const paginated = sorted.slice(start, start + pageSize);
  const totalPages = Math.ceil(sorted.length / pageSize);

  return (
    <>
      <Table bordered hover>
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
              Name {sortKey === "name" && (sortDir === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("price")} style={{ cursor: "pointer" }}>
              Price {sortKey === "price" && (sortDir === "asc" ? "↑" : "↓")}
            </th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td className="text-center">
                <Button size="sm" onClick={() => onEdit(p)}>
                  Edit
                </Button>{" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(p.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-center">
        <Button
          size="sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          &lt; Previous
        </Button>
        <span className="mx-3">
          {page} / {totalPages || 1}
        </span>
        <Button
          size="sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next &gt;
        </Button>
      </div>
    </>
  );
};

export default ProductTable;
