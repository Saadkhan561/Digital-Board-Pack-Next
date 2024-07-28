import useUserStore from "@/stores/useUserStore";
import { axios } from "../utils/axios";

export const insertComment = async (data) => {
  try {
    if (data.docVersionStatus === "parent") {
      const res = await axios.post(`/InsertComment`,{params: {doc_name: data.doc_name, doc_status: true}}, data);
      console.log(res.data);
      return res.data;
    } else {
      const res = await axios.post(`/InsertVersionComment`, data,{params: {doc_status: data.docStatus, docId: data.parentDocId, doc_name:data.doc_name}});
      console.log(res.data);
      return res.data;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const updateComment = async (data) => {
  try {
    if (data.docVersionStatus === "version") {
      const res = await axios.put("/UpdateVersionComment", data);
      return res.data;
    } else {
      const res = await axios.put("/UpdateComment", data);
      return res.data;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const insertReply = async (data) => {
  console.log(data.docId)
  try {
    if (data.docVersionStatus === "version") {
      const res = await axios.post(`/InsertVersionCommentReply`, data,{params: {doc_name:data.doc_name, docId: data.docId, doc_status: data.docStatus }});
      return res.data;
    } else {
      const res = await axios.post(`/InsertCommentReply`, {params: {doc_name: data.doc_name, doc_status: true, docId: data.docId}}, data);
      return res.data;
    }
  } catch (err) {
    throw new Error();
  }
};

export const updateReply = async (data) => {
  try {
    if (data.docVersionStatus === "version") {
      const res = await axios.put("/UpdateVersionCommentReply", data);
      return res.data;
    } else {
      const res = await axios.put("/UpdateCommentReply", data);
      return res.data;
    }
  } catch (err) {
    throw new Error();
  }
};

export const fetchComments = async (params) => {
  // console.log(params)
  try {
    const { docId, role, docVersionStatus } = params;


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
        const res = await axios.get(`/GetVersionCommentByUser?docId=${docId}`);
        return res.data;
      } else {
        const res = await axios.get(`/GetCommentByUser?docId=${docId}`);
        return res.data;
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteComment = async (params) => {

  try {
    if (params.docVersionStatus === "version") {
      const res = await axios.delete(`DeleteVersionComment/${params.id}`);
      return res.data;
    } else {
      const res = await axios.delete(`DeleteComment/${params.id}`);
      return res.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteReply = async (params) => {
  try {
    if (params.docVersionStatus === "version") {
      const res = await axios.delete(`DeleteVersionCommentReply/${params.id}`);
      return res.data;
    } else {
      const res = await axios.delete(`DeleteCommentReply/${params.id}`);
      return res.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};
