import { fetchComments } from "@/services/comments.service";
import { fetchAllDepartments } from "@/services/department.service";
import {
  fetchDocByUser,
  fetchDocumentById,
  getAllDocuments,
} from "@/services/document.service";
import {
  getAllMeetings,
  getAllUserMeetings,
  getMeetingById,
  getUserMeetings,
} from "@/services/meeting.sevice,";
import { getNotifications } from "@/services/notifcation.service";
import { search } from "@/services/search.service";
import { fetchAccessedUsers, fetchAllUsers } from "@/services/user.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useFetchDocumentById = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await fetchDocumentById(params),
    queryKey: ["fetchDocumentById", JSON.stringify(params)],
  });
};

export const useFetchComments = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await fetchComments(params),
    queryKey: ["fetchComments", JSON.stringify(params)],
  });
};

// FETCH ALLOWED DOCUMENTS
export const useFetchDocByUser = (options) => {
  return useQuery({
    ...options,
    queryFn: fetchDocByUser,
    queryKey: ["fetchDocByUser"],
  });
};

// QUERY TO FETCH ALL USERS
export const useFetchAllUsers = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await fetchAllUsers(params),
    queryKey: ["fetchAllUsers", params && JSON.stringify(params)],
  });
};

// QUERY TO FETCH ACCESSED USERS
export const useFetchAccessedUsers = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await fetchAccessedUsers(params),
    queryKey: ["fetchAccessedUsers", JSON.stringify(params)],
  });
};

// TO FETCH ALL DEPARTMENTS
export const useAllDepartments = (options) => {
  return useQuery({
    ...options,
    queryFn: fetchAllDepartments,
    queryKey: ["fetchAllDepartments"],
  });
};

// TO FETCH ALL MEETINGS

// TO FETCH ONLY USER'S MEETINGS
export const useGetUserMeetings = (options) => {
  return useQuery({
    ...options,
    queryFn: getUserMeetings,
    queryKey: ["getUserMeetings"],
  });
};

export const useGetAllMeetings = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await getAllMeetings(params),
    queryKey: ["getAllMeetings", JSON.stringify(params)],
  });
};

// TO FETCH A PARTICULAR MEETING
export const useFetchMeetingById = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await getMeetingById(params),
    queryKey: ["getMeetingById", JSON.stringify(params)],
  });
};

export const useSearchDoc = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await search(params),
    queryKey: ["search", JSON.stringify(params)],
  });
};

export const useGetAllDocuments = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await getAllDocuments(params),
    queryKey: ["getAllDocuments", JSON.stringify(params)],
  });
};

export const useGetNotifications = (options) =>
  useInfiniteQuery({
    ...options,
    queryKey: ["getNotifications"],
    queryFn: async ({ pageParam }) =>
      await getNotifications({ PageParam: pageParam, LimitParam: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });


  
