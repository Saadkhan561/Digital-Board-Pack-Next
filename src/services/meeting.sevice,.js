import useUserStore from "@/stores/useUserStore";
import { axios } from "../utils/axios";
import { insertDocument, uploadDocument } from "./document.service";

export const insertMeeting = async (data) => {
  try {
    const res = await axios.post("/insertMeeting", data);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateAgendaDocument = async (data) => {

  try {
    const res = await axios.put("/UpdateAgenda", data);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateMeetingMinDocument = async (data) => {
 
  try {
    const res = await axios.put("/UpdateMeetingMin", data);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllMeetings = async (params) => {
  try {
    const response = await axios.get(`/getMeetings`, { params });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserMeetings = async () => {
  try {
    const res = await axios.get("/showUserMeetings");
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMeetingById = async (params) => {
  const { id } = params;
  try {
    const res = await axios.get(`/getMeeting/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const scheduleMeeting = async (data) => {
 
  try {
    // const documentName = data.file[0].name.split(".")[0];
    const {value: doc_name} = await uploadDocument({
      docName: data.meeting_title,
      formData: data.formData,
    });
    const { value: documentId } = await insertDocument({
      title: data.meeting_title,
      doc_name: doc_name,
    });

    await insertMeeting({
      meeting_agenda: documentId,
      meeting_datetime: data.meeting_datetime,
      meeting_title: data.meeting_title,
      attenders: data.attenders,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const reScheduleMeeting = async(data) => {
 
  try {
    const res = await axios.put("/UpdateMeeting", data)
    return res.data
  } catch(error) {
    throw new Error(error)
  }
}


export const getMeetingDoc = async (params) => {
  const { id } = params;
  try {
    const res = await axios.get(`/getMeetingDoc/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteMeeting = async(data) => {

  try {
    const res = await axios.delete(`/deleteMeeting/${data.id}`)
    return res.data
  } catch(error) {
    throw new Error(error)
  }
}
