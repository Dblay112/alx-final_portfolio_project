import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, item_List, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const renderCartItems = () => {
    return item_List.map((item) => {
      if (cartItems[item._id] > 0) {
        return (
          <div key={item._id} className="cart-items-title cart-items-item">
            <img src={`${url}images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>GHS{item.price}</p>
            <p>{cartItems[item._id]}</p>
            <p>GHS{item.price * cartItems[item._id]}</p>
            <p onClick={() => removeFromCart(item._id)} className="cross">
              x
            </p>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {item_List.length > 0 ? (
          renderCartItems()
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
      <div className="cart-bottom">
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
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a discount or promocode, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code/ discount code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
