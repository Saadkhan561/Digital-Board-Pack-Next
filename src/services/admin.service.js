import { axios } from "@/utils/axios";

export const adminCreateUser = async (data) => {
  try {
    const res = await axios.post("/admin/create-user", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
