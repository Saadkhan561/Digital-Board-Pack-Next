import {
  insertDocument,
  uploadDocument,
  userAccessList,
} from "@/services/document.service";
import { insertMeeting } from "@/services/meeting.sevice,";
// import { insertAgendaDocument, uploadAgendaDocument } from "@/services/meeting.sevice,";
import { login, register } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";

// TO REGISTER USER
export const useRegisterUser = (options) => {
  return useMutation({
    mutationFn: register,
    ...options,
  });
};

// TO LOGIN USER
export const useLoginMutation = (options) => {
  return useMutation({
    mutationFn: login,
    ...options,
  });
};

// TO UPLOAD THE DOCUMENt ON CLOUD
export const useDocUploadMutation = (options) => {
  return useMutation({
    mutationFn: uploadDocument,
    ...options,
  });
};

// TO INSERT THE DOCUMENT INTO THE DATABASE
export const useInsertDocumentMutation = (option) => {
  return useMutation({
    mutationFn: insertDocument,
    ...option,
  });
};

// TO GIVE ACCESS OF DOCUMENT TO USERS
export const userAccessListMutation = (option) => {
  return useMutation({
    mutationFn: userAccessList,
    ...option,
  });
};

// TO SAVE THE MEETING
export const useInsertMeeting = (option) => {
  return useMutation({
    mutationFn: insertMeeting,
    ...option
  })
}