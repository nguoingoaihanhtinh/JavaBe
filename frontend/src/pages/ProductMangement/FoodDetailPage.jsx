import FoodDetail from "@/components/admin/Food/FoodDetail";
import ReviewTable from "@/components/admin/Food/ReviewTable";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import foodApi from "@/apis/foodApi";
import ratingApi from "@/apis/ratingApi";
import { useNavigate } from "react-router-dom";
export default function FoodDetailPgae() {
    const navigate=useNavigate();
    const { id } = useParams();
    const[food,setFood]=useState('');
    const[types,setTypes]=useState([]);
    const[reviews,setReviews]=useState([]);
    useEffect(()=>{
        async function fetchData() {
            const response1= await foodApi.getFoodbyId(id);
           
            console.log(response1)
            const response2= await foodApi.getAllFoodTypes();
            const response3= await ratingApi.getRatingByFoodId(1,1000,id);
            if(response1.status=='success')
            {
                
                const foodFetch={...response1.data, rating: response1.data.rating ? Math.round(response1.data.rating * 100) / 100 :0}
                setFood(foodFetch)
            }
            if(response1.status=='success')
            {
                setTypes(response2.data)
            }
            if(response3.status=='success')
            {
                setReviews(response3.data)
            }
        }
        fetchData()
    },[])
    
    if(!food || types.length==0)
    {
        
        return( <div className="text-center">
            <div className="mt-8 font-bold text-3xl">Error</div>
            <p onClick={()=>navigate(-1)} className="mt-1 text-blue-400 cursor-pointer hover:text-blue-500 inline-block">Go back</p>
        </div>)
       
    }
    return (
        <div>
            <FoodDetail food={food} types={types}/>
            <ReviewTable   data={reviews} />
        </div>

    )
}