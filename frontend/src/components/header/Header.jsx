import { useContext, useState } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { FaArrowRightFromBracket, FaBell, FaCartShopping, FaCircleUser, FaRegRectangleList } from "react-icons/fa6";
import authApi from "@/apis/authApi";
import Category from "./Category";
import NotiCard from "../noti/NotiCard";
import useDebounce from "@/hooks/useDebounce";
export default function Header() {
  const [open, setOpen] = useState(false);
  const [notiopen, setNotiOpen] = useState(false);
  const debounceNotiOpen = useDebounce(notiopen, 300);
  const { setShowLoginModal, isLoggedIn, userData } = useContext(AuthContext);
  
  const handleLogout = async () => {
    const response = await authApi.logout();
    if (response?.status === "success") {
      window.location.reload();
    }
  };

  return (
    <div className="flex fixed bg-white/95 z-[99] left-0 right-0 top-0 items-center px-24 justify-between ">
      <Link
        to={"/"}
        style={{
          backgroundImage: `url(https://www.foody.vn/style/images/logo/foody-vn.png)`,
        }}
        className="h-[60px] w-[100px] bg-no-repeat bg-contain bg-center"
      ></Link>
      <Category />
      <SearchBox />
      <div className="flex items-center gap-4">
        <Link to={"/about"}>
          <p className="font-blackChancery text-2xl">About</p>
        </Link>
        <div className="relative" onMouseEnter={() => setNotiOpen(true)} onMouseLeave={() => setNotiOpen(false)}>
          <div className="px-3 py-3 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer transition-all">
            <FaBell />
          </div>
          {debounceNotiOpen && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2  w-[250px] bg-white shadow-md rounded-md z-50">
              <NotiCard userId={userData.userId} />
            </div>
          )}
        </div>
        {!isLoggedIn && (
          <div
            className="bg-primary-color hover:bg-orange-700 transition-all text-white px-6 py-2 rounded-full cursor-pointer"
            onClick={() => {
              if (!isLoggedIn) {
                setShowLoginModal(true);
              }
            }}
          >
            Login
          </div>
        )}
        {isLoggedIn && (
          <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <div className="flex hover:bg-gray-300 px-[10px] py-[6px] rounded-full cursor-pointer transition-all gap-2 justify-center items-center">
              <div
                className="h-[30px] w-[30px] rounded-full bg-no-repeat bg-contain bg-center"
                style={{ backgroundImage: `url(${userData.avatar})` }}
              />
              <p className="text-sm font-bold line-clamp-1 max-w-[100px]">{userData.username}</p>
            </div>
            {open && (
              <div className="w-[180px] before:w-[120px] before:h-[20px]  before:absolute before:top-[-20px] before:right-[50%] before:translate-x-[50%] mt-[5px] bg-white shadow-md rounded-sm right-[50%] translate-x-[50%] top-[100%] absolute">
                <Link to={"/profile"}>
                  <div className="flex justify-center px-4 transition-all rounded-t-md cursor-pointer hover:bg-gray-100 gap-3 items-center py-2">
                    <p className="text-lg">Profile</p>
                    <FaCircleUser className="text-lg"></FaCircleUser>
                  </div>
                </Link>
                <Link to={"/cart"}>
                  <div className="flex justify-center px-4 transition-all rounded-t-md cursor-pointer hover:bg-gray-100 gap-3 items-center py-2">
                    <p className="text-lg">Your carts</p>
                    <FaCartShopping className="text-lg"></FaCartShopping>
                  </div>
                </Link>
                <Link to={"/bill"}>
                  <div className="flex justify-center px-4 transition-all rounded-t-md cursor-pointer hover:bg-gray-100 gap-3 items-center py-2">
                    <p className="text-lg">Your bills</p>
                    <FaRegRectangleList className="text-lg"></FaRegRectangleList>
                  </div>
                </Link>
                <div
                  onClick={() => {
                    handleLogout();
                  }}
                  className="flex justify-center px-4 transition-all rounded-t-md cursor-pointer hover:bg-gray-100 gap-3 items-center py-2"
                >
                  <p className="text-lg">Log out</p>
                  <FaArrowRightFromBracket className="text-lg"></FaArrowRightFromBracket>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
