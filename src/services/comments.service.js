import useUserStore from "@/stores/useUserStore";
import { axios } from "../utils/axios";

export const insertComment = async (data) => {
  console.log(data);
  try {
    if (data.docVersionStatus === "parent") {
      const res = await axios.post("/InsertComment", data);
      console.log(res.data);
      return res.data;
    } else {
      const res = await axios.post("/InsertVersionComment", data);
      console.log(res.data);
      return res.data;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const updateComment = async (data) => {
  try {
    const res = await axios.put("/UpdateComment", data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const insertReply = async (data) => {
  try {
    const res = await axios.post("/InsertCommentReply", data);
    return res.data;
  } catch (err) {
    throw new Error();
  }
};

export const updateReply = async (data) => {
  try {
    const res = await axios.put("/UpdateCommentReply", data);
    return res.data;
  } catch (err) {
    throw new Error();
  }
};

export const fetchComments = async (params) => {
  try {
    const { docId, role, docVersionStatus } = params;
    // console.log(docId);
    // console.log(docVersionStatus);

    if (docId && role === "secretary") {
      if (docVersionStatus === "parent") {
        const res = await axios.get(`/GetCommentByDoc?docId=${docId}`);
        return res.data;
      } else {
        const res = await axios.get(`/GetVersionCommentByDoc?docId=${docId}`);
        return res.data;
      }
    } else if (role === "user") {
      if (docVersionStatus === "version") {
        const res = await axios.get(`/GetCommentByUser?docId=${docId}`);
        return res.data;
      } else {
        const res = await axios.get(`/GetVersionCommentByUser?docId=${docId}`);
        return res.data;
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteComment = async (params) => {
  try {
    const res = await axios.delete(`DeleteComment/${params}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteReply = async (params) => {
  try {
    const res = await axios.delete(`DeleteCommentReply/${params}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
