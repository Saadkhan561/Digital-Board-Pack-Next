import { axios } from "@/utils/axios";

export const register = async (data) => {
  try {
    const res = await axios.post("/register", data);

    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const login = async (data) => {
  try {
    const res = await axios.post("/login", data);
    console.log(res);
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const fetchAllUsers = async () => {
  try {
    const res = await axios.get("/Users");
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const forgetPassword = async (data) => {
  try {
    const res = await axios.post("/forget-password", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const setPassword = async (data) => {
  try {
    const res = await axios.post("/set-password", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const resetPassword = async (data) => {
  try {
    const res = await axios.post("/reset-password", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
