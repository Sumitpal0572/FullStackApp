import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        credentials
      );
      // Use login function from AuthContext
      login(res.data.accessToken, res.data.refreshToken); // Pass both tokens to the login function

      // setAuth({
      //   accessToken: res.data.accessToken,
      //   refreshToken: res.data.refreshToken,
      // });
      // localStorage.setItem("accessToken", res.data.accessToken);
      // localStorage.setItem("refreshToken", res.data.refreshToken);
      setError("");
      navigate("/products");
    } catch (error) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border shadow-md">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className="block w-full p-2 border mb-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="block w-full p-2 border mb-3"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
