import { axios } from "@/utils/axios";

export const getNotifications = async (params) => {
  try {
    const response = await axios.get(`/getNotification`, { params });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const changeNotificationStatus = async () => {
  try {
    const response = await axios.post(`/changeStatus`);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
