import {
  insertDocument,
  uploadDocument,
  userAccessList,
} from "@/services/document.service";
import { login, register } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";

export const useRegisterUser = (options) => {
  return useMutation({
    mutationFn: register,
    ...options,
  });
};

export const useLoginMutation = (options) => {
  return useMutation({
    mutationFn: login,
    ...options,
  });
};

export const useDocUploadMutation = (options) => {
  return useMutation({
    mutationFn: uploadDocument,
    ...options,
  });
};

export const useInsertDocumentMutation = (option) => {
  return useMutation({
    mutationFn: insertDocument,
    ...option,
  });
};
// export const useAddPermissionMutation = (option) => {
//   return useMutation({
//     mutationFn: userAccessList,
//     ...option,
//   });
// };

export const userAccessListMutation = (option) => {
  return useMutation({
    mutationFn: userAccessList,
    ...option,
  });
};
