import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/item/list`);
      console.log("API Response:", response.data); // Log the full response data
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      console.error("Error fetching list", error);
      toast.error("Error fetching list");
    }
  };

  const removeItem = async (itemId) => {
    console.log(itemId);
    const response = await axios.post(`${url}/api/item/remove`, { id: itemId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error Occured Removing Item");
    }
  };

  useEffect(() => {
    fetchList();
  }, [url]);

  return (
    <div className="list add flex-col">
      <p>All Ware List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          console.log("Item:", item); // Log each item
          const imageUrl = `${url}/images/${item.image}`;
          console.log("Image path:", imageUrl); // Log the constructed image URL
          return (
            <div key={index} className="list-table-format">
              <img src={imageUrl} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>GHS{item.price}</p>
              <p onClick={() => removeItem(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
