import React, { useEffect, useState } from "react";
import Food from "@/components/food/Food";
import SortNFilter from "@/components/ui/PageDashboard/SortNFilter";
import { useLocation, useParams } from "react-router-dom";

function CategoryPage() {
  const { foodType } = useParams();
  const location = useLocation();
  const passedFoodType = location.state?.foodType || null;
  // console.log("food:",foodType)
  const [selectedFoodType, setSelectedFoodType] = useState(passedFoodType);
  const [sliderValue, setSliderValue] = useState([]);

  useEffect(() => {
    if (passedFoodType) {
      setSelectedFoodType(passedFoodType);
    } else if (foodType) {
      setSelectedFoodType({ typeId: foodType });
    }
  }, [foodType, passedFoodType]);

  // console.log("Selected Food Type:", selectedFoodType);
  return (
    <section className="rounded-xl mx-5 h-full mt-20 min-w-md">
      <div className="shopInfo">
        <div className="relative bg-center w-full bg-contain h-[500px] bg-[url('https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] rounded-xl flex lg:pl-24 md:pl-8 sm:pl-0">
          <div className="w-fit flex flex-col items-center py-40 sm:mx-5">
            {/* Shop Info */}
            <div className="userInfo flex flex-col md:flex-row px-8 items-center bg-white rounded-xl ">
              <div className="icon pt-10">
                <div className="profilePic bg-[url('https://www.foody.vn/style/images/logo/foody-vn.png')]  bg-contain bg-no-repeat lg:w-[200px] lg:h-[100px] w-[100px] h-[50px]  rounded-lg "></div>
              </div>

              <div className="information px-8 text-center md:text-left">
                <h1 className="text-orange-600 font-semibold text-lg">Foody Restaurant</h1>
                <h2>Tran Phu, Ho Chi Minh City</h2>
              </div>
              <div className="jobs text-center md:text-left px-8">
                <h2>email</h2>
                <h2>itbasement@gmail.com</h2>
              </div>
            </div>
            {/* Navigation back */}
            {/* <div className="flex space-x-2 mt-4">
              <h1 className='text-primary-color'>Home <span>/</span></h1>
              <h1 className='text-red-600'>Shop</h1>
            </div> */}
          </div>
        </div>
      </div>
      <div className="shopItemSection mt-10 bg-theme-color rounded-lg h-full ">
        <div className="shopItemList flex justify-between gap-5">
          <SortNFilter setSelectedFoodType={setSelectedFoodType} setMaxPrice={setSliderValue} />
          <div className="rightItemsList bg-white p-5 m-5 w-full h-full border border-gray-300 shadow-lg">
            <Food selectedFoodType={selectedFoodType} sliderValue={sliderValue} /> {/* Pass selectedFoodType */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryPage;
