import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const CartTotal = () => {

    const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <>
      <div className="flex items-center justify-between border-b py-2">
        <p className="body-text">Subtotal</p>
        <p className="body-text">&#8377; {getTotalCartAmount()}</p>
      </div>

      <div className="flex items-center justify-between border-b py-2">
        <p className="body-text">Delivery Fee</p>
        <p className="body-text">&#8377; {getTotalCartAmount() === 0 ? 0 : 40}</p>
      </div>

      <div className="flex items-center justify-between py-2">
        <p className="text-sm font-bold  text-textColor-heading">Total</p>
        <p className="text-sm text-textColor-heading font-bold">&#8377; {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</p>
      </div>
    </>
  );
};

export default CartTotal;
