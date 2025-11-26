import React, { createContext, useEffect, useState } from "react";
//import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  //featch good list
  const fetchFoodLists = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  //get token from localStorage
  useState(() => {
    async function loadData() {
      await fetchFoodLists();
      if (localStorage.getItem("tokenCraveX")) {
        setToken(localStorage.getItem("tokenCraveX"));
      }
    }
    loadData();
  }, []);

  //Cart Count handler
  const addToCart = async (itemId) => {
    await axios
      .post(url + "/api/cart/add", itemId, { headers: token })
      .then((res) => {
        console.log(res);
      });

    // if (!cartItems[itemId]) {
    //   setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    // } else {
    //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    // }
  };

  //remove from cart
  const removefromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
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
