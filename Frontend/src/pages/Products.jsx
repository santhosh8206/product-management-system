
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
} from "../api/productApi";

import DataTable from "../components/DataTable";
import ProductModal from "../components/ProductModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

const Products = () => {
  /* ================= STATE ================= */
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    { key: "id", label: "ID", sortable: true, type: "number" },
    { key: "name", label: "Name", sortable: true, type: "string" },
    { key: "price", label: "Price", sortable: true, type: "number" },
  ];

  /* ================= LOAD PRODUCTS ================= */
  const loadProducts = async () => {
  try {
    setLoading(true);
    const res = await getProducts(showDeleted);
    setProducts(res.data);
  } catch {
    setError("Failed to load products");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
  loadProducts();
}, [showDeleted]);


  /* ================= CRUD HANDLERS ================= */
  const handleSave = async (data) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, data);
      } else {
        await addProduct(data);
      }
      setShowModal(false);
      setSelectedProduct(null);
      loadProducts();
    } catch {
      setError("Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      loadProducts();
    } catch {
      setError("Failed to delete product");
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreProduct(id);
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.error || "Restore failed");
    }
  };

  /* ================= FILTER ACTIVE / DELETED ================= */
  const visibleProducts = showDeleted
    ? products.filter(p => p.deleted_at)
    : products.filter(p => !p.deleted_at);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Product Management</h3>

      <ErrorAlert message={error} />

      {/* HEADER ACTIONS */}
      <div className="d-flex justify-content-between mb-3">
        <Button
          variant="secondary"
          onClick={() => setShowDeleted(!showDeleted)}
        >
          {showDeleted ? "Show Active" : "Show Deleted"}
        </Button>

        {!showDeleted && (
          <Button
            onClick={() => {
              setSelectedProduct(null);
              setShowModal(true);
            }}
          >
            Add Product
          </Button>
        )}
      </div>

      {/* CONTENT */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={visibleProducts}
          pageSize={5}
          renderActions={(product) =>
            !showDeleted ? (
              <>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="success"
                onClick={() => handleRestore(product.id)}
              >
                Restore
              </Button>
            )
          }
        />
      )}

      {/* MODAL */}
      <ProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
