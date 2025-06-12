import { Button } from "@/components/ui/button";
import UserHeading from "./UserHeading";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/components/authProvider/AuthProvider";
import userApi from "@/apis/userApi";
import UserReview from "./MidContent";
import MidContent from "./MidContent";
import { Breadcrumb } from "antd";
import authApi from "@/apis/authApi";
import billApi from "@/apis/billApi";

export default function ProfilePage() {
  const { userData, updateAvatar, setUserData } = useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [billCount, setBillCount] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState(userData.avatar); 
  const [newAvatarUrl, setNewAvatarUrl] = useState(""); 
  const [showAvatarInput, setShowAvatarInput] = useState(false); 

  // console.log("user:",userData);
  useEffect(() => {
    if (userData) {
      setUserName(userData.username)
      setEmail(userData.email);
      setAddress(userData.address);

      setAvatarUrl(userData.avatar);
    }
  }, [userData]);
  useEffect(() => {
    const UpdateFoodsCount = async () => {
        try {
            const response = await userApi.getAllFoodSaved(userData.userId);
            const foods = response.data; 
            setFavoriteCount(foods.length); 
            // console.log("Food items:", foods);
            // console.log("Count:", foods.length); 
        } catch (error) {
            console.error("Failed to fetch favorite foods:", error);
        }
    };
    if (userData && userData.userId) {
      UpdateFoodsCount();
    }
}, [userData]);

useEffect(() => {
  const updateBillCount = async () => {
    try {
      const response = await billApi.getBills(1,4,userData.userId); 
      const bills = response.data;
      setBillCount(bills.length);
      // console.log("Bills:", bills);
      // console.log("Bill Count:", bills.length);
    } catch (error) {
      console.error("Failed to fetch bills:", error);
    }
  };

  if (userData && userData.userId) {
    updateBillCount();
  }
}, [userData]);



const handleChangeAvatar = () => {
  setShowAvatarInput((prev) => !prev); // Show the input form
};

// Function to handle submitting the new avatar URL
const handleAvatarSubmit = (e) => {
  e.preventDefault();
  updateAvatar(newAvatarUrl || userData.avatar); 
  setAvatarUpdated(!avatarUpdated);
  setShowAvatarInput(false); 
};
const handleDeleteAvatar = () => {
  const defaultAvatarUrl = "https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg";
  updateAvatar(defaultAvatarUrl);
  setAvatarUrl(defaultAvatarUrl);
};



const handleSave = async () => {
  console.log("User:", userData.userId);
  try {
    const data = {
      userId: userData.userId,
      username,
      email,
      address,
      avatar: newAvatarUrl || avatarUrl,
    };

    const response = await authApi.updateUser(data);
    if (response && response.status === "success") {
      console.log("User updated successfully:", response.message);

      setUserData({
        ...userData,
        username,
        email,
        address,
        avatar: newAvatarUrl || avatarUrl,
      });
    } else {
      console.error("Update failed:", response.message || "Unknown error");
    }
  } catch (error) {
    console.error("An error occurred while updating the user:", error);
  }
};

  const breadcrumbItems = [
    { title: 'Home', href: '/' },
    { title: 'Profile', href: '#' }, // Using a hash for the current book
  ];
  return (
  <section className="bg-orange-200 rounded-xl mx-12 h-full">
        <UserHeading />
        <div className="px-16 flex justify-center ">
          <Breadcrumb
            className="font-semibold text-black text-xl"
            items={breadcrumbItems.map((item) => ({
                title: item.href ? <a href={item.href}>{item.title}</a> : item.title,
            }))}
          />
        </div>
        {/* Lower Profile */}
        <div className="lowerProfile px-4 sm:px-8 py-8 rounded-xl flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          
          {/* Left Setting - chua co chuc nang*/}
          <div className="leftSetting bg-white p-5 basis-full lg:basis-1/4 rounded-xl">
            <h1 className="text-2xl font-bold sm:text-xl text-center py-5 border-b-blue-500 border-b">
            Public profile
            </h1>
            {/* Avatar*/}
            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <div
                  className="bg-cover bg-center bg-no-repeat w-32 h-32 sm:w-40 sm:h-40 rounded-full ring-2 ring-indigo-300"
                  style={{ backgroundImage: `url(${avatarUrl})` }}
              ></div>
                <div className="flex flex-col space-y-5 sm:ml-8">
                <Button className="font-medium hover:bg-slate-800" onClick={handleChangeAvatar}>Change avatar</Button>
                <Button className="font-medium bg-white text-black hover:bg-slate-300" onClick={handleDeleteAvatar}>Delete avatar</Button>
              </div>
            </div>
                  {/* Avatar URL Input Form */}
            {showAvatarInput && (
              <form onSubmit={handleAvatarSubmit} className="mt-4">
                <input
                  type="text"
                  placeholder="Enter new avatar URL"
                  value={newAvatarUrl}
                  onChange={(e) => setNewAvatarUrl(e.target.value)}
                  className="border border-gray-300 p-2 rounded"
                  required
                />
                <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">
                  Submit
                </button>
              </form>
            )}

            {/* Update Info*/}
            <div className="mt-8 sm:mt-14 text-[#202142]">
              <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-2">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-indigo-900">Your last name</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-indigo-900">Your email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-indigo-900">Your address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5"
                />
              </div>
              <div className="flex justify-end mt-5">
                <Button onClick={handleSave} className="text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg px-5 py-2.5">Save</Button>
              </div>
            </div>
          </div>
          </div>
          {/* Review Block*/}
        <div className="reviewBlock basis-full lg:basis-1/2 rounded-xl bg-white text-center h-64 lg:h-full">
          <MidContent setReviewCount={setReviewCount}/>
        </div>
          {/* Order */}
        <div className="rightOnline basis-full lg:basis-1/4 flex flex-col justify-between h-full gap-8 px-4 lg:px-0">
          {/* Top Section - Online Order */}
          <div className="top-right flex-grow rounded-xl bg-white shadow-sm">
            <h1 className="text-xl font-bold text-center py-5 border-b border-b-blue-500">
              Online Order
            </h1>
            {/* Review Sections */}
            <div className="flex justify-between items-center py-4 border-b border-b-orange-200 px-5 hover:shadow-lg cursor-pointer transition-all duration-200">
              <Link to="/favorite" className="flex-grow">
                <h1 className="text-base sm:text-lg font-semibold text-gray-700">Favorites Food</h1>
              </Link>
              <div className="bg-orange-400 rounded-full w-[40px] h-[40px] flex items-center justify-center">
                <span className="text-white font-bold">{favoriteCount}</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-b-orange-200 px-5 hover:shadow-lg cursor-pointer transition-all duration-200">
              <Link to="/bill" className="flex-grow">
                <h1 className="text-base sm:text-lg font-semibold text-gray-700">Bill</h1>
              </Link>
              <div className="bg-orange-400 rounded-full w-[40px] h-[40px] flex items-center justify-center">
                <span className="text-white font-bold">{billCount}</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-b-orange-200 px-5 hover:shadow-lg cursor-pointer transition-all duration-200">
              <h1 className="text-base sm:text-lg font-semibold text-gray-700">Reviews</h1>
              <div className="bg-orange-400 rounded-full w-[40px] h-[40px] flex items-center justify-center">
                <span className="text-white font-bold">{reviewCount}</span>
              </div>
            </div>
          </div>
        </div>


        </div>
  </section>
  )
}
