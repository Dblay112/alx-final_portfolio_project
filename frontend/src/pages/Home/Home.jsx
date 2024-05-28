import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Navbar/Header/Header";
import ExploreShop from "../../components/ExploreShop/ExploreShop";
import ItemDisplay from "../../components/ItemDisplay/ItemDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreShop category={category} setCategory={setCategory} />
      <ItemDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
