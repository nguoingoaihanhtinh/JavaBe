import { request } from './request';

const billApi = {
  addBill: async body => {
    try {
      const response = await request.post(
        `/Bill/addBill`,
        JSON.stringify(body), // Send the body as a JSON string
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getBills: async (paging, limit, userId) => {
    try {
      const response = await request.get(
        `/Bill?page=${paging}&limit=${limit}&userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getAllBill: async () => {
    try {
      const response = await request.get(`/Bill/getAll`);
      return response.data;
    } catch (error) {
      return false;
    }
  },
  getBillCompleted: async () => {
    try {
      const response = await request.get(`/Bill/getCompleted`);
      return response.data;
    } catch (error) {
      return false;
    }
  },
  updateStatusBill: async (id, status) => {
    try {
      const response = await request.put(
        `/Bill/updateStatus?Id=${id}&status=${status}`
      );
      return response.data;
    } catch (error) {
      return false;
    }
  },
  deleteBill: async (id) => {
    try {
      const response = await request.delete(`/Bill/${id}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },
  getForManageCustomer: async () => {
    try {
      const response = await request.get(`/Bill/getForManageCustomer`);
      return response.data;
    } catch (error) {
      return false;
    }
  }
};

export default billApi;
