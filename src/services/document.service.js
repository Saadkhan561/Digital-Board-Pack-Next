import { axios } from "../utils/axios";

// UPLOAD DOCUMENT ON THE CLOUD
export const uploadDocument = async (data) => {
  if (data) {
    try {
      const res = await axios.post(`/uploads/${data.docName}`, data.formData);
      console.log(res.data)
      return res.data;
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }
};

// INSERT FILE NAME INTO THE DATABASE
export const insertDocument = async (data) => {
  console.log(data)
  try {
    const res = await axios.post("/InsertDocument", data);
    console.log(res.data)
    return res.data;
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
};

// TO INSERT UPDATED DOCUMENT
export const insertUpdatedDocument = async (data) => {
  console.log(data)
  try {
    const res = await axios.post("/InsertEditDocument", data);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

// TO DELETE DOCUMENT
export const deleteDocument = async (data) => {
  try {
    const docId = data.docId ? data.docId : null;
    const rootId = data.rootId ? data.rootId : null;
    const res = await axios.delete(`/deleteDocument`, {
      params: { fullPath: `${data.folder}/${data.docName}`, docId, rootId },
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

// GIVE ACCESS TO USERS TO A PARTICULAR DOCUMENT
export const userAccessList = async (data) => {
  const { docId, userId } = data;
  try {
    const res = await axios.post(`/AddPermission/${docId}`, userId);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

// FUNCTION TO REMOVE ACCESS OF USERS
export const removeAccess = async (data) => {

  try {
    const res = await axios.post("/RemovePermission", data);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

// API TO UPDATE THE STATUS OF DOCUMENT
export const updateDocumentStatus = async (data) => {
  // console.log(data)
  try {
    if (!data.doc_status) {
      const res = await axios.put("/updateDocStatus",data);
      return res.data;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const updateStatus = async (data) => {
  console.log(data)
  try {
    const res = await axios.put(`/updateStatus/${data.docId}`);
    console.log(res.data)
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

// try {
//   const response = await axios.get("/GetDoc", {
//     params: params || {},
//   });
//   return response.data;
// } catch (error) {
//   throw new Error(error);
// }
// FETCH ALL DOCUMENTS
// export const fetchAllDocument = async (params) => {
//   const {role} = params
//   if (role === 'Secretary') {
//     try {
//       const response = await axios.get("/GetDoc");
//       return response.data;
//     } catch (error) {
//       throw new Error(error);
//     }
//   } else {
//     try {
//       const response = await axios.get("/GetDocByUser");
//       return response.data;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// };

export const fetchDocByUser = async () => {
  try {
    const response = await axios.get("GetDocByUser");
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// FETCH A PARTICULAR DOCUMENT
export const fetchDocumentById = async (params) => {
  const { id } = params;
  console.log(id)
  if (id) {
    try {
      const response = await axios.get(`/GetFile/${id}`);
      if (response.status == 404) {
        throw new Error("Document not found");
      }
      return response.data.value;
    } catch (error) {
      throw new Error(error);
    }
  }
};

export const getAllDocuments = async (params) => {
  try {
    const response = await axios.get(`/GetDocuments`, { params });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// INSERT MEETING MINUTES ID INTO MEETING TABLE
export const meetingMinutesId = async (params) => {
  const { docId, id } = params;
  console.log("Uploading Meeting Minutes")
  try {
    const res = await axios.post(
      `/meetingMin?meeting_min=${docId}&meeting_id=${id}`
    );

    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

// export const updatedDoc = async() => {
//   try{

//   }
// }
