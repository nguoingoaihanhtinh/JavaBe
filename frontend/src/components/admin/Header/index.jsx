import React, { useEffect, useState } from 'react';
import DropdownUser from './DropdownUser';
import { NavLink, useLocation } from 'react-router-dom';
import useDebounce from '@/hooks/useDebounce';
import NotiAdmin from './notiAdmin';
import { FaBell } from 'react-icons/fa';

const Header = (props) => {
  const location = useLocation();
  const { pathname } = location;
  const [name,setName]=useState('Dashboard')
  const [notiopen, setNotiOpen] = useState(false);
  const debounceNotiOpen = useDebounce(notiopen, 300);
  
  useEffect(()=>{
    if(pathname.includes('type'))
    {
      setName('Food Type Management')
    }
    if(pathname=='/admin')
    {
      setName('Dashboard')
    }
    if(pathname=='/admin/food')
    {
      setName('Food Management')
    }
    if(pathname=='/admin/bill')
    {
      setName('Bill Management')
    }
    if(pathname=='/admin/customer')
    {
      setName('Customer Management')
    }
  },[pathname])
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle BTN */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        <div>
          <p className='text-2xl text-[#395aff] font-bold'>{name}</p>
        </div>
        <div className="relative ml-auto" onMouseEnter={() => setNotiOpen(true)} onMouseLeave={() => setNotiOpen(false)}>
          <div className=" px-3 py-3 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer transition-all">
            <FaBell />
          </div>
          {debounceNotiOpen && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2  w-[250px] bg-white shadow-md rounded-md z-50">
              <NotiAdmin />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
          </ul>

          {/* User Area */}
          <DropdownUser />
          {/* User Area */}
        </div>
      </div>
    </header>
  );
};

export default Header;
