import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  }

  return (
    <div className="order-confirmation">
      <h2>Thank You for Your Order!</h2>
      <button onClick={handleGoBack}>Go back</button>
    </div>
  );
}

export default OrderConfirmation;