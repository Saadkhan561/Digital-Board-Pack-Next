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
export const useFetchAllUsers = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await fetchAllUsers(params),
    queryKey: [fetchAllUsers.name, params && JSON.stringify(params)],
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
export const useFetchAllUserMeetings = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await getAllUserMeetings(params),
    queryKey: [getAllUserMeetings.name, JSON.stringify(params)],
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

export const useGetAllMeetings = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await getAllMeetings(params),
    queryKey: [getAllMeetings.name, JSON.stringify(params)],
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

export const useGetAllDocuments = (params, options) => {
  return useQuery({
    ...options,
    queryFn: async () => await getAllDocuments(params),
    queryKey: [getAllDocuments.name, JSON.stringify(params)],
  });
};

// export const useGetNotifications = (options) => {
//   return useQuery({
//     ...options,
//     queryFn: getNotifications,
//     queryKey: [getNotifications.name],
//   });
// };

// export const useGetNotifications= (params,options) =>  useInfiniteQuery({
//   queryKey:[],/''
//   queryFn: async
//   ({ pageParam }) => await getNotifications(pageParam),
//   ]linitialPageParam: 1,
//   ...options,
//   getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
//     lastPage.nextCursor,
//   getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
//     firstPage.prevCursor,
// })

export const useGetNotifications = (options) =>
  useInfiniteQuery({
    ...options,
    queryKey: [getNotifications.name],
    queryFn: async ({ pageParam }) =>
      await getNotifications({ PageParam: pageParam, LimitParam: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
    
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });


  