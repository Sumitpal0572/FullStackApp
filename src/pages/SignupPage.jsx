import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/signup", formData);
      setSuccess("Account created successfully! Redirecting to login...");
      setError("");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2 seconds
    } catch (error) {
      setError(
        "Failed to create account. Username or email may already exist."
      );
      setSuccess("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border shadow-md">
      <h2 className="text-2xl mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="block w-full p-2 border mb-3"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full p-2 border mb-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="block w-full p-2 border mb-3"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Signup
        </button>
        {success && <p className="text-green-500 mt-2">{success}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
