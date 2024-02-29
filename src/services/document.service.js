import { axios } from "../utils/axios";

export const uploadDocument = async (data) => {
  try {
    const res = await axios.post("/uploads", data);

    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const insertDocument = async (data) => {
  try {
    const res = await axios.post("/InsertDocument", data);

    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const userAccessList = async(data) => {
  try {
    const res = await axios.post("/AddPermission", data)
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

export const fetchAllDocument = async () => {
  try {
    const response = await axios.get("/GetDoc");

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchDocumentById = async (params) => {
  const { id } = params;

  try {
    const response = await axios.get(`/GetFile/${id}`);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
