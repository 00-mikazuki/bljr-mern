import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./context/AuthContext";

const PrivateNavbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("blogData");
    toast.success("Logout successful!", {
      position: "top-right",
      autoClose: true,
    });
    navigate("/login");
  }

  return (
    <nav className="primary-link">
      <NavLink to="/">Home</NavLink>
      {(auth.role === 1 || auth.role === 2) && (
        <NavLink to="/categories">Categories</NavLink>
      )}
      <NavLink to="/posts">Posts</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/setting">Settings</NavLink>
      <NavLink to="/login" onClick={handleLogout}>Logout</NavLink>
    </nav>
  );
}

export default PrivateNavbar;