import { useContext, useEffect } from "react";
import ShowImage from "@/components/detailFood/ShowImage";
import { MdOutlineShoppingCart } from "react-icons/md";
import RatingLayout from "@/components/ui/ratingLayout";
import { TbCurrencyDong } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Review from "@/components/detailFood/Review";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import foodApi from "@/apis/foodApi";
import { useParams } from "react-router-dom";
import { AuthContext } from "@/components/authProvider/AuthProvider";
import userApi from "@/apis/userApi";
import cartApi from "@/apis/cartApi";
import toast from "react-hot-toast";
import { formatPoint } from "@/lib/utils";

export default function DetailFoodPage() {
  const [count, setCount] = useState(1);
  const { userData, setUserData, isLoggedIn, setShowLoginModal } = useContext(AuthContext);
  const { id } = useParams();
  const [note, setNote] = useState("");
  const [food, setFood] = useState(null);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Kiểm tra xem người dùng có nhập số nguyên hay không
    if (inputValue === "" || /^[0-9]+$/.test(inputValue)) {
      if (inputValue > 999) {
        setCount(999);
      } else {
        setCount(inputValue);
      }
    }
  };
  const getFoodbyId = async () => {
    const response = await foodApi.getFoodbyId(id);
    if (response.status === "success") {
      setFood(response.data);
    }
  };
  useEffect(() => {
    if (id) {
      getFoodbyId();
    }
  }, [id]);
  if (!food) {
    return <p>Loading...</p>; // Show loading while food data is being fetched
  }
  const removeFoodSaved = async (id) => {
    try {
      await userApi.removeFoodSaved({ userId: userData.userId, foodId: id });
    } catch (error) {
      console.log(error);
    }
  };
  const addFoodSaved = async (id) => {
    try {
      await userApi.addFoodSaved({ userId: userData.userId, foodId: id });
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggleFoodSaved = async (id) => {
    if (!isLoggedIn) {
      toast.error("Bạn cần đăng nhập để thực hiện chức năng yêu thích");
      setShowLoginModal(true);
      return;
    }
    if (userData.userSaved.includes(id)) {
      const updatedUserSaved = userData.userSaved.filter((foodId) => foodId !== id);
      setUserData({
        ...userData,
        userSaved: updatedUserSaved,
      });
      await removeFoodSaved(id);
    } else {
      const updatedUserSaved = [...userData.userSaved, id];
      setUserData({
        ...userData,
        userSaved: updatedUserSaved,
      });
      await addFoodSaved(id);
    }
  };
  const handleAddToCart = async (id) => {
    if (!isLoggedIn) {
      toast.error("Bạn cần đăng nhập để thêm vào giỏ hàng");
      setShowLoginModal(true);
      return;
    }
    if (!id || !userData.userId) return;
    const response = await cartApi.addCart(userData.userId, id, count, note);

    if (response?.status === "success") {
      toast.success("Food added successfully");
      window.location.reload();
    }
  };
  const listImage = [food.image1, food.image2, food.image3].filter(Boolean);
  return (
    <div className=" relative top-20 pb-[150px] mx-[10%] ">
      <div className="flex  ">
        <div className="basis-[43%]">
          <ShowImage listImage={listImage} />
        </div>

        <div className="basis-[58%] pl-[4%] mt-4 mr-[5%]  ">
          {/* <div>
                <a href='' className='flex items-center mb-2 mt-[-20px]'>
                   <img className='rounded-full w-10 h-10 object-cover border-slate-400 border-[1px]' src={store.avatar} />
                   <h3 className='text-[18px] ml-3 font-semibold'>{store.name}</h3>
                </a>
              
              </div> */}

          <div className="flex items-center">
            <h2 className="font-extrabold text-4xl/[45px] mr-[4%] ">{food.name} </h2>
            <div>
              <RatingLayout rating={formatPoint(food.rating)} />
            </div>
            <button onClick={() => handleToggleFoodSaved(id)} className="ml-auto  w-fit mr-8">
              {userData?.userSaved?.includes(id) ? <FaHeart size={25} color="red" /> : <FaRegHeart size={25} />}
            </button>
          </div>
          <div className="flex items-center mt-1 ml-[2px]">
            <p className="font-bold text-primary-color text-2xl">{food.price.toLocaleString("en-US")}</p>
            <TbCurrencyDong size={"29px"} color="rgb(234 106 18)" />
          </div>
          <p className=" mt-6">{food.description}</p>
          <div className="items-center mt-[3%]">
            <div className="flex items-center">
              <p className="mr-5">Số lượng</p>
              <Input
                type="number"
                placeholder="1"
                className="w-20"
                value={count}
                onChange={handleChange}
                min={1}
                max={999}
                step={1}
                onKeyDown={(e) => {
                  if (e.key === "." || e.key === ",") {
                    e.preventDefault(); // Ngăn không cho nhập dấu chấm và dấu phẩy
                  }
                }}
              />
            </div>
            <div className="flex items-center mt-5">
              <p className="mr-7">Ghi chú</p>
              <Input
                placeholder="Ghi chú"
                className="w-[50%] h-10"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <button
              onClick={() => {
                if (!isLoggedIn) {
                  setShowLoginModal(true);
                  return;
                }
                handleAddToCart(id);
              }}
              className="w-auto h-12 bg-primary-color bg-opacity-70 flex p-2 items-center mt-6 "
            >
              <MdOutlineShoppingCart className="text-white w-5 h-5" />
              <p className="text-white text-[16px] ml-2">Thêm vào giỏ hàng</p>
            </button>
          </div>
        </div>
      </div>
      {/* dưới */}
      <div className="ml-[3%] max-w-full mt-[3%]">
        <h2 className="text-[28px] font-semibold mb-[3%]">Đánh giá</h2>
        <Review foodId={food.foodId} />
      </div>
    </div>
  );
}
