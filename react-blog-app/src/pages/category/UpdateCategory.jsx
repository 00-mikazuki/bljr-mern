import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import addCategoryValidator from "../../validators/addCategoryValidator";

const initialFormData = {
  name: "",
  description: "",
}

const initialFormError = {
  name: "",
  description: "",
}

const UpdateCategory = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  useEffect(() => {
    if (id) {
      const getCategory = async () => {
        try {
          setLoading(true);
  
          // API call to fetch category by ID
          const response = await axios.get(`/category/${id}`);
          const data = response.data.data;
  
          setFormData({
            name: data.category.name || "",
            description: data.category.description || "",
          });
          setLoading(false);
        } catch (error) {
          setLoading(false);
  
          const response = error.response;
          const data = response?.data || {};
          const message = data.message || "An error occurred while fetching the category";
  
          toast.error(message, {
            position: "top-right",
            autoClose: true,
          });
        }
      }
  
      getCategory();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = addCategoryValidator(formData);
    if (errors.name) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        // API call to add category endpoint
        const response = await axios.put(`/category/${id}`, formData);
        const data = response.data;

        toast.success(data.message || "Category updated successfully!", {
          position: "top-right",
          autoClose: true,
        });

        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/categories");
      } catch (error) {
        setLoading(false);

        const response = error.response;
        const data = response?.data || {};
        const message = data.message || "An error occurred during category creation";

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
        {loading ? <div className="loading">Loading...</div> : (<form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Update Category</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Technology"
              value={formData?.name || ""}
              onChange={handleChange}
            />
            {formError.name && <span className="error">{formError.name}</span>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              placeholder="Lorem ipsum"
              value={formData?.description || ""}
              onChange={handleChange}
            ></textarea>
            {formError.description && <span className="error">{formError.description}</span>}
          </div>

          <div className="form-group">
            <input className="button" type="submit" disabled={loading} value={loading ? "Updating..." : "Update"} />
          </div>
        </form>)}
      </div>
    </div>
  );
};

export default UpdateCategory;
