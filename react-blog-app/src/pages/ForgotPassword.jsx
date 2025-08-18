import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import sendForgotPasswordCodeValidator from "../validators/sendForgotPasswordCodeValidator";
import recoverPasswordValidator from "../validators/recoverPasswordValidator";

const initialFormData = {
  email: "",
  code: "",
  password: "",
}

const initialFormError = {
  code: "",
  password: "",
}

const ForgotPassword = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [emailError, setEmailError] = useState("");
  const [hasEmail, setHasEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSendCode = async (e) => {
    e.preventDefault();

    const errors = sendForgotPasswordCodeValidator({ email: formData.email });

    if (errors.email) {
      setEmailError(errors.email);
    } else {
      try {
        setLoading(true);

        // API call to send forgot password code endpoint
        const response = await axios.post("/auth/forgot-password-code", { email: formData.email });
        const data = response.data;

        toast.success(data.message || "Code sent successfully!", {
          position: "top-right",
          autoClose: true,
        });

        setEmailError("");
        setHasEmail(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        const response = error.response;
        const data = response?.data || {};
        const message = data.message || "An error occurred while sending the code";

        toast.error(message, {
          position: "top-right",
          autoClose: true,
        });
      } 
    }
  }

  const handleRecoverPassword = async (e) => {
    e.preventDefault();

    const errors = recoverPasswordValidator(formData);

    if (errors.code || errors.password) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        // API call to recover password endpoint
        const response = await axios.post("/auth/recover-password", formData);
        const data = response.data;

        toast.success(data.message || "Password recovered successfully!", {
          position: "top-right",
          autoClose: true,
        });

        setFormData(initialFormData);
        setFormError(initialFormError);
        setHasEmail(false);
        setLoading(false);
        navigate("/login");
      } catch (error) {
        setLoading(false);

        const response = error.response;
        const data = response?.data || {};
        const message = data.message || "An error occurred while recovering the password.";

        toast.error(message, {
          position: "top-right",
          autoClose: true,
        });
      }
    }
  }

  return (
    <div className="form-container">
      <form className="inner-container" onSubmit={!hasEmail ? handleSendCode : handleRecoverPassword}>
        <h2 className="form-title">{!hasEmail ? "Recover Password" : "Verify Code"}</h2>

        {!hasEmail ? (
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
            {emailError && <span className="error">{emailError}</span>}
          </div>
        ) : (
          <>
            <div className="form-group">
              <label>Code</label>
              <input
                className="form-control"
                type="text"
                name="code"
                placeholder="123456"
                value={formData.code}
                onChange={handleChange}
              />
              {formError.code && <span className="error">{formError.code}</span>}
            </div>

            <div className="form-group">
              <label>New Password</label>
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
          </>
        )}

        <div className="form-group">
          <input className="button" type="submit" disabled={loading} value={loading ? "Loading..." : "Send"} />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
