import React from 'react'
import backgroundImage from '@/assets/about.png'
import { Link } from 'react-router-dom';

export default function AboutPage() {
    const divStyle = {
        backgroundImage: `url(${backgroundImage})`,
      
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
  return (
    <div className='h-screen w-screen relative' style={divStyle}>
        <div className='absolute top-[30%] left-[9%]'>
            <p className='text-7xl font-bold text-orange-600'>Chào mừng</p>
            <p className='text-5xl mt-3 font-semibold'>đến với thế giới </p>
            <p  className='text-5xl font-semibold mt-1'>ẩm thực của chúng tôi.</p>
            <p className='ml-1'>Nơi có tất cả những món ăn bạn yêu thích.</p>
            <Link to={'/about'}>
            <button className='bg-primary-color p-2 rounded-[7px] mt-5 ml-1'>
                <p className='uppercase text-white font-bold'>Tìm hiểu thêm</p>
            </button>
            </Link>
        </div>

    </div>
  )
}       
