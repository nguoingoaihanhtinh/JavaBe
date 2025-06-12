import { request } from "./request";

const cartApi = {
  addQuantity: async (orderId) => {
    try {
      const response = await request.post(`/Cart/addQuantity`, { orderId });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  subQuantity: async (orderId) => {
    try {
      const response = await request.post(`/Cart/subQuantity`, { orderId });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  deleteCart: async (orderId) => {
    try {
      const response = await request.post(`/Cart/deleteCart`, { orderId });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  addCart: async (userId, foodId, quantity, note) => {
    try {
      const response = await request.post(`/Cart/addCart`, { userId, foodId, quantity, note });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
export default cartApi;
