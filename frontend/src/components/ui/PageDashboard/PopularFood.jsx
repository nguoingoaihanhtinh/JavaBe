import foodApi from '@/apis/foodApi';
import FoodCardHorizontal from '@/components/food/FoodCartHorizontal';
import React, { useEffect, useState } from 'react'

function PopularFood() {
    const [foods,setFood] = useState([]);
    const getNewestFoods = async () => {
      const response = await foodApi.getNewestFood(1,4)
    //   console.log(response.data)
      if(response.status === "success"){
        setFood(response.data);
      }
    }
    useEffect(() => {
      getNewestFoods();
    },[]) 
    return (
      <div className="mt-6">
        <div className="flex flex-col gap-5 m-3">
          {foods.map((el, idx) => {
            return (
              <FoodCardHorizontal className=""
                key={idx}
                img={
                  el.image1
                }
                id={el.foodId}
                title={el.name}
                price={el.price}
                rating={el.rating}
              />
            );
          })}
        </div>
      </div>
    );
}

export default PopularFood