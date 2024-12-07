import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const ProductForm = ({ productId, fetchProducts, closeForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const { auth } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (productId) {
      // Fetch product details for editing
      const fetchProduct = async () => {
        try {
          const res = await axios.get(
            `http://localhost:1234/api/products/${productId}`,
            {
              headers: { Authorization: `Bearer ${auth.accessToken}` },
            }
          );
          setFormData(res.data);
        } catch (error) {
          setError("Failed to fetch product details.");
        }
      };
      fetchProduct();
    }
  }, [productId, auth.accessToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productId) {
        // Update existing product
        await axios.put(
          `http://localhost:1234/api/products/${productId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }
        );
        setSuccess("Product updated successfully!");
      } else {
        // Create new product
        await axios.post("http://localhost:3000/api/products", formData, {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        });
        setSuccess("Product created successfully!");
      }
      setError("");
      fetchProducts();
      closeForm();
    } catch (error) {
      setError("Failed to save product.");
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-md">
      <h2 className="text-2xl mb-4">
        {productId ? "Edit Product" : "Add Product"}
      </h2>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="block w-full p-2 border mb-3"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="block w-full p-2 border mb-3"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="block w-full p-2 border mb-3"
        rows="3"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {productId ? "Update Product" : "Create Product"}
      </button>
      {success && <p className="text-green-500 mt-2">{success}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default ProductForm;
