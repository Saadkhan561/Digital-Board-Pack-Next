import { axios } from "../utils/axios";

// UPLOAD DOCUMENT ON THE CLOUD
export const uploadDocument = async (data) => {
  try {
    const res = await axios.post("/uploads", data);

    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

// INSERT FILE NAME INTO THE DATABASE
export const insertDocument = async (data) => {
  try {
    const res = await axios.post("/InsertDocument", data);

    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

// GIVE ACCESS TO USERS TO A PARTICULAR DOCUMENT
export const userAccessList = async (data) => {
  const { docId, userId } = data;
  try {
    const res = await axios.post(`/AddPermission/${docId}`, userId); // assume kr rahay hain k payload userId ka array lega sirf aur doc id param se pakrega
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

// FETCH ALL DOCUMENTS
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

// FETCH A PARTICULAR DOCUMENT
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
