import { upload_doc } from "@/services/document.service";
import { login, register } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";
// import { login, register } from "../services/user.service";
// import { upload_doc } from "../services/document.service";

export const useRegisterUser = (options) => {
  return useMutation({
    ...options,
    mutationFn: register,
  });
};

export const useLoginMutation = (options) => {
  return useMutation({
    ...options,
    mutationFn: login,
  });
};

export const useDocUploadMutation = (options) => {
  return useMutation({
    ...options,
    mutationFn: upload_doc,
  })
}


