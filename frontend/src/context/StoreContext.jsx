import React, { createContext, useEffect, useState } from "react";
//import { food_list } from "../assets/assets";
import axios from "axios";
import useAxiosPrivate from "../hooks/useAxios.js";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  //const url = "https://cravex-a-food-app-backend.onrender.com";

  const url = "http://localhost:3200";

  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  //featch good list
  const fetchFoodLists = async () => {
    const response = await axiosPrivate.get(url + "/api/food/list");
    setFoodList(response.data?.data);
  };

  // fetch Cart Details
  const fetchCartItems = async (token) => {
    const response = await axiosPrivate.get(url + "/api/cart/list");
    setCartItems(response.data.cartData);
  };

  //get token from localStorage
  useState(() => {
    async function loadData() {
      await fetchFoodLists();
      if (localStorage.getItem("tokenCraveX")) {
        setToken(localStorage.getItem("tokenCraveX"));
        await fetchCartItems(localStorage.getItem("tokenCraveX"));
      }
    }
    loadData();
  }, []);

  //Cart Count handler
  const addToCart = async (itemId) => {
    console.log(itemId);

    if (token) {
      try {
        const res = await axiosPrivate.post(url + "/api/cart/add", { itemId });
        await fetchCartItems(token);
      } catch (error) {
        console.log(error);
      }
    }

    // if (!cartItems[itemId]) {
    //   setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    // } else {
    //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    // }
  };

  //remove from cart
  const removefromCart = async (itemId) => {
    if (token)
      await axios
        .put(
          url + "/api/cart/remove",
          { itemId },
          { headers: { authorization: token } }
        )
        .then(async (res) => {
          await fetchCartItems(token);
        });

    // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalAmt = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let foodDetails = food_list.find((food) => food._id === item);
      totalAmount += foodDetails.price * cartItems[item];
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removefromCart,
    getTotalAmt,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
