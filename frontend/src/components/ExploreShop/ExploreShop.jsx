import React from "react";
import "./ExploreShop.css";
import { item_list, ware_items } from "../../assets/assets";

const ExploreShop = ({ category, setCategory }) => {
  return (
    <div className="explore-shop" id="explore-shop">
      <h1>Discover Your Perfect Kitchen Companion</h1>
      <p className="explore-shop-text">
        Discover a world of possibilities with our diverse selection of kitchen
        heroes
      </p>
      <div className="explore-shop-list">
        {ware_items.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.item_name ? "All" : item.item_name
                )
              }
              key={index}
              className="explore-shop-list-item"
            >
              <img
                className={category === item.item_name ? "active" : ""}
                src={item.item_image}
                alt={item.item_name}
              />
              <p>{item.item_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreShop;
