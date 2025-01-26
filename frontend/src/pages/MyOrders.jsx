import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import SectionHeading from "../components/SectionHeading";
import { assets } from "../assets/assets";
import { Button } from "@/components/ui/button";

const MyOrders = () => {
  const { API_URL, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.post(
      `${API_URL}/api/order/userorders`,
      {},
      { headers: { token } }
    );

    if (res.data.success) {
      setData(res.data.data);
      console.log(res.data.data);
    } else {
      toast(res.data.message);
    }
  };

  // formate date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token, data]);

  return (
    <section className="myorders page-margin">
      <div className="container space-y-4">
        <SectionHeading heading="My Orders" />
        {data.map((order, index) => {
          return (
            <div
              key={index}
              className="p-4 border rounded-md shadow-sm space-y-4"
            >
              <div className="flex items-start gap-2 sm:gap-4">
                <img
                  width="40px"
                  src={assets.delivery_man}
                  alt="delivery man"
                />

                <div>
                  <p className="font-fontOpenSans font-medium text-xs sm:text-sm text-textColor-heading leading-relaxed">
                    Order: {order._id}
                  </p>
                  <p className="font-fontOpenSans font-normal text-xs sm:text-sm text-textColor-body">
                    {formatDate(order.date)}
                  </p>
                </div>
              </div>

              <hr />

              {order.items.map((item, index) => {
                return (
                  <p
                    key={index}
                    className="font-fontOpenSans font-medium text-sm sm:text-base text-textColor-heading leading-none"
                  >
                    <span className="text-textColor-body">
                      {item.quantity} x
                    </span>{" "}
                    {item.name}
                  </p>
                );
              })}
              <hr />
              <div className="flex items-center justify-between">
                <p className="font-fontOpenSans font-medium text-sm sm:text-base text-textColor-link">
                  {order.status}
                </p>
                <p className="font-fontOpenSans font-bold text-base sm:text-xl text-textColor-heading">
                  &#8377; {order.amount}
                </p>
              </div>

              <div className="w-full text-right">
                <Button onClick={fetchOrders} variant="outline" size="sm">
                  Track Order
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyOrders;
