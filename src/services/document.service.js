import {axios} from "../utils/axios";

export const upload_doc = async (data) => {
  try {
    const res = await axios.post("/upload_doc", data);

    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
