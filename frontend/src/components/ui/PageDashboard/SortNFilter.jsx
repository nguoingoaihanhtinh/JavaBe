import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import foodApi from "@/apis/foodApi";
import PopularFood from "./PopularFood";
import toast from "react-hot-toast";

const SortNFilter = ({ setSelectedFoodType, setMaxPrice }) => {
  // Destructure props correctly
  const [sliderValue, setSliderValue] = useState([100000, 300000]);
  const [foodTypes, setFoodTypes] = useState([]);

  useEffect(() => {
    const fetchFoodTypes = async () => {
      try {
        const response = await foodApi.getAllFoodTypes();
        // console.log('Fetched food types:', response);
        if (response.data && Array.isArray(response.data)) {
          setFoodTypes(response.data);
        } else {
          console.error("Food types is not an array:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch food types:", error);
      }
    };

    fetchFoodTypes();
    setMaxPrice(100000);
  }, [setMaxPrice]);
  const handleSlider = (value) => {
    setSliderValue(value);
    setMaxPrice(value);
  };
  return (
    <div className="leftUtils w-1/4 flex flex-col gap-3 h-full ml-5">
      {/* Search By Type Section */}
      <div className="searchByType text-center w-full bg-white mt-5 items-center rounded-md">
        <h1 className="mt-2 border-b-red-700 border-b-2 w-full text-center">Search</h1>
        <div className="search-grid grid grid-cols-2 md:grid-cols-2 grid-rows-2 gap-4 p-4">
          <Button
            className="bg-light-them-color hover:bg-orange-300 text-black hover:scale-105"
            onClick={() => setSelectedFoodType(null)} // Set to null for "All"
          >
            All
          </Button>
          {foodTypes.map((type) => (
            <Button
              key={type.typeId}
              className="bg-light-them-color hover:bg-orange-300 text-black hover:scale-105 w-full text-ellipsis overflow-hidden whitespace-nowrap"
              onClick={() => setSelectedFoodType(type)} // Pass the selected type
            >
              {type.nameType}
            </Button>
          ))}
        </div>
      </div>

      {/* Filter by Price Section */}
      <div className="filterByPrice text-center w-full bg-white mt-5 items-center rounded-md pb-5">
        <h1 className="mt-2 border-b-red-700 border-b-2 w-full text-center">Filter by price</h1>
        <div className="priceSlider">
          <Slider
            className="progress py-2 px-2 text-black"
            defaultValue={[100000]}
            max={300000}
            step={10000}
            onValueChange={handleSlider}
          />
        </div>
        <div className="flex justify-between mt-2 px-5">
          <span>From: 0đ</span>
          <span>To: {sliderValue[0]}đ</span>
        </div>
      </div>

      <div className="trending text-center w-full bg-white mt-5 items-center rounded-md h-full">
        <h1 className="mt-2 border-b-red-700 border-b-2 w-full text-center">Popular dishes</h1>
        <PopularFood />
      </div>
    </div>
  );
};

export default SortNFilter;
