import React, { useEffect, useState } from "react";
import foodApi from "@/apis/foodApi";
import { Link } from "react-router-dom";

const Category = () => {
  const [foodTypes, setFoodTypes] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchFoodTypes = async () => {
      try {
        const response = await foodApi.getAllFoodTypes();
        setFoodTypes(response.data);
        console.log("Fetched Food Types:", response.data);
      } catch (error) {
        console.error("Error fetching food types:", error);
      }
    };
    fetchFoodTypes();
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to="/category" className="cursor-pointer font-bold text-center">
        Categories
      </Link>
      {isHovered && (
        <div
          className="absolute top-full border bg-white shadow-lg rounded-md p-3 w-[600px] z-10 grid grid-cols-4 gap-2 text-center transform -translate-x-1/2 left-1/2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() =>
            setTimeout(() => {
              setIsHovered(false);
            }, 2000)
          }
        >
          {foodTypes.slice(0, 12).map((foodType) => (
            <Link
              key={foodType.typeId}
              to={`/category/${foodType.typeId}`}
              state={{ foodType }} // Pass the full object here
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-center"
            >
              {foodType.nameType}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
