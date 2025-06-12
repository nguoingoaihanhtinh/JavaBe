import { formatCurrency } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ id, img, title, rating, description, price }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/detail/${id}`);
  };
  
  return (
    <div onClick={handleCardClick} className="shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-slate-950 dark:text-white cursor-pointer border border-gray-300 rounded-xl">
      <div className="overflow-hidden">
        <img
          src={img}
          alt="No image"
          className="mx-auto rounded-xl h-[220px] w-full object-cover transition duration-700 hover:skew-x-2 "
        />
      </div>
      <div className="space-y-2 p-3 items-center text-center">
        <h1 className="line-clamp-1 font-bold text-xl">{title}</h1>
        <div className="flex items-center gap-2 opacity-70">
          <span>{rating}</span>
        </div>
        <p className="line-clamp-2">{description}</p>
        <div className="items-center justify-between border-t-2 py-3 !mt-3">
          <p className="text-2xl font-bold text-red-400">{formatCurrency(price)}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
