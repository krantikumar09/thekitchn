import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import SectionHeading from "../components/SectionHeading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { cartItem, food_list, removeFromCart, rupeeSign } =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <section className="cart-section section-margin">
      <div className="container">
        <SectionHeading heading="Cart" />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-28">Items</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {food_list.map((item, index) => {
              if (cartItem[item._id] > 0) {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        className="max-w-20 w-full h-auto object-cover rounded-md"
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                      />
                    </TableCell>
                    <TableCell className="font-bold text-textColor-heading">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-center">
                      &#8377; {item.price}
                    </TableCell>
                    <TableCell className="text-center">
                      {cartItem[item._id]}
                    </TableCell>
                    <TableCell className="text-center">
                      &#8377; {item.price * cartItem[item._id]}
                    </TableCell>
                    <TableCell
                      onClick={() => removeFromCart(item._id)}
                      className="text-center cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6 mt-16">
          <div className="md:col-span-7">
            <h2 className="heading2">Cart Totals</h2>

            <CartTotal />

            <Button
              className="mt-4"
              size="lg"
              onClick={() => navigate("/order")}
            >
              PROCEESED TO CHECKOUT
            </Button>
          </div>

          <div className="md:col-span-5">
            <p className="body-text">If you have a promo code, Enter it here</p>

            <div className="flex items-center space-x-2 mt-4">
              <Input type="text" placeholder="Promo code" />
              <Button className="bg-textColor-heading text-white hover:bg-textColor-heading/80">
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
