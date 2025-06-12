import { formatCurrency } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const FoodCardHorizontal = ({id, img, title, rating, description, price }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/detail/${id}`);
  };
    return (
      <div onClick={handleCardClick} className="flex h-[75px] shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-slate-950 dark:text-white cursor-pointer border border-gray-300 rounded-xl">
        <div className="flex-shrink-0 overflow-hidden w-[30%] rounded-l-xl">
          <img
            src={img}
            alt="No image"
            className="h-full w-full object-cover transition duration-700 hover:skew-x-2"
          />
        </div>
        <div className="flex justify-between p-4 w-[70%] space-y-2 items-center">
          <div>
            <h1 className="line-clamp-1 font-bold text-xl">{title}</h1>
            <div className="flex items-center gap-2 opacity-70">
              <span>{rating}/5</span>
            </div>
          </div>
          <div className="pt-3 mt-3">
                <p className="text-lg font-bold text-red-400">{formatCurrency(price)}</p>
          </div>
          
        </div>
      </div>
    );
  };
  
  export default FoodCardHorizontal;
  