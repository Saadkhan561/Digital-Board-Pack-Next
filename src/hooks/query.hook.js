import { useQuery } from "@tanstack/react-query";
import {
  fetchAllDocument,
  fetchDocByUser,
  fetchDocumentById,
} from "@/services/document.service";
import { fetchAllUsers } from "@/services/user.service";
import { fetchAllDepartments } from "@/services/department.service";
import { getAllMeetings, getMeetingById, getUserMeetings } from "@/services/meeting.sevice,";
import { fetchComments } from "@/services/comments.service";
import { search } from "@/services/search.service";

export const useFetchAllDocument = (params, options) => {
  return useQuery({
    queryKey: ["document", params && (JSON.stringify(params))],
    queryFn: () => fetchAllDocument(params),
    ...options,
  });
};
export const useFetchDocumentById = (params, options) => {
  return useQuery({
    queryKey: ["documentById", JSON.stringify(params)],
    queryFn: () => fetchDocumentById(params),
    ...options,
  });
};

// FETCH ALLOWED DOCUMENTS
export const useFetchDocByUser = (options) => {
  return useQuery({
    queryKey: ["documentByUser"],
    queryFn: fetchDocByUser,
    ...options
  })
}

// QUERY TO FETCH ALL USERS
export const useFetchAllUsers = (options) => {
  return useQuery({
    ...options,
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });
};

// TO FETCH ALL DEPARTMENTS
export const useAllDepartments = (options) => {
  return useQuery({
    ...options,
    queryKey: ["department"],
    queryFn: fetchAllDepartments,
  });
};

// TO FETCH ALL MEETINGS
export const useFetchAllMeetings = (params, options) => {
  return useQuery({
    ...options,
    queryKey: ["meetings"],
    queryFn: () => getAllMeetings(params),
  });
};

// TO FETCH ONLY USER'S MEETINGS
export const useGetUserMeetings = (options) => {
  return useQuery({
    ...options,
    queryFn: ["userMeetings"],
    queryFn: getUserMeetings
  })
}

// TO FETCH A PARTICULAR MEETING
export const useFetchMeetingById = (params, options) => {
  return useQuery({
    ...options,
    queryKey: ["meeting", JSON.stringify(params)],
    queryFn: () => getMeetingById(params),
  });
};

export const useFetchComments = (params, options) => {
  return useQuery({
    querykey: ["comments", JSON.stringify(params)],
    queryFn: () => fetchComments(params),
    ...options,
  });
};

export const useSearchDoc = (params, options) => {
  console.log(params);
  return useQuery({
    queryKey: ["search"],
    queryFn: () => search(params),
    ...options,
  });
};
