import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSave = async (data) => {
    try {
      selected
        ? await updateProduct(selected.id, data)
        : await addProduct(data);
      setShowModal(false);
      setSelected(null);
      loadProducts();
    } catch {
      setError("Save failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      loadProducts();
    } catch {
      setError("Delete failed");
    }
  };

  const filteredProducts = products.filter((p) =>
    `${p.name} ${p.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Product Management</h3>

      <ErrorAlert message={error} />

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Control
          style={{ maxWidth: "300px" }}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          onClick={() => {
            setSelected(null);
            setShowModal(true);
          }}
        >
          Add Product
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ProductTable
          products={filteredProducts}
          onEdit={(p) => {
            setSelected(p);
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <ProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        product={selected}
      />
    </div>
  );
};

export default Products;
