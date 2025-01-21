import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Button } from "@/components/ui/button";

const OrderCancel = () => {
    const navigate = useNavigate();
  return (
    <div>
          <img
            className="mx-auto"
            width="140px"
            height="140px"
            src={assets.order_cancel}
            alt="success GIF"
          />
          <h3 className="mt-4 mb-2 heading4">Payment Failed!</h3>
          <p className="body-text mb-4">Plase try again.</p>
          <Button onClick={() => navigate('/')}>Home</Button>
        </div>
  )
}

export default OrderCancel