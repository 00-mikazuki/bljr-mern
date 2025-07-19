// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
// Link is used for navigation, but NavLink provides additional styling capabilities for active links.

const Navbar = () => {
  return (
    <nav className="primary-link">
      {/* <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link> */}
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/posts">Posts</NavLink>
      <NavLink to="/products">Products</NavLink>
    </nav>
  )
}

export default Navbar;