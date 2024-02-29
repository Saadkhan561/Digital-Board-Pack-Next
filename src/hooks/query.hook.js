import { useQuery } from "@tanstack/react-query";
import {
  fetchAllDocument,
  fetchDocumentById,
} from "@/services/document.service";
import { fetchAllUsers } from "@/services/user.service";

export const useFetchAllDocumentQuery = (options) => {
  return useQuery({
    ...options,
    queryKey: ["document"],
    queryFn: fetchAllDocument,
  });
};

export const useFetchDocumentById = (params, options) => {
  return useQuery({
    queryKey: ["document", JSON.stringify(params)],
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
