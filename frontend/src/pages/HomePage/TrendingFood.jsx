import foodApi from "@/apis/foodApi";
import FoodCard from "@/components/food/FoodCard";
import { Pagination } from "antd";
import { useEffect, useState } from "react";

import { FaAngleRight } from "react-icons/fa6";

export default function TrendingFood() {
  const [foods,setFood] = useState([]);
  const [total,setTotal] = useState(4)
  const [page,setPage] = useState(1)
  const getNewestFoods = async () => {
    const response = await foodApi.getNewestFood(page,4)
    console.log(response.data)
    if(response.status === "success"){
      setFood(response.data);
      setTotal(response.pagination.totalItems)
    }
  }
  useEffect(() => {
    getNewestFoods();
  },[page]) 
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <header className="font-serif text-4xl font-medium my-4 text-blue-950">
          Trending Orders
        </header>
        <div className="group flex items-center gap-4 cursor-pointer">
          <p className="font-semibold group-hover:underline transition-all">
            View all
          </p>
          <div className="px-2 py-2 rounded-full cursor-pointer group-hover:bg-orange-600 transition-all bg-primary-color text-white">
            <FaAngleRight className="text-lg" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 space-x-4 mt-4">
        {foods.map((el, idx) => {
          return (
            <FoodCard
              key={idx}
              img={
                el.image1
              }
              id={el.foodId}
              title={el.name}
              description={"Burger King"}
              price={el.price}
            />
          );
        })}
      </div>
      <div className="w-full flex justify-center mt-5">
        <Pagination onChange={(page) => {
          setPage(page)
        }} total={total} defaultCurrent={1} pageSize={4}/>
      </div>
    </div>
  );
}
