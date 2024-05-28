import React, { useContext, useState, useEffect } from "react"; // Add useEffect import
import axios from "axios";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom"; // Correct import for useNavigate

const PlaceOrder = () => {
  const { getTotalCartAmount, token, item_List, cartItems, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    state: "",
    city: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    console.log("Placing order...");

    let orderItems = [];
    item_List.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20,
    };

    console.log("Order Data:", orderData);
    console.log("API URL:", url);

    try {
      console.log("Token:", token);
      if (!token) {
        alert("No token found. Please login.");
        return;
      }

      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use Authorization header for token
        },
      });
      console.log("Response:", response.data);
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert(response.data.message || "Error Occurred");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [navigate, getTotalCartAmount]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <input
          required
          name="city"
          onChange={onChangeHandler}
          value={data.city}
          type="text"
          placeholder="City"
        />
        <input
          required
          name="state"
          onChange={onChangeHandler}
          value={data.state}
          type="text"
          placeholder="State"
        />
        <div className="multi-field">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone Number"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>GHS{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Shipping Fee</p>
              <p>GHS{getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                GHS{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
