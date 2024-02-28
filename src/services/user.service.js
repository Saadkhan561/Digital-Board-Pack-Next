import { axios } from "@/utils/axios";


export const register = async (data) => {
  // console.log(variables, "adsadasdadas");
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
    console.log(res.data.userData.username)
    localStorage.setItem('username', res.data.userData.username)
    localStorage.setItem('logged_in', true)
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
