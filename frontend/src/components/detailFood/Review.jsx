import { useState, useEffect, useContext } from "react";
import RatingLayout from "../ui/ratingLayout";
import ratingApi from "@/apis/ratingApi";
import { AuthContext } from "../authProvider/AuthProvider";
import { Pagination } from "antd";
import { FaStar } from "react-icons/fa6";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
function convertIsoStringToFormattedDate(isoString) {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid ISO string format");
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Error converting ISO string to formatted date:", error.message);
    return null;
  }
}
export default function Review({ foodId }) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [reviewList, setReviewList] = useState([]);
  const { userData, isLoggedIn, setShowLoginModal } = useContext(AuthContext);
  // const [list, setList] = useState([])
  const [page, setPage] = useState(1);
  const [total, setTotals] = useState(1);
  const limit = 5;
  const [editingRatingId, setEditingRatingId] = useState(null);

  const getReviewsByFoodId = async () => {
    const response = await ratingApi.getRatingByFoodId(page, limit, foodId);
    // console.log("response", response.data);
    if (response.status === "success") {
      setReviewList(response.data);
      setTotals(response.pagination.totalItems);
      // console.log("kis", reviewList);
    }
    // console.log("user:", userData)
  };
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleRatingContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleRatingSubmit = async () => {
    if (!isLoggedIn) {
      toast.error("Bạn cần đăng nhập để đánh giá");
      setShowLoginModal(true);
      return;
    }

    if (!rating || !content) {
      toast.error("Vui lòng nhập review và rating");
      return;
    }
    if (editingRatingId) {
      const response = await ratingApi.updateRating(editingRatingId, content, rating);
      if (response.status === "success") {
        toast.success("Cập nhật review thành công !");
        setContent("");
        setRating(0);
        getReviewsByFoodId();
      } else {
        toast.error("Lỗi khi cập nhật review.");
      }
      return;
    }
    try {
      const response = await ratingApi.addRating(userData?.userId, foodId, content, rating);
      if (response.status === "success") {
        toast.success("Thêm review thành công!");
        setContent("");
        setRating(0);
        getReviewsByFoodId();
      } else {
        toast.error("Lỗi khi cập nhật review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  const handleDelete = async (ratingId) => {
    // console.log("Rate:",ratingId)
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa review này ?");
    if (confirmDelete) {
      try {
        const response = await ratingApi.deleteRating(ratingId);
        if (response.status === "success") {
          toast.success("Thêm review thành công !");
          getReviewsByFoodId();
        } else {
          toast.error("Xóa review thất bại.");
        }
      } catch (error) {
        console.error("Error deleting review:", error);
        toast.error("Lỗi khi xóa review. Vui lòng thử lại");
      }
    }
  };

  useEffect(() => {
    if (foodId) {
      getReviewsByFoodId();
    }
  }, [page, foodId]);

  return (
    <div>
      <div>
        <div className="comment-form py-3 flex flex-col gap-3">
          <div className="top-comment  flex justify-between items-center">
            <h3>{total} Comments</h3>
            {/* <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1">Most Recent</Menu.Item>
                  <Menu.Item key="2">Highest Rated</Menu.Item>
                </Menu>
              }
            >
              <Button>Sort by ▼</Button>
            </Dropdown> */}
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((el, idx) => {
              return (
                <FaStar
                  key={el}
                  onClick={() => handleRatingChange(el)}
                  className={`cursor-pointer text-2xl ${rating >= el ? "text-yellow-500" : "text-gray-500"}`}
                />
              );
            })}
          </div>
          {/* Example form elements */}
          <div className="form w-full">
            <textarea
              value={content}
              onChange={handleRatingContentChange}
              placeholder="Write your comment here..."
              className="border h-[150px] p-2 w-full"
            />
          </div>
          <div
            onClick={handleRatingSubmit}
            className="w-[100px] text-center cursor-pointer text-white font-semibold py-2 bg-primary-color inline-block rounded-md "
          >
            {editingRatingId ? "Cập nhật" : "Đánh giá"}
          </div>
        </div>
        {reviewList.map((item, idx) => {
          // console.log('Review Item:', item);
          return (
            <div key={`review-${idx}`}>
              <div className="flex max-w-full border-b-[1px] pb-4 mt-5 justify-between" key={item.RatingId}>
                {/* <img className='rounded-full w-10 h-10 object-cover' src={item.avatar} /> */}
                <div className="items-center ml-3">
                  <div className="">
                    <div className="flex items-center gap-2">
                      {item.user ? (
                        <img
                          className="rounded-full w-10 h-10 object-cover border-[0.5px] border-gray-200"
                          src={item.user.avatar}
                          alt={`${item.user.username}'s Avatar`}
                        />
                      ) : (
                        <div className="rounded-full w-10 h-10 bg-gray-300" />
                      )}
                      <RatingLayout rating={item.ratingValue} no={true} style="w-4 h-4" />
                      <p className="text-xs mt-[6px]">{convertIsoStringToFormattedDate(item.date)}</p>
                    </div>
                  </div>
                  <h4 className="text-lg text-orange-500 font-semibold">{item.user.username}:</h4>
                  <p className="text-[18px]">{item.content}</p>
                </div>
                {item.userId === userData.userId && (
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => {
                        setRating(item.ratingValue);
                        setContent(item.content);
                        setEditingRatingId(item.ratingId);
                      }}
                      className="text-blue-500 flex items-center"
                    >
                      <FaEdit className="mr-1" />
                    </button>
                    <button onClick={() => handleDelete(item.ratingId)} className="text-red-500">
                      <FaTrashAlt />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center mt-[40px]">
        <Pagination defaultCurrent={1} total={total} pageSize={5} onChange={(e) => setPage(e)} />
      </div>
    </div>
  );
}
