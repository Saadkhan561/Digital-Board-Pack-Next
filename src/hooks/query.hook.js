import { useQuery } from "@tanstack/react-query";
import {
  fetchAllDocument,
  fetchDocByUser,
  fetchDocumentById,
} from "@/services/document.service";
import { fetchAccessedUsers, fetchAllUsers } from "@/services/user.service";
import { fetchAllDepartments } from "@/services/department.service";
import {
  getAllMeetings,
  getMeetingById,
  getUserMeetings,
} from "@/services/meeting.sevice,";
import { fetchComments } from "@/services/comments.service";
import { search } from "@/services/search.service";

export const useFetchDocumentById = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await fetchDocumentById(params),
    queryKey: [fetchDocumentById.name, JSON.stringify(params)],
  });
};

export const useFetchComments = (params, options) => {

  return useQuery({
    ...options,
    queryFn: async () => await fetchComments(params),
    queryKey: [fetchComments.name, JSON.stringify(params)],
  });
};

// FETCH ALLOWED DOCUMENTS
export const useFetchDocByUser = (options) => {
  return useQuery({
    ...options,
    queryFn: fetchDocByUser,
    queryKey: [fetchDocByUser.name],
  });
};

// QUERY TO FETCH ALL USERS
export const useFetchAllUsers = (options) => {
  return useQuery({
    ...options,
    queryFn: fetchAllUsers,
    queryKey: [fetchAllUsers.name],
  });
};

// QUERY TO FETCH ACCESSED USERS
export const useFetchAccessedUsers = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await fetchAccessedUsers(params),
    queryKey: [fetchAccessedUsers.name, JSON.stringify(params)],
  });
};

// TO FETCH ALL DEPARTMENTS
export const useAllDepartments = (options) => {
  return useQuery({
    ...options,
    queryFn: fetchAllDepartments,
    queryKey: [fetchAllDepartments.name],
  });
};

// TO FETCH ALL MEETINGS
export const useFetchAllMeetings = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await getAllMeetings(params),
    queryKey: [getAllMeetings.name, JSON.stringify(params)],
  });
};

// TO FETCH ONLY USER'S MEETINGS
export const useGetUserMeetings = (options) => {
  return useQuery({
    ...options,
    queryFn: getUserMeetings,
    queryKey: [getUserMeetings.name],
  });
};

// TO FETCH A PARTICULAR MEETING
export const useFetchMeetingById = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await getMeetingById(params),
    queryKey: [getMeetingById.name, JSON.stringify(params)],
  });
};

export const useSearchDoc = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await search(params),
    queryKey: [search.name, JSON.stringify(params)],
  });
};
