import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";
import axios from "../../utils/axiosInstance";

const DetailPost = () => {
  const [post, setPost] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getPost = async () => {
        try {
          setLoading(true);

          // API call to fetch post by ID
          const response = await axios.get(`/post/${id}`);
          const data = response.data.data;
  
          setPost(data.post || {});
          setLoading(false);
        } catch (error) {
          setLoading(false);
  
          const response = error.response;
          const data = response?.data || {};
          const message = data.message || "An error occurred while fetching the post";

          toast.error(message, {
            position: "top-right",
            autoClose: true,
          });
        }
      }
  
      getPost();
    }
  }, [id]);

  useEffect(() => {
    if (post?.file) {
      const getImage = async () => {
        try {
          // API call to fetch the signed URL for the image
          const response = await axios.get(`/file/signed-url?key=${post.file.key}`);
          const data = response.data.data;

          setImageUrl(data.url);
        } catch (error) {
          const response = error.response;
          const data = response?.data || {};
          const message = data.message || "An error occurred while fetching the image";

          toast.error(message, {
            position: "top-right",
            autoClose: true,
          });
        }
      }

      getImage();
    } 
  }, [post]);

  const handleDelete = async () => {
    try {
      setLoading(true);

      // API call to delete post
      const response = await axios.delete(`/post/${id}`);
      const data = response.data;

      setShowModal(false);

      toast.success(data.message || "Post deleted successfully!", {
        position: "top-right",
        autoClose: true,
      });

      setLoading(false);
      navigate("/posts");
    } catch (error) {
      setLoading(false);
      setShowModal(false);
        
      const response = error.response;
      const data = response?.data || {};
      const message = data.message || "An error occurred while deleting the post";

      toast.error(message, {
        position: "top-right",
        autoClose: true,
      });
    }
  }

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>Go Back</button>
      <button className="button button-block" onClick={() => navigate(`/posts/${id}/update`)}>Update Post</button>
      <button className="button button-block" onClick={() => setShowModal(true)}>Delete Post</button>
      {loading ? <p>Loading...</p> : (
        <div className="detail-container">
          <h2 className="post-title">{post?.title}</h2>
          <h5 className="post-category">Category: {post?.category?.name}</h5>
          <h5 className="post-category">Created at: {moment(post?.createdAt).format("MMMM DD YYYY, HH:mm:ss")}</h5>
          <h5 className="post-category">Updated at: {moment(post?.updatedAt).format("MMMM DD YYYY, HH:mm:ss")}</h5>
          <p className="post-desc">
            {post?.description || "No description available."}
          </p>

          <img src={imageUrl} alt="mern" />
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <div style={{ margin: "0 auto" }}>
            <Button className="no-button" onClick={() => setShowModal(false)}>No</Button>
            <Button className="yes-button" onClick={handleDelete}>Yes</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailPost;
