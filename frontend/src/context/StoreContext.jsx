import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvided = (props) => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const rupeeSign = `&#8377;`;
  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState(null);
  const [foodList, setFoodList] = useState([]);

  // ✅ Add to Cart Function
  const addToCart = async (itemId) => {
    setCartItem((prevCart) => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await axios.post(
          `${API_URL}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Failed to update cart:", error);
      }
    }
  };

  // ✅ Remove from Cart Function (removes item completely if quantity reaches 0)
  const removeFromCart = async (itemId) => {
    setCartItem((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId]; // ✅ Removes item when quantity is 0
      }
      return newCart;
    });

    if (token) {
      try {
        await axios.post(
          `${API_URL}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    }
  };

  // ✅ Fix `getTotalCartItems()`: Counts only items with quantity > 0
  const getTotalCartItems = () => {
    return Object.values(cartItem).filter((qty) => qty > 0).length;
  };

  // ✅ Fix `getTotalCartAmount()`: Ensures item exists before accessing `price`
  const getTotalCartAmount = () => {
    return Object.entries(cartItem).reduce((total, [itemId, qty]) => {
      const item = foodList.find((product) => product._id === itemId);
      return item ? total + item.price * qty : total;
    }, 0);
  };

  // ✅ Fetch food list from API
  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/food/list`);
      setFoodList(res.data.data);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  // ✅ Load Cart Data Only if Token Exists
  const loadCartData = async (userToken) => {
    if (!userToken) return;
    try {
      const res = await axios.post(
        `${API_URL}/api/cart/get`,
        {},
        { headers: { token: userToken } }
      );
      setCartItem(res.data.cartData || {}); // ✅ Handles missing data
    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

  // ✅ Load data only ONCE (fixes infinite loop issue)
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }

    loadData();
  }, []); // ✅ Removed `foodList` from dependencies to prevent infinite re-fetching

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
    getTotalCartItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvided;
