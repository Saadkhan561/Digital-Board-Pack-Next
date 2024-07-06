import { axios } from "../utils/axios";

export const search = async (params) => {
  try {
    const res = await axios.get(`/SearchDoc?search=${params}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
