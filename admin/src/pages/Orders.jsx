import { useState } from "react";
import axios from "axios";
import Heading from "../components/Heading";
import { API_URL } from "../App";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../assets/assets";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/order/list-admin`, {});

      res.data.success ? setOrders(res.data.data) : toast(res.data.message);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
      toast("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="space-y-4">
      <Heading heading="All Orders" />

      {orders.map((order, index) => {
        return (
          <div
            key={index}
            className="w-full p-4 flex flex-col md:flex-row items-start gap-4 border rounded-md shadow-sm"
          >
            <div>
              <img
                width="40px"
                height="40px"
                src={assets.food_delivery_icon}
                alt="delivery icon"
              />
            </div>

            <div className="w-full flex items-start justify-between flex-col md:flex-row">
              <div className="">
                <p className="mb-4 font-fontOpenSans font-normal text-sm md:text-base text-textColor-body">
                  Order ID: {order._id}
                </p>
                {order.items.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className="font-fontOpenSans font-medium text-sm md:text-base text-textColor-heading leading-relaxed mb-2"
                    >
                      {item.name}{" "}
                      <span className="text-textColor-body">
                        x {item.quantity}
                      </span>
                    </p>
                  );
                })}
                <hr className="my-4" />
                <p className="font-fontOpenSans font-medium text-sm md:text-base text-textColor-heading">
                  {order.address.firstName} {order.address.lastName} <br />
                  <span className="text-textColor-body">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state}, {order.address.country} -{" "}
                    {order.address.zipCode} <br />
                    {order.address.phone}
                  </span>
                </p>
              </div>

              <hr className="my-4 md:hidden" />

              <p className="mb-4 md:mb-0 font-fontOpenSans font-medium text-sm md:text-base text-textColor-body">
                Items:{" "}
                <span className="text-textColor-heading font-semibold">
                  {order.items.length}
                </span>
              </p>
              <p className="mb-4 md:mb-0 font-fontOpenSans font-bold text-sm md:text-base text-textColor-heading">
                Total: &#8377; {order.amount}
              </p>

              <div className="max-w-[160px]">
                <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Food Processing">
                        Food Processing
                      </SelectItem>
                      <SelectItem value="Our for delivery">
                        Our for delivery
                      </SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
