import { Routes, Route } from 'react-router-dom';
import SubComponent from './components/SubComponent';
import ClassBasedComponent from './components/ClassBasedComponent';
import FunctionalComponent from './components/FunctionalComponent';
import ConditionalRendering from './components/ConditionalRendering';
import List from './components/List';
import CounterApp from './components/CounterApp';
import Form from './components/Form';
import RegistrationForm from './components/RegistrationForm';
import ClickCounterHOC from './components/ClickCounterHOC';
import HoverCounterHOC from './components/HoverCounterHOC';
import RenderProps from './components/RenderProps';
import Counter from './components/Counter';
import ClickCounterRP from './components/ClickCounterRP';
import HoverCounterRP from './components/HoverCounterRP';
import CourseContext from './components/context/courseContext';
import ComponentOne from './components/ComponentOne';
import UseEffectComponent from './components/UseEffect';
import Timer from './components/Timer';
import Posts from './components/Posts';
import UseCallback from './components/UseCallback';
import UseMemo from './components/UseMemo';
import UseRef from './components/UseRef';
import UseReducer from './components/UseReducer';
import ComplexCounter from './components/ComplexCounter';
import PostListWithoutReducer from './components/PostListWithoutReducer';
import PostListWithReducer from './components/PostListWithReducer';
import PostListWithCustomHook from './components/PostListWithCustomHook';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Navbar from './components/Navbar';
import OrderConfirmation from './components/pages/OrderConfirmation';
import NotFound from './components/pages/NotFound';
import PostList from './components/pages/PostList';
import PostDetail from './components/pages/PostDetail';
import HotPosts from './components/pages/HostPosts';
import ProductList from './components/pages/ProductList';
import FeaturedProducts from './components/pages/FeaturedProducts';
import NewProducts from './components/pages/NewProducts';
// import './App.css';
import CssStyle from './components/CssStyle';

function App() {
  return (
    <>
      <h1>React App</h1>
      {/* <SubComponent text="this is props">
        This is a sub component children.
      </SubComponent>
      <ClassBasedComponent text="this is props">
        This is a class-based component children.
      </ClassBasedComponent>
      <FunctionalComponent />
      <ConditionalRendering /> */}
      {/* <List /> */}
      {/* <CounterApp /> */}
      {/* <Form /> */}
      {/* <RegistrationForm /> */}
      {/* <ClickCounterHOC />
      <HoverCounterHOC /> */}
      {/* <RenderProps render={(arg) => <p>{arg}</p>} /> */}
      {/* <Counter render={(counter, handleIncrement) => <ClickCounterRP counter={counter} handleIncrement={handleIncrement} />} />
      <Counter render={(counter, handleIncrement) => <HoverCounterRP counter={counter} handleIncrement={handleIncrement} />} /> */}
      {/* <CourseContext.Provider value={{ course: 'React Course' }}>
        <ComponentOne />
      </CourseContext.Provider> */}
      {/* <UseEffectComponent /> */}
      {/* <Timer /> */}
      {/* <Posts /> */}
      {/* <UseCallback /> */}
      {/* <UseMemo /> */}
      {/* <UseRef /> */}
      {/* <UseReducer /> */}
      {/* <ComplexCounter /> */}
      {/* <PostListWithoutReducer /> */}
      {/* <PostListWithReducer /> */}
      {/* <PostListWithCustomHook /> */}
      {/* <CssStyle /> */}

      {/* React Router */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/hot" element={<HotPosts />} />
        <Route path="/products" element={<ProductList />}>
          <Route path="featured" element={<FeaturedProducts />} />
          <Route path="new" element={<NewProducts />} />
        </Route>
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
