import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import loginValidator from "../validators/loginValidator";

const initialFormData = {
  email: "",
  password: "",
}

const initialFormError = {
  email: "",
  password: "",
}

const Login = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = loginValidator(formData);
    if (errors.email || errors.password) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        // API call to login endpoint
        const response = await axios.post("/auth/signin", formData);
        const data = response.data;

        // Save credentials to localStorage
        localStorage.setItem("blogData", JSON.stringify(data.data));

        toast.success(data.message || "Login successful!", {
          position: "top-right",
          autoClose: true,
        });

        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/");
      } catch (error) {
        setLoading(false);

        const response = error.response;
        const data = response?.data || {};
        const message = data.message || "An error occurred during login";

        toast.error(message, {
          position: "top-right",
          autoClose: true,
        });
      }
    }
  }

  return (
    <div className="form-container">
      <form className="inner-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Login Form</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="doe@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          {formError.email && <span className="error">{formError.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="***********"
            value={formData.password}
            onChange={handleChange}
          />
          {formError.password && <span className="error">{formError.password}</span>}
        </div>

        <Link className="forgot-password" to="/forgot-password">
          Forgot Password
        </Link>

        <div className="form-group">
          <input className="button" type="submit" disabled={loading} value={loading ? "Logging in..." : "Login"} />
        </div>
      </form>
    </div>
  );
};

export default Login;
