import React, { useContext } from "react";
import "./ItemDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import WareItem from "../WareItem/WareItem";

const ItemDisplay = ({ category }) => {
  const { item_List } = useContext(StoreContext);

  return (
    <div className="ware-display" id="ware-display">
      <h2>Top Kitchen Ware for you</h2>
      <div className="ware-display-list">
        {item_List.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <WareItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          // Add a fallback return statement
          return null;
        })}
      </div>
    </div>
  );
};

export default ItemDisplay;
