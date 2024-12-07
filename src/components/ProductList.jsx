import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { auth } = useContext(AuthContext);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data);
    } catch (error) {
      setError("Failed to fetch products.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      fetchProducts();
    } catch (error) {
      setError("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl mb-4">Products</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {products.map((product) => (
        <div
          key={product._id}
          className="border p-4 mb-2 flex justify-between items-center"
        >
          <span>{product.name}</span>
          <button
            onClick={() => handleDelete(product._id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
