import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import changePasswordValidator from "../validators/changePasswordValidator";
import { useAuth } from "../components/context/AuthContext";

const initialFormData = {
  oldPassword: "",
  newPassword: "",
}

const initialFormError = {
  oldPassword: "",
  newPassword: "",
}

const Setting = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = changePasswordValidator(formData);
    if (errors.oldPassword || errors.newPassword) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        // API call to change password endpoint
        const response = await axios.put("/auth/change-password", formData);
        const data = response.data;

        toast.success(data.message || "Password changed successfully!", {
          position: "top-right",
          autoClose: true,
        });

        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        const response = error.response;
        const data = response?.data || {};
        const message = data.message || "An error occurred while changing the password";

        toast.error(message, {
          position: "top-right",
          autoClose: true,
        });
      }
    }
  }

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>Go Back</button>
      {!auth.isVerified && (
        <button className="button button-block" onClick={() => navigate("/verify")}>Verify user</button>
      )}
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Change Password</h2>
          <div className="form-group">
            <label>Old password</label>
            <input
              className="form-control"
              type="password"
              name="oldPassword"
              placeholder="***********"
              value={formData.oldPassword}
              onChange={handleChange}
            />
            {formError.oldPassword && <span className="error">{formError.oldPassword}</span>}
          </div>

          <div className="form-group">
            <label>New password</label>
            <input
              className="form-control"
              type="password"
              name="newPassword"
              placeholder="***********"
              value={formData.newPassword}
              onChange={handleChange}
            />
            {formError.newPassword && <span className="error">{formError.newPassword}</span>}
          </div>

          <div className="form-group">
            <input className="button" type="submit" disabled={loading} value={loading ? "Changing..." : "Change"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
