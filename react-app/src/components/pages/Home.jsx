import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate("/order-confirmation");
  }

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={handlePlaceOrder}>Place order</button>
    </div>
  )
}

export default Home