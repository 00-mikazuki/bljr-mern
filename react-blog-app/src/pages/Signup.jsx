import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import signupValidator from "../validators/signupvalidator";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const initialFormError = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const Signup = () => {
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
    const errors = signupValidator(formData);
    if (errors.name || errors.email || errors.password || errors.confirmPassword) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        // API call to signup endpoint
        const requestData = {
          name: formData.name,
          email: formData.email,
          password: formData.password
        };
        const response = await axios.post("/auth/signup", requestData);
        const data = response.data;
        
        toast.success(data.message || "Signup successful!", {
          position: "top-right",
          autoClose: true,
        });

        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/login");
      } catch (error) {
        setLoading(false);

        const response = error.response;
        const data = response?.data || {};
        const message = data.message || "An error occurred during signup.";

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
        <h2 className="form-title">Signup Form</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Jhon Doe"
            value={formData.name}
            onChange={handleChange}
          />
          {formError.name && <span className="error">{formError.name}</span>}
        </div>

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

        <div className="form-group">
          <label>Confirm password</label>
          <input
            className="form-control"
            type="password"
            name="confirmPassword"
            placeholder="***********"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {formError.confirmPassword && <span className="error">{formError.confirmPassword}</span>}
        </div>

        <div className="form-group">
          <input className="button" type="submit" disabled={loading} value={loading ? "Saving..." : "Signup"} />
        </div>
      </form>
    </div>
  );
};

export default Signup;
