import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Button } from "@/components/ui/button";

const OrderSuccess = ({ orderid }) => {
  const navigate = useNavigate();
  return (
    <div>
      <img
        className="mx-auto"
        width="140px"
        height="140px"
        src={assets.order_success}
        alt="success GIF"
      />
      <h3 className="mt-4 mb-2 heading4">Your order is placed!</h3>
      {orderid && <p className="body-text mb-4">Order ID: {orderid}</p>}
      <Button onClick={() => navigate("/myorder")}>My Orders</Button>
    </div>
  );
};

export default OrderSuccess;
