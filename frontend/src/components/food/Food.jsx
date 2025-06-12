import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import foodApi from "@/apis/foodApi";
import { Pagination } from "antd";

const Food = ({ selectedFoodType, sliderValue, searchQuery, setSearchQuery }) => {
  const [foods, setFood] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const itemsPerPage = 12;
  // console.log("price",sliderValue)
  const getAllFoods = async () => {
    try {
      const response = await foodApi.getAllFood(page, itemsPerPage, selectedFoodType?.nameType); // Pass selectedFoodType
      if (response.status === "success") {
        setFood(response.data);
        setTotal(response.pagination.totalItems);
      }
    } catch (error) {
      console.error("Failed to fetch food items:", error);
    }
  };
  useEffect(() => {
    // console.log("food", foods);
  }, [foods]);
  useEffect(() => {
    getAllFoods();
  }, [selectedFoodType, page, searchQuery]);

  const filteredFoods = foods.filter((food) => {
    const isWithinPriceRange = food.price <= sliderValue;
    const matchesSearchQuery = searchQuery ? food.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return isWithinPriceRange && matchesSearchQuery;
  });
  // useEffect(() => {
  //   setTotal(searchQuery ? filteredFoods.length : foods.length);
  // }, [filteredFoods, searchQuery, foods.length]);

  // Function to clear the search
  const clearSearch = () => {
    setSearchQuery("");
    setPage(1);
  };
  useEffect(() => {
    setPage(1);
  }, [selectedFoodType, searchQuery]);
  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
      <section data-aos="fade-up" className="container ">
        <div className="heading flex justify-between items-center">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold ">
            {searchQuery ? `Searched for "${searchQuery}"` : selectedFoodType ? selectedFoodType.nameType : "Best Food"}
          </h1>
          {searchQuery && (
            <button onClick={clearSearch} className="bg-red-500 text-white rounded px-3 py-1 mt-2 ml-2 h-[50px] mx-5">
              Cancel
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 transition-all duration-300 ease-in-out">
          {filteredFoods.map((el, idx) => {
            return (
              <FoodCard
                key={idx}
                img={el.image1}
                id={el.foodId}
                title={el.name}
                description={el.description}
                price={el.price}
              />
            );
          })}
        </div>
        <div className="w-full flex justify-center mt-5">
          <Pagination
            className="items-center"
            onChange={(page) => {
              setPage(page);
            }}
            total={total}
            current={page}
            pageSize={itemsPerPage}
          />
        </div>
      </section>
    </div>
  );
};

export default Food;
