import { useQuery } from "@tanstack/react-query";
import {
  fetchAllDocument,
  fetchDocumentById,
  fetchOnlyDocumentId,
} from "@/services/document.service";
import { fetchAllUsers } from "@/services/user.service";
import { fetchAllDepartments } from "@/services/department.service";

export const useFetchAllDocumentQuery = (options) => {
  return useQuery({
    ...options,
    queryKey: ['document'],
    queryFn: fetchAllDocument,
  });
}; 
export const useFetchDocumentById = (params, options) => {
  return useQuery({
    queryKey: ['documentById', JSON.stringify(params)],
    queryFn: () => fetchDocumentById(params),
    ...options,
  });
};

// QUERY TO FETCH ALL USERS
export const useFetchAllUsers = (options) => {
  return useQuery({
    ...options,
    queryKey: ['users'],
    queryFn: fetchAllUsers,
  });
};

// export const useDocumentOnlyId = (options) => {
//   return useQuery({
//     ...options,
//     queryKey: ["document_only_id"],
//     queryFn: fetchOnlyDocumentId,
//   });
// };

// TO FETCH ALL DEPARTMENTS
export const useAllDepartments = (options) => {
  return useQuery({
    ...options,
    queryKey: ["department"],
    queryFn: fetchAllDepartments,
  });
};
