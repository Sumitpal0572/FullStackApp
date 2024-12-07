import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );
      login(res.data.accessToken);
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="block w-full mb-3 p-2 border"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="block w-full mb-3 p-2 border"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default Login;
