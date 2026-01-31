import { Table, Form, Button } from "react-bootstrap";
import { useMemo, useState } from "react";

const DataTable = ({
  columns = [],
  data = [],
  pageSize = 5,
  renderActions,
}) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  /* ================= FILTER ================= */
  const filteredData = useMemo(() => {
    setPage(1);
    return data.filter(row =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  /* ================= SORT ================= */
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const column = columns.find(c => c.key === sortConfig.key);
    if (!column?.sortable) return filteredData;

    return [...filteredData].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (column.type === "number") {
        aVal = Number(aVal);
        bVal = Number(bVal);
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig, columns]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedData = sortedData.slice(start, start + pageSize);

  /* ================= HANDLERS ================= */
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  return (
    <>
      {/* Search */}
      <Form.Control
        className="mb-3"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <Table bordered hover>
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => col.sortable && handleSort(col.key)}
                style={{ cursor: col.sortable ? "pointer" : "default" }}
              >
                {col.label}
                {sortConfig.key === col.key &&
                  (sortConfig.direction === "asc" ? " ▲" : " ▼")}
              </th>
            ))}
            {renderActions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (renderActions ? 1 : 0)}
                className="text-center"
              >
                No data found
              </td>
            </tr>
          ) : (
            paginatedData.map((row, index) => (
              <tr key={index}>
                {columns.map(col => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
                {renderActions && <td>{renderActions(row)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center gap-2">
          <Button
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>

          <span>
            Page {page} of {totalPages}
          </span>

          <Button
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default DataTable;