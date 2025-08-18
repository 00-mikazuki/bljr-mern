import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import updateProfileValidator from "../validators/updateProfileValidator";


const initialFormData = {
  name: "",
  email: "",
}

const initialFormError = {
  name: "",
  email: "",
}

const Profile = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [oldEmail, setOldEmail] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);

        // API call to fetch current user profile
        const response = await axios.get(`/auth/current-user`);
        const data = response.data.data;

        setFormData({
          name: data.user.name || "",
          email: data.user.email || "",
        });
        setOldEmail(data.user.email || "");
        setLoading(false);
      } catch (error) {
        setLoading(false);

        const response = error.response;
        const data = response?.data || {};
        const message = data.message || "An error occurred while fetching the user profile";

        toast.error(message, {
          position: "top-right",
          autoClose: true,
        });
      }
    }

    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = updateProfileValidator(formData);
    if (errors.name || errors.email) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        // API call to update category endpoint
        const response = await axios.put(`/auth/update-profile`, formData);
        const data = response.data;
        const updatedUser = data.data.user;

        toast.success(data.message || "Profile updated successfully!", {
          position: "top-right",
          autoClose: true,
        });

        setFormData({
          name: updatedUser.name || "",
          email: updatedUser.email || "",
        });
        setFormError(initialFormError);
        setLoading(false);

        // If email has changed, redirect to profile page
        if (oldEmail !== formData.email) {
          localStorage.removeItem("blogData");
          navigate("/login");
        }
      } catch (error) {
        setLoading(false);

        const response = error.response;
        const data = response?.data || {};
        const message = data.message || "An error occurred during profile update";

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

      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Update profile</h2>
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
              type="email"
              name="email"
              placeholder="doe@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
            {formError.email && <span className="error">{formError.email}</span>}
          </div>

          <div className="form-group">
            <input className="button" type="submit" disabled={loading} value={loading ? "Updating..." : "Update"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
