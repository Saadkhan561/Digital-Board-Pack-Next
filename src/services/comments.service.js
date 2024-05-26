import { axios } from "../utils/axios";

export const insertComment = async (data) => {
  // const {docId} = params
  try {
    const res = await axios.post("/InsertComment", data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchComments = async (params) => {
  const { docId } = params;
  console.log(params);
  console.log(docId);
  try {
    const res = await axios.get(`/GetCommentByDoc?docId=${docId}`);
    console.log(res);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchCommentsByDocId = async (params) => {
  const { docId } = params;
  try {
    const res = await axios.get(`/GetCommentByDoc?docId=${docId}`);
    return res.data
  } catch (error) {
    throw new Error(error);
  }
};
