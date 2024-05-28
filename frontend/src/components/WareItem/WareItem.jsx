import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./WareItem.css";
import { StoreContext } from "../../context/StoreContext";

const WareItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  console.log(cartItems);

  return (
    <div className="ware-item">
      <div className="ware-item-img-container">
        <img
          className="ware-item-image"
          src={`${url}/images/${image}`}
          alt={name}
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to Cart"
          />
        ) : (
          <div className="ware-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove from Cart"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add to Cart"
            />
          </div>
        )}
      </div>
      <div className="ware-item-info">
        <div className="ware-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="ware-item-desc">{description}</p>
        <p className="ware-item-price">${price}</p>
      </div>
    </div>
  );
};

export default WareItem;
