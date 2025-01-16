import React, { useState } from "react";
import Hero from "../components/Hero";
import ExploreMenu from "../components/ExploreMenu";
import FoodDisplay from "../components/FoodDisplay";
import Newsletter from "../components/Newsletter";

const Home = () => {

  const [category, setCategory] = useState("All");
  
  return (
    <>
      <Hero/>
      <div className="container">
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
      </div>
      <Newsletter/>
    </>
  );
};

export default Home;
