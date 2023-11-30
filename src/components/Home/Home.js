import React, { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import Explore from "../Explore/Explore";


const Home = () => {

  const [categoryData, setCategoryData] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?skip=5&limit=5");
        const responseJson = await response.json();
        setCategoryData(responseJson.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="home">
      <Banner />
      {categoryData &&
        categoryData.map((item, index) => (
          item && <Explore key={item.id} category={item} left={index % 2} />
        ))}
    </div>
  );
};

export default Home;
