import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

axiosInstance.interceptors.request.use((req) => {
  const storedData = localStorage.getItem("blogData");

  if (storedData) {
    const blogData = JSON.parse(storedData);
    const token = blogData.token || null;
    
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export default axiosInstance;