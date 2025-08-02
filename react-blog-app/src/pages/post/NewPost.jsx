import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import addPostValidator from "../../validators/addPostValidator";

const initialFormData = {
  title: "",
  description: "",
  category: "",
}

const initialFormError = {
  title: "",
  description: "",
  category: "",
}

const NewPost = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [extensionError, setExtensionError] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        // API call to fetch categories
        const response = await axios.get(`/category?size=1000`);
        const data = response.data.data;

        setCategories(data.categories || []);
      } catch (error) {
        const response = error.response;
        const data = response?.data || {};
        const message = data.message || "An error occurred while fetching categories";

        toast.error(message, {
          position: "top-right",
          autoClose: true,
        });
      }
    };

    getCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = addPostValidator({
      title: formData.title,
      category: formData.category,
    });
    if (errors.title || errors.category) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        let input = { ...formData };

        if (fileId) {
          input = { ...input, file: fileId };
        }

        // API call to add post endpoint
        const response = await axios.post("/post", input);
        const data = response.data;

        toast.success(data.message || "Post added successfully!", {
          position: "top-right",
          autoClose: true,
        });

        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/posts");
      } catch (error) {
        setLoading(false);

        const response = error.response;
        const data = response?.data || {};
        const message = data.message || "An error occurred during post creation";

        toast.error(message, {
          position: "top-right",
          autoClose: true,
        });
      }
    }
  }

  const handleFileChange = async (e) => {
    console.log(e.target.files);

    const formInput = new FormData();
    formInput.append("image", e.target.files[0]);

    const type = e.target.files[0].type;
    if (type.startsWith("image/") && (type.endsWith("jpg") || type.endsWith("jpeg") || type.endsWith("png"))) {
      setExtensionError(null);
      try {
        setIsDisabled(true);

        // API call to upload image
        const response = await axios.post("/file/upload", formInput);
        const data = response.data;
        setFileId(data.data._id);

        toast.success(data.message || "Image uploaded successfully!", {
          position: "top-right",
          autoClose: true,
        });

        setIsDisabled(false);
      } catch (error) {
        setIsDisabled(false);

        const response = error.response;
        const data = response?.data || {};
        const message = data.message || "An error occurred during image upload";

        toast.error(message, {
          position: "top-right",
          autoClose: true,
        });
      }
    } else {
      setExtensionError("Please select a valid image file (jpg, jpeg, png)");
    }
  }

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>Go Back</button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">New Post</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="React blog post"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && <span className="error">{formError.title}</span>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              type="text"
              name="description"
              placeholder="Lorem ipsum"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            {formError.description && <span className="error">{formError.description}</span>}
          </div>

          <div className="form-group">
            <label>Select an image</label>
            <input
              className="form-control"
              type="file"
              name="file"
              placeholder="Lorem ipsum"
              onChange={handleFileChange}
            />
            {extensionError && <span className="error">{extensionError}</span>}
          </div>

          <div className="form-group">
            <label>Select a category</label>
            <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formError.category && <span className="error">{formError.category}</span>}
          </div>

          <div className="form-group">
            <input className="button" type="submit" disabled={loading || isDisabled} value={loading ? "Adding..." : "Add"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
