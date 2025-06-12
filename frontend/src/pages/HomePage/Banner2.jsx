import React from "react";

export default function Banner2() {
  return (
    <div className="mt-12">
      <div
        className="relative h-[500px] w-full bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(https://gramentheme.com/html/fresheat/assets/img/bg/ctaBG1_1.jpg)`,
        }}
      >
        <div
          className="absolute right-[10%] top-[20%] h-[350px] w-[600px] bg-contain bg-no-repeat animate-swing"
          style={{
            backgroundImage: `url(https://gramentheme.com/html/fresheat/assets/img/cta/ctaThumb1_1.png)`,
          }}
        ></div>
        <div className="ml-[8%] pt-[5%]">
          <p className="text-red-600 my-8 text-3xl font-bold">
            WELCOME FRESHEAT
          </p>
          <p className="text-5xl my-8 font-extrabold text-white">
            TODAY SPACIAL FOOD
          </p>
          <p className="text-primary-color font-bold text-2xl">
            Limits Time Offer
          </p>
          <p className="cursor-pointer hover:bg-orange-700 transition-all px-4 py-3 rounded-full mt-4 text-sm bg-primary-color text-white inline-block">
            ORDER NOW
          </p>
        </div>
      </div>
    </div>
  );
}
