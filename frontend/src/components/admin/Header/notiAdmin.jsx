import notiApi from "@/apis/notiApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const NotiAdmin = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await notiApi.getAllNoti();
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    console.log("Updated notifications:", notifications);
  }, [notifications]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="absolute right-[-40px] mt-2 bg-white shadow-lg rounded-md w-[350px] py-4 px-2 z-50 border-[1.5px] border-b-0 border-gray-200">
      <h4 className="font-semibold text-lg mb-2 ml-2">Notifications</h4>
      <ScrollArea className="max-h-[300px] overflow-y-auto px-3">
        {notifications?.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="py-2 border-b flex justify-between">
              <div>
                <p className="font-medium text-sm text-gray-800">{notification.header}</p>
                <p className="text-sm text-gray-600">{notification.content}</p>
              </div>
              
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No notifications available.</div>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotiAdmin;
