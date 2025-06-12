import React, { useContext, useState } from 'react'
import UserHeading from './UserHeading'
import { AuthContext } from '@/components/authProvider/AuthProvider'
import userApi from '@/apis/userApi';
import { useEffect } from 'react';
import foodApi from '@/apis/foodApi';
import FoodCard from '@/components/food/FoodCard';
import { Breadcrumb } from 'antd';

function FavoritePage() {
  const {userData} = useContext(AuthContext)
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const getFavoriteFood = async () => {
    try {
      const savedFoods = await userApi.getAllFoodSaved(userData.userId);
      // console.log("Fetched savedFoods:", savedFoods);
      if (savedFoods && Array.isArray(savedFoods.data)) {
        const foodDetailsPromises = savedFoods.data.map(food => foodApi.getFoodbyId(food.foodId));
        const foodDetails = await Promise.all(foodDetailsPromises);
        setFavorites(foodDetails);
        // console.log("Food details fetched:", foodDetails);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
};
useEffect(() => {
  // console.log("Updated favorites data:", favorites);
}, [favorites]); 
useEffect(()=>{
  if(userData.userId){
    // console.log("Fetching favorite food for user ID:", userData.userId);
    getFavoriteFood();
  }
},[userData])
const breadcrumbItems = [
  { title: 'Profile', href: '/profile' },
  { title: 'Favorite', href: '#' }, 
];
  return (
    <div className='bg-orange-200 rounded-xl mx-12 h-full'>
      <UserHeading />
      <div className="px-16 py-5 bg-white">
        <Breadcrumb
          className="font-semibold text-black"
          items={breadcrumbItems.map((item) => ({
              title: item.href ? <a href={item.href}>{item.title}</a> : item.title,
          }))}
        />
        <h2 className="text-xl font-bold text-center">Your Favorites</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          favorites.length > 0 ? (
            <div className="grid grid-cols-4 gap-5 mt-4 ">
              {favorites.map((el, idx) => (
                <FoodCard className="w-[100px]"
                  key={idx}
                  img={el.data.image1} // Accessing image1 from the data property
                  id={el.data.foodId} // Accessing foodId from the data property
                  title={el.data.name} // Accessing name from the data property
                  description={el.data.description} // Accessing description from the data property
                  price={el.data.price} // Accessing price from the data property
                />
              ))}
            </div>
          ) : (
            <p>You have no favorite items.</p>
          )
        )}
      </div>
    </div>
  );

}

export default FavoritePage