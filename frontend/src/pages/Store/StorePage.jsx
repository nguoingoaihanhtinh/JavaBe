import Food from '@/components/food/Food';
import { Button } from '@/components/ui/button'
import SortNFilter from '@/components/ui/PageDashboard/SortNFilter';
import { Slider } from '@/components/ui/slider'
import React, { useState } from 'react'


function StorePage() {
  return (
    <section className='rounded-xl mx-5 h-full mt-20 min-w-md'>
        <div className="shopInfo">
            <div className="relative bg-center w-full bg-cover h-[500px] bg-[url('https://t3.ftcdn.net/jpg/02/05/03/96/360_F_205039646_r2ddysNHjVE5HFJUQnMS6UcgqYgjQ0H8.jpg')] rounded-xl flex lg:pl-24 md:pl-8 sm:pl-0">
                <div className="w-fit flex flex-col items-center py-40 sm:mx-5">
                    {/* Shop Info */}
                    <div className="userInfo flex flex-col md:flex-row px-8 items-center bg-white rounded-xl">
                    <div className="profilePic bg-[url('https://thietkelogo.mondial.vn/wp-content/uploads/2024/03/burger-king-vector.jpg')] lg:w-[150px] lg:h-[150px] w-[100px] h-[100px] bg-cover rounded-full"></div>
                    <div className="information px-8 text-center md:text-left">
                        <h1 className="text-orange-600 font-semibold">Burger King</h1>
                        <h2>Tran Phu, Ho Chi Minh City</h2>
                    </div>
                    <div className="jobs text-center md:text-left px-8">
                        <h1>Ui/Ux Designer</h1>
                        <h2>hello@gmail.com</h2>
                        <h2>email</h2>
                    </div>
                    </div>
                    {/* Navigation back */}
                    <div className="flex space-x-2 mt-4">
                    <h1 className='text-primary-color'>Home <span>/</span></h1>
                    <h1 className='text-red-600'>Shop</h1>
                    </div>
                </div>
            </div>
        </div>
        <div className="shopItemSection mt-10 bg-theme-color rounded-lg h-full ">
            <div className="shopItemList flex justify-between gap-5">
                    <SortNFilter />
                <div className="rightItemsList bg-white p-5 m-5 w-full h-full border border-gray-300 shadow-lg">
                    <Food/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default StorePage