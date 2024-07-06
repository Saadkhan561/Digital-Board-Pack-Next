import {
  deleteComment,
  deleteReply,
  fetchComments,
  insertComment,
  insertReply,
  updateComment,
  updateReply,
} from "@/services/comments.service";
import {
  deleteDocument,
  insertDocument,
  insertUpdatedDocument,
  meetingMinutesId,
  uploadDocument,
  userAccessList,
} from "@/services/document.service";
import {
  insertMeeting,
  scheduleMeeting,
  updateAgendaDocument,
  updateMeetingMinDocument,
} from "@/services/meeting.sevice,";
import { login, register } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// TO REGISTER USER
export const useRegisterUser = (options) => {
  return useMutation({
    ...options,
    mutationFn: register,
  });
};

// TO LOGIN USER
export const useLoginMutation = (options) => {
  return useMutation({
    ...options,
    mutationFn: login,
  });
};

// TO UPLOAD THE DOCUMENt ON CLOUD
export const useDocUploadMutation = (options) => {
  return useMutation({
    ...options,
    mutationFn: uploadDocument,
  });
};

export const useMeetingScheduleMutation = (options) => {
  return useMutation({
    ...options,
    mutationFn: scheduleMeeting,
  });
};

// TO INSERT UPDATED DOCUMENT
export const useInsertUpdatedDocument = (options) => {
  return useMutation({
    ...options,
    mutationFn: insertUpdatedDocument,
  });
};

// TO INSERT THE DOCUMENT INTO THE DATABASE
export const useInsertDocumentMutation = (option) => {
  return useMutation({
    ...option,
    mutationFn: insertDocument,
  });
};

// TO DELETE A DOCUMENT
export const useDeleteDocument = (option) => {
  return useMutation({
    ...option,
    mutationFn: deleteDocument,
  });
};

// TO GIVE ACCESS OF DOCUMENT TO USERS
export const userAccessListMutation = (option) => {
  return useMutation({
    ...option,
    mutationFn: userAccessList,
  });
};

// TO SAVE THE MEETING
export const useInsertMeeting = (option) => {
  return useMutation({
    ...option,
    mutationFn: insertMeeting,
  });
};

export const useMeetingMinutesId = (options) => {
  return useMutation({
    ...options,
    mutationFn: async (params) => await meetingMinutesId(params),
  });
};

export const useInsertComment = (options) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: insertComment,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: [fetchComments.name] });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useInsertReply = (options) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: insertReply,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: [fetchComments.name] });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useUpdateComment = (options) => {
  return useMutation({
    mutationFn: updateComment,
    ...options,
  });
};

export const useUpdateReply = (options) => {
  return useMutation({
    mutationFn: updateReply,
    ...options,
  });
};

export const useDeleteComment = (options) => {
  return useMutation({
    mutationFn: (params) => deleteComment(params),
    ...options,
  });
};

export const useUpdateAgendaDocument = (options) => {
  return useMutation({
    mutationFn: updateAgendaDocument,
    ...options,
  });
};

export const useUpdateMeetingMinDocument = (options) => {
  return useMutation({
    mutationFn: updateMeetingMinDocument,
    ...options,
  });
};

export const useDeleteReply = (options) => {
  return useMutation({
    mutationFn: (params) => deleteReply(params),
    ...options,
  });
};
