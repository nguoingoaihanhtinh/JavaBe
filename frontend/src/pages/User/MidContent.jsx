import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/components/authProvider/AuthProvider";
import ratingApi from "@/apis/ratingApi";
import { ReviewCard } from "@/components/Review/ReviewCard";
import foodApi from "@/apis/foodApi";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";

const MidContent = ({ setReviewCount }) => {
  const { userData } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [foods, setFoods] = useState([]);
  const [total, setTotal] = useState(4);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserRatings = async () => {
      try {
        const response = await ratingApi.getRatingByUserId(userData.userId, page, 4);
        if (response.status === "success" && Array.isArray(response.data)) {
          setRatings(response.data); // Set the ratings from the response
          setTotal(response.pagination.totalItems);
          setReviewCount(response.pagination.totalItems);
        } else {
          setRatings([]); // Set to an empty array if the data is not an array
          setReviewCount(0);
        }
      } catch (error) {
        console.error("Failed to fetch user ratings:", error);
      }
    };

    if (userData && userData.userId) {
      fetchUserRatings();
    }
  }, [userData, page, setReviewCount]);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      const uniqueFoodIds = [...new Set(ratings.map((rating) => rating.foodId))]; // Get unique food IDs

      const foodData = {};
      for (const foodId of uniqueFoodIds) {
        try {
          const response = await foodApi.getFoodbyId(foodId);
          if (response.status === "success") {
            foodData[foodId] = response.data;
          }
        } catch (error) {
          console.error(`Failed to fetch food details for ID ${foodId}:`, error);
        }
      }

      setFoods(foodData); // Update state with the fetched food details
    };

    if (ratings.length > 0) {
      fetchFoodDetails(); // Only fetch if ratings exist
    }
  }, [ratings]);
  const handleCardClick = (foodId) => {
    navigate(`/detail/${foodId}`); // Adjust the path according to your routing
  };

  return (
    <div className="my-5">
      {ratings.length > 0 ? (
        ratings.map((rating) => {
          const food = foods[rating.foodId] || {}; // Lookup food details by foodId
          return (
            <div key={rating.ratingId} onClick={() => handleCardClick(rating.foodId)}>
              {/* Handle click event */}
              <ReviewCard
                img={food.image1 || ""} // Assuming the food object has an imageUrl property
                name={food.name || "Unknown Food"} // Assuming the food object has a name property
                rating={rating.ratingValue} // Assuming this is the correct field
                content={rating.content}
                price={food.price || "N/A"} // Assuming the food object has a price property
              />
            </div>
          );
        })
      ) : (
        <p>No reviews found.</p>
      )}
      <div className="w-full flex justify-center mt-5">
        <Pagination
          className="items-center"
          onChange={(page) => {
            setPage(page);
          }}
          total={total}
          defaultCurrent={1}
          pageSize={4}
        />
      </div>
    </div>
  );
};

export default MidContent;
