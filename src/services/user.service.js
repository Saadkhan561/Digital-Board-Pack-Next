import { axios } from "@/utils/axios";


export const register = async (data) => {
  // console.log(variables, "adsadasdadas");
  try {
    const res = await axios.post("/register", data);
    console.log(res)
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const login = async (data) => {
  try {
    const res = await axios.post("/login", data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllUsers = async () => {
  try {
    const res = await axios.get("/Users")
    return res.data
  } catch(err) {
    console.log(err)
  }
}
