import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import OrderSuccess from "../components/OrderSuccess";
import OrderCancel from "../components/OrderCancel";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const { API_URL } = useContext(StoreContext);
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    const res = await axios.post(`${API_URL}/api/order/verify`, {
      success,
      orderId,
    });
    
    if (res.data.success) navigate('/myorder')

    // if (res.data.success) {
    //   setTimeout(() => {
    //     navigate("/myorder");
    //   }, 1000);
    // } else {
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 1000);
    // }
  };

  useEffect(() => {
    verifyPayment();
  }, [success]);

  return (
    <section className="min-h-[84vh] w-full flex items-center justify-center">
      <div className="container text-center">
        {success === "true" ? (
          <OrderSuccess orderid={orderId} />
        ) : (
          <OrderCancel/>
        )}
      </div>
    </section>
  );
};

export default Verify;
