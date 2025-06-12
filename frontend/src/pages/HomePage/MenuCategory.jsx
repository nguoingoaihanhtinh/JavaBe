import foodApi from "@/apis/foodApi";
import FoodCard from "@/components/food/FoodCard";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
const types = ["All","Vietnamese Noodles", "Rice Dishes", "Soups", "Desserts", "Seafood"];
export default function MenuCategory() {
  const [typeSlt, setTypeSlt] = useState(0);
  const [foods, setFood] = useState([]);
  const [total,setTotal] = useState(4)
  const [page,setPage] = useState(1)
  const getAllFoods = async () => {
    const response = await foodApi.getAllFood(page,4,types[typeSlt])
    console.log(response.data)
    if(response.status === "success"){
      setFood(response.data);
      setTotal(response.pagination.totalItems)

    }
  }
  useEffect(() => {
    getAllFoods();
  },[typeSlt,page]) 
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <header className="font-serif text-4xl font-medium my-4 text-blue-950">
          Menu category
        </header>
        <Link to="/category">
        <div className="group flex items-center gap-4 cursor-pointer">
          <p className="font-semibold group-hover:underline transition-all">
            View all
          </p>
          <div className="px-2 py-2 rounded-full cursor-pointer group-hover:bg-orange-600 transition-all bg-primary-color text-white">
            <FaAngleRight className="text-lg" />
          </div>
        </div>
        </Link>
      </div>
      <div className="flex gap-2">
        {types.map((el, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                setTypeSlt(idx)
                setPage(1)
              }}
              className={`${
                idx === typeSlt
                  ? "bg-primary-color text-white transition-all border-primary-color"
                  : "hover:bg-primary-color hover:text-white transition-all hover:border-primary-color"
              } px-4 py-2 rounded-full border-[1px] cursor-pointer `}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div className=""></div>
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
              description={el.description}
              price={el.price}
            />
          );
        })}
      </div>
      <div className="w-full flex justify-center mt-5">
        <Pagination className="items-center" onChange={(page) => {
          setPage(page)
        }} total={total} defaultCurrent={1} pageSize={4}/>
      </div>
    </div>
  );
}
