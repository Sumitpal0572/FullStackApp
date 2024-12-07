import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <div>
        <Link to="/" className="mr-4">
          Home
        </Link>
        {auth.isAuthenticated && (
          <Link to="/products" className="mr-4">
            Products
          </Link>
        )}
      </div>
      <div>
        {!auth.isAuthenticated ? (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
