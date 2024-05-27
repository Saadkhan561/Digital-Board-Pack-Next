import { useQuery } from "@tanstack/react-query";
import {
  fetchAllDocument,
  fetchDocumentById,
  fetchOnlyDocumentId,
} from "@/services/document.service";
import { fetchAllUsers } from "@/services/user.service";
import { fetchAllDepartments } from "@/services/department.service";
import { getAllMeetings, getMeetingById } from "@/services/meeting.sevice,";
import {  fetchCommentsByDocId } from "@/services/comments.service";
import { search } from "@/services/search.service";

export const useFetchAllDocumentQuery = (params,options) => {
  return useQuery({
    ...options,
    queryKey: ["document"],
    queryFn: ()=>fetchAllDocument(params),
  });
};
export const useFetchDocumentById = (params, options) => {
  return useQuery({
    queryKey: ["documentById", JSON.stringify(params)],
    queryFn: () => fetchDocumentById(params),
    ...options,
  });
};

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

export const useFetchAllMeetings = (options) => {
  return useQuery({
    ...options,
    queryKey: ["meetings"],
    queryFn: getAllMeetings,
  });
};

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
    queryFn: () => fetchCommentsByDocId(params),
    ...options,
  });
};

export const useSearchDoc = (params, options) => {
  console.log(params)
  return useQuery({
    queryKey: ["search"],
    queryFn:()=> search(params),
    ...options
  })
}
