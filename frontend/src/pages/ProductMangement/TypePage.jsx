import TypeTable from "@/components/admin/FoodType/TypeTable"
import AddType from "@/components/admin/FoodType/AddType";
import foodApi from "@/apis/foodApi";
import { useEffect,useState } from "react";
export default function TypePage(){
    const [types,setTypes]=useState([]);
    useEffect(()=>{
        async function fetchData() {
            const response=await foodApi.getAllFoodTypes()
            if(response)
            {
                setTypes(response.data)
            }
        }
        fetchData()
    },[])
    if(types.length==0)
        {
            
            return( <div className="text-center">
                <div className="mt-8 font-bold text-3xl">Error</div>
               
            </div>)
           
        }
   
    return(
        <div className="md:flex">
            <div className="basis-2/6 md:mr-4">
                 <AddType types={types} setTypes={setTypes}/>
            </div>
            <div className="h-[570px] md:ml-4 flex-1 mt-3 md:mt-0">
                 <TypeTable types={types} setTypes={setTypes}/>
            </div>
           
           
        </div>
    )
}