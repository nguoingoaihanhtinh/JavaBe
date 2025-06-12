import React from "react";
import RatingLayout from "../ui/ratingLayout";
export const ReviewCard = ({ img, name, rating, content, price }) => {
  return (
    <div className="group flex flex-col xl:flex-row px-3 mx-5 sm:mx-10 items-center justify-between max-w-screen-md rounded-xl border my-3 hover:shadow-xl hover:cursor-pointer">
      {" "}
      {/* Vertical for small screens, horizontal for lg and above */}
      <div className="overflow-hidden flex-none">
        <div
          className="bg-contain bg-center w-36 h-36 sm:w-28 sm:h-28 rounded-full group-hover:opacity-90 "
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>
      <div className="space-y-2 p-3 flex-grow">
        <div className="items-center border-b border-blue-500">
          <h1 className="line-clamp-2 text-center font-bold text-2xl px-5 group-hover:text-blue-500">{name}</h1>
        </div>
        <div className="flex items-center gap-2 opacity-70 justify-center">
          <div className="px-5 rating flex justify-center items-center gap-3">
            <h1>{rating}</h1>
            <span>
              <RatingLayout rating={rating} />
            </span>
          </div>
          <div className="items-center justify-between py-3">
            <p className="text-xl font-bold text-primary">
              {price} d {/* Show "Not available" if price is falsy */}
            </p>
          </div>
        </div>
        <div className="review">
          <h1 className="text-center">Your Review:</h1>
          <p className="px-5">{content}</p>
        </div>
      </div>
    </div>
  );
};
