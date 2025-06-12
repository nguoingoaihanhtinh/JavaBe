import { request } from './request';

const notiApi = {
  getNotiByUser: async (paging, limit, userId) => {
    try {
      const response = await request.get(
        `Noti/getByUser/${userId}?page=${paging}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteNotification: async (notificationId) => {
    try {
      const response = await request.delete(`Noti/delete/${notificationId}`);
      return response.data;
    } catch (error) {
      console.log('Error deleting notification:', error);
    }
  },
  getAllNoti: async () => {
    try {
      const response = await request.get(`Noti/getAll?page=1&limit=20`);
      return response.data;
    } catch (error) {
      console.log('Error deleting notification:', error);
    }
  },
};

export default notiApi;
