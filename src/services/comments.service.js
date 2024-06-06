import useUserStore from "@/stores/useUserStore";
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

export const updateComment = async (data) => {
  console.log(data)
  // const {docId} = params
  try {
    const res = await axios.put("/UpdateComment", data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const insertReply = async(data) => {
  try {
    const res = await axios.post('/InsertCommentReply', data)
    return res.data
  } catch(err) {
    throw new Error
  }
}

// export const fetchComments = async (params) => {
//   const { docId } = params;
//   console.log(params);
//   console.log(docId);
//   try {
//     const res = await axios.get(`/GetCommentByUser?docId=${docId}`);
//     console.log(res);
//     return res.data;
//   } catch (err) {
//     throw new Error(err);
//   }
// };

export const fetchComments = async (params) => {
  // console.log(params)
  const { docId, role } = params;
  if (docId && role === 'Secretary') {
    try {
      const res = await axios.get(`/GetCommentByDoc?docId=${docId}`);
      return res.data
    } catch (error) {
      throw new Error(error);
    }
  } else {
    try {
      const res = await axios.get(`/GetCommentByUser?docId=${docId}`);
      return res.data
    } catch (error) {
      throw new Error(error);
    }
  }
};

export const deleteComment = async(params) => {
  try {
    const res = await axios.delete(`DeleteComment/${params}`)
    return res.data
  } catch(error) {
    throw new Error(error)
  }
}
