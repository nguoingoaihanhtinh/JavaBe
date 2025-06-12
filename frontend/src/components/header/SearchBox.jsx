import { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import FoodCardHorizontal from "../food/FoodCartHorizontal";
import useDebounce from "@/hooks/useDebounce";
import foodApi from "@/apis/foodApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foods, setFood] = useState([]);
  const debounceSearch = useDebounce(searchQuery, 500);
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();

  const getSearchFoods = async () => {
    const response = await foodApi.getSearchedFood(1, 4, debounceSearch);
    console.log(response.data);
    if (response.status === "success") {
      setFood(response.data);
    }
  };
  useEffect(() => {
    if (debounceSearch.trim() !== "") {
      getSearchFoods();
    }
  }, [debounceSearch]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setIsSearching(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      toast.success(`Bạn đã tìm kiếm từ khóa ${searchQuery} !`);
      // Navigate to the search results page with the search query
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };
  return (
    <div ref={searchBoxRef} className="w-[400px] relative">
      <div className="bg-gray-100 rounded-full h-[50px] flex items-center">
        <input
          type="text"
          placeholder="Search for food..."
          className="w-full bg-transparent outline-none px-6 py-3"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearching(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchSubmit(); // Submit on Enter key press
            }
          }}
        />
        <div className="w-[60px] flex items-center justify-center h-full text-gray-400 hover:text-gray-600 rounded-r-full cursor-pointer transition-all hover:bg-gray-200">
          <FaMagnifyingGlass />
        </div>
      </div>

      {isSearching && (
        <div className="absolute top-[60px] left-[50%] translate-x-[-50%] bg-white shadow-lg rounded-lg p-4 max-h-[300px] flex flex-col gap-3 overflow-y-auto w-[500px]">
          {foods.length > 0 ? (
            foods.map((item) => (
              <FoodCardHorizontal
                id={item.foodId}
                key={item.foodId}
                img={item.image1}
                title={item.name}
                rating={item.rating}
                description={item.description}
                price={item.price}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">No results found</p>
          )}
        </div>
      )}
    </div>
  );
}
