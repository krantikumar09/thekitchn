import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvided = (props) => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const rupeeSign = `&#8377;`;
  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState();
  const [foodList, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    token &&
      (await axios.post(
        API_URL + "/api/cart/add",
        { itemId },
        { headers: { token } }
      ));
  };

  const removeFromCart = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    token &&
      (await axios.post(
        API_URL + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      ));
  };

  const getTotalCartAmount = (itemId) => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const res = await axios.get(`${API_URL}/api/food/list`);
    setFoodList(res.data.data);
  };

  const loadCartData = async (token) => {
    const res = await axios.post(
      API_URL + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItem(res.data.cartData);
  };


  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }

    loadData();
  }, [foodList]);

  const contextValue = {
    API_URL,
    rupeeSign,
    foodList,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvided;
