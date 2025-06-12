import { authRequest } from "./request";

const authApi = {
  register: async (data) => {
    const response = await authRequest.post(`/user/register`, data);
    return response.data;
  },
  isLoggedIn: async () => {
    try {
      const response = await authRequest.get(`/user/checkjwt`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  login: async (data) => {
    try {
      const response = await authRequest.post(`/user/login`, data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  logout: async () => {
    try {
      const response = await authRequest.get("/user/logout");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async (data) => {
    try {
      const { userId, ...updateData } = data;
      console.log("Updating user with ID:", userId, "Data:", updateData);
      const response = await authRequest.put(`/user/updateUser`, data); // Assuming `UserId` is included in data
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
export default authApi;
