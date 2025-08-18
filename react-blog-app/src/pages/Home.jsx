import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);

        // API call to fetch posts
        const response = await axios.get(`/post?page=${currentPage}&size=${pageSize}&q=${searchQuery}`);
        const data = response.data.data;

        console.log(`/post?page=${currentPage}&size=${pageSize}&q=${searchQuery}`)
        console.log(data);

        setPosts(data.posts || []);
        setTotalPage(data.pagination.totalPages || 1);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        
        const response = error.response;
        const data = response?.data || {};
        const message = data.message || "An error occurred while fetching posts";

        toast.error(message, {
          position: "top-right",
          autoClose: true,
        });
      }
    };

    getPosts();
  }, [currentPage, pageSize, searchQuery]);

  useEffect(() => {
    if (totalPage > 1) {
      let tempPageCount = [];

      for (let i = 1; i <= totalPage; i++) {
        tempPageCount = [...tempPageCount, i];
      }

      setPageCount(tempPageCount);
    } else {
      setPageCount([]);
    }
  }, [totalPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleChangePageSize = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  }

  const handleSearch = (e) => {
    const input = e.target.value;

    setSearchQuery(input);
    setCurrentPage(1);
  }

  return (
    <div>
      <h2 className="table-title">Post list</h2>

      <input
        className="saerch-input"
        type="text"
        name="search"
        placeholder="Search here"
        onChange={handleSearch}
      />

      <label htmlFor="pageSize">Page Size:</label>
      <select name="pageSize" id="pageSize" value={pageSize} onChange={(e) => handleChangePageSize(e.target.value)}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>

      <div className="flexbox-container wrap">
        {loading ? <p className="loading-text">Loading...</p> : 
          posts.map((post) => (
            <div className="post-card" key={post._id} onClick={() => navigate(`/posts/${post._id}`)}>
              <h4 className="card-title">{post.title}</h4>
              <p className="card-desc">
                {post.description ? post.description.substring(0, 50) + "..." : "No description available"}
            </p>
            {/* <img src={placeImg} alt="post" className="card-img" /> */}
          </div>
          ))
        }
      </div>

      {totalPage > 1 && (
        <div className="pag-container">
          <button className="pag-button" disabled={currentPage === 1} onClick={handlePrevPage}>prev</button>
          {pageCount.map((page, index) => (
            <button className="pag-button" key={index} style={{ backgroundColor: page === currentPage ? "#ccc" : "", color: page === currentPage ? "white" : "black" }} onClick={() => handlePageClick(page)}>{page}</button>
          ))}
          <button className="pag-button" disabled={currentPage === totalPage} onClick={handleNextPage}>next</button>
        </div>
      )}
    </div>
  );
};

export default Home;
