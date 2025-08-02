import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";
import axios from "../../utils/axiosInstance";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);

        // API call to fetch categories
        const response = await axios.get(`/category?page=${currentPage}&size=${pageSize}&q=${searchQuery}`);
        const data = response.data.data;

        console.log(`/category?page=${currentPage}&size=${pageSize}&q=${searchQuery}`)
        console.log(data);

        setCategories(data.categories || []);
        setTotalPage(data.pagination.totalPages || 1);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        
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

  const handleDelete = async () => {
    try {
      setLoading(true);

      // API call to delete category
      const response = await axios.delete(`/category/${id}`);
      const data = response.data;

      setShowModal(false);
      setId(null);

      toast.success(data.message || "Category deleted successfully!", {
        position: "top-right",
        autoClose: true,
      });

      // API call to fetch categories
      const response2 = await axios.get(`/category?page=${currentPage}&size=${pageSize}&q=${searchQuery}`);
      const data2 = response2.data.data;

      setCategories(data2.categories || []);
      setTotalPage(data2.pagination.totalPages || 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setShowModal(false);
        
      const response = error.response;
      const data = response?.data || {};
      const message = data.message || "An error occurred while deleting the category";

      toast.error(message, {
        position: "top-right",
        autoClose: true,
      });
    }
  }

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
      <button className="button button-block" onClick={() => navigate("/categories/new")}>Add New Category</button>
      <h2 className="table-title">Category list</h2>
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

      {loading ? <div className="loading">Loading...</div> : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>{moment(category.createdAt).format("MMMM DD YYYY, HH:mm:ss")}</td>
                <td>{moment(category.updatedAt).format("MMMM DD YYYY, HH:mm:ss")}</td>
                <th>
                  <button className="button" onClick={() => navigate(`update/${category._id}`)}>Update</button>
                  <button className="button" onClick={() => {
                    setShowModal(true);
                    setId(category._id);
                  }}>Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPage > 1 && (
        <div className="pag-container">
          <button className="pag-button" disabled={currentPage === 1} onClick={handlePrevPage}>prev</button>
          {pageCount.map((page, index) => (
            <button className="pag-button" key={index} style={{ backgroundColor: page === currentPage ? "#ccc" : "", color: page === currentPage ? "white" : "black" }} onClick={() => handlePageClick(page)}>{page}</button>
          ))}
          <button className="pag-button" disabled={currentPage === totalPage} onClick={handleNextPage}>next</button>
        </div>
      )}

      <Modal show={showModal} onHide={() => {
        setShowModal(false);
        setId(null);
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <div style={{ margin: "0 auto" }}>
            <Button className="no-button" onClick={() => {
              setShowModal(false);
              setId(null);
            }}>No</Button>
            <Button className="yes-button" onClick={handleDelete}>Yes</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryList;
