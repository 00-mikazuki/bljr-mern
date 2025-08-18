import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import { useAuth } from "../components/context/AuthContext";

const VerifyUser = () => {
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  // if (auth.isVerified) {
  //   return <Navigate to="/setting" />;
  // }

  const handleSendVerification = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // API call to send verification code
      const response = await axios.post("/auth/verification-code", {
        email: auth.email
      });
      const data = response.data;

      toast.success(data.message || "Verification code sent successfully!", {
        position: "top-right",
        autoClose: true,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);

      const response = error.response;
      const data = response?.data || {};
      const message = data.message || "An error occurred while sending the verification code";

      toast.error(message, {
        position: "top-right",
        autoClose: true,
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code) {
      try {
        setLoading2(true);

        // API call to send verification code
        const response = await axios.post("/auth/verify", {
          email: auth.email,
          code
        });
        const data = response.data;

        toast.success(data.message || "User verification successful!", {
          position: "top-right",
          autoClose: true,
        });

        localStorage.removeItem("blogData");
        
        setCode("");
        setCodeError("");
        setLoading2(false);
        navigate("/login");
      } catch (error) {
        setCode("");
        setCodeError("");
        setLoading2(false);

        const response = error.response;
        const data = response?.data || {};
        const message = data.message || "An error occurred while verifying the user";

        toast.error(message, {
          position: "top-right",
          autoClose: true,
        });
      }
    } else {
      setCodeError("Please enter the confirmation code");
    }
  }

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>Go Back</button>
      <button className="button button-block" onClick={handleSendVerification} disabled={loading}>{loading ? "Sending..." : "Send verification code"}</button>

      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Verify User</h2>
          <div className="form-group">
            <label>Confirmation code</label>
            <input
              className="form-control"
              type="text"
              name="code"
              placeholder="789654"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {codeError && <span className="error">{codeError}</span>}
          </div>

          <div className="form-group">
            <input className="button" type="submit" disabled={loading2} value={loading2 ? "Verifying..." : "Verify"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyUser;
