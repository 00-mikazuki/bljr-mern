import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import PrivateLayout from "./components/layout/PrivateLayout";
import PublicLayout from "./components/layout/PublicLayout";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CategoryList from "./pages/category/CategoryList";
import NewCategory from "./pages/category/NewCategory";
import UpdateCategory from "./pages/category/UpdateCategory";
import PostList from "./pages/post/PostList";
import DetailPost from "./pages/post/DetailPost";
import NewPost from "./pages/post/NewPost";
import UpdatePost from "./pages/post/UpdatePost";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/new" element={<NewCategory />} />
          <Route path="/categories/update/:id" element={<UpdateCategory />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<DetailPost />} />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="/posts/update/:id" element={<UpdatePost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App;
