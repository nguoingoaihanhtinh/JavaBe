import axios from "axios";
import { request } from "./request";

const foodApi = {
  getAllFood: async (paging,limit,type) => {
    let query = `/Food?page=${paging}&limit=${limit}`
    if(type && type != "All"){
        query += `&type=${type}`
    }
    const response = await request.get(query);
    return response.data;
  },
  getNewestFood: async (paging,limit) => {
    let query = `/Food/Newest?page=${paging}&limit=${limit}`
    const response = await request.get(query);
    return response.data;
  },
  getSearchedFood: async (paging,limit,kw) => {
    let query = `/Food/Search?page=${paging}&limit=${limit}`
    if(kw){
      query += `&kw=${kw}`
    }
    const response = await request.get(query);
    return response.data;
  },
  getFoodbyId: async (foodId) => {
    let query = `/Food/getfood?id=${foodId}`
    const response = await request.get(query);
    return response.data;
  },
  getAllFoodTypes: async () => {
    let query = `/Category/getAllFoodTypes`;
    const response = await request.get(query);
    return response.data;
  },
  getFoodType: async (typeId) => {
    let query = `/Category/getFoodTypeById?id-${typeId}`;
    const response = await request.get(query);
    return response.data;
  },
  addFoodType:async(newType)=>{
   
    try {
      const response = await request.post(
        "/Category/addType",
        JSON.stringify(newType), // Send the body as a JSON string
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
     return false
    }
  },
  deleteFoodType:async(id)=>{
    console.log(id)
    try{
      const response= await request.delete(`/Category/${id}`)
      return response.data;
    }catch{
      return false;
    }
  },
  updateType:async(type)=>{
    try{
      const response= await request.put(`/Category/${type.typeId}`, 
        JSON.stringify(type), 
      {
        headers: {
          "Content-Type": "application/json",
        },
      })
      return response.data
    }catch{
      return false;
    }
  },
  addFood: async(newFood)=>{
    try {
      const response = await request.post(
        "/Food/addFood",
        JSON.stringify(newFood), // Send the body as a JSON string
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
     return false;
    }
  },
  updateFood:async(food)=>{
    try{
      const response= await request.put(`/Food/${food.FoodId}`, 
        JSON.stringify(food), 
      {
        headers: {
          "Content-Type": "application/json",
        },
      })
      return response.data
    }catch{
      return false;
    }
  },
  deleteFood:async(id)=>{
      try{
        const response= await request.delete(`/Food/${id}`)
        return response.data;
      }catch{
        return false;
    }
  }
}
export default foodApi;
