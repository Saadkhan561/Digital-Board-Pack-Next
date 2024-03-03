import {axios} from '../utils/axios'

export const fetchAllDepartments = async () => {
    try {
      const response = await axios.get("/dept");
  
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };