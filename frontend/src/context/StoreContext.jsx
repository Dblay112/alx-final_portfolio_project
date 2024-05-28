import { createContext, useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // Initialize cartItems from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [item_List, setItemList] = useState([]);

  // Persist cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = item_List.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchItemList = async () => {
    try {
      const response = await axios.get(url + "/api/item/list");
      setItemList(response.data.data);
    } catch (error) {
      console.error("Error fetching item list:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchItemList(); // Fetch item list
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken); // Set token if it exists
      }
    }
    loadData();
  }, []);

  const contextValue = {
    item_List,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
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
