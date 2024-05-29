import { axios } from "../utils/axios";

// UPLOAD DOCUMENT ON THE CLOUD
export const uploadDocument = async (data) => {
  console.log(data)
  if (data) {
    try {
      const res = await axios.post(`/uploads/${data.docName}`, data.formData);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
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

// TO INSERT UPDATED DOCUMENT
export const insertUpdatedDocument = async(data) => {
  try {
    const res = await axios.post("/InsertEditDocument", data)
    return res.data
  } catch(error) {
    throw new Error(error)
  }
}

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
export const fetchAllDocument = async (params) => {
  try {
    console.log(params);
    const response = await axios.get("/GetDoc", {
      params: params || {},
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchDocByUser = async() => {
  try {
    const response = await axios.get("GetDocByUser")
    return response.data
  } catch(error) {
    throw new Error(error)
  }
}

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

// INSERT MEETING MINUTES ID INTO MEETING TABLE
export const meetingMinutesId = async (params) => {
  const { docId, id } = params;
  try {
    const res = await axios.post(
      `/meetingMin?meeting_min=${docId}&meeting_id=${id}`
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

// export const updatedDoc = async() => {
//   try{

//   }
// }
