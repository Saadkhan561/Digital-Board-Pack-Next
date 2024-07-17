import { axios } from "../utils/axios";

export const getNotification = async () => {
  try {
    const res = await axios.get("/getNotification");
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
