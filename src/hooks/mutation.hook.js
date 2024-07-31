import { adminCreateUser } from "@/services/admin.service";
import {
  deleteComment,
  deleteReply,
  insertCommentWithStatus,
  insertReplyWithStatus,
  updateComment,
  updateReply,
} from "@/services/comments.service";
import {
  deleteDocument,
  insertDocument,
  insertUpdatedDocument,
  meetingMinutesId,
  removeAccess,
  updateDocumentStatus,
  uploadDocument,
  userAccessList,
} from "@/services/document.service";
import {
  deleteMeeting,
  insertMeeting,
  reScheduleMeeting,
  scheduleMeeting,
  updateAgendaDocument,
  updateMeetingMinDocument,
} from "@/services/meeting.sevice,";
import { changeNotificationStatus } from "@/services/notification.service";
import {
  forgetPassword,
  login,
  register,
  resetPassword,
  setPassword,
} from "@/services/user.service";
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
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: scheduleMeeting,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["getUserMeetings"] });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useMeetingReScheduleMutation = (options) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: reScheduleMeeting,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["getUserMeetings"] });
      options?.onSuccess?.(data, variables, context);
    },
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

export const useAccessListMutation = (option) => {
  return useMutation({
    ...option,
    mutationFn: userAccessList,
  });
};

export const useRemoveAccessMutation = (option) => {
  return useMutation({
    ...option,
    mutationFn: removeAccess,
  });
};

// TO SAVE THE MEETING
export const useInsertMeeting = (option) => {
  return useMutation({
    ...option,
    mutationFn: insertMeeting,
  });
};

// TO DELETE THE MEETING
export const useDeleteMeeting = (options) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: async (params) => await deleteMeeting(params),
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["getUserMeetings"] });
      options?.onSuccess?.(data, variables, context);
    },
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
    mutationFn: insertCommentWithStatus,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["fetchComments"] });
      options?.onSuccess?.(data, variables, context);
    },
    async onError(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["fetchComments"] });
      options?.onError?.(data, variables, context);
    },
  });
};

export const useInsertReply = (options) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: insertReplyWithStatus,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["fetchComments"] });
      options?.onSuccess?.(data, variables, context);
    },
    async onError(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["fetchComments"] });
      options?.onError?.(data, variables, context);
    },
  });
};

export const useUpdateDocumentStatus = (options) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: updateDocumentStatus,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["fetchDocByUser"] });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useUpdateComment = (options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateComment,
    ...options,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["fetchComments"] });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useUpdateReply = (options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateReply,
    ...options,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["fetchComments"] });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useDeleteComment = (options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => deleteComment(params),
    ...options,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["fetchComments"] });
      options?.onSuccess?.(data, variables, context);
    },
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

export const useDeleteReply = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReply,
    ...options,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["fetchComments"] });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useForgetPassword = (options) => {
  return useMutation({
    mutationFn: forgetPassword,
    ...options,
  });
};

export const useResetPassword = (options) => {
  return useMutation({
    mutationFn: resetPassword,
    ...options,
  });
};

export const useSetPassword = (options) => {
  return useMutation({
    mutationFn: setPassword,
    ...options,
  });
};

export const useAdminCreateUser = (options) => {
  return useMutation({
    mutationFn: adminCreateUser,
    ...options,
  });
};

export const useChangeNotificationStatus = (options) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: changeNotificationStatus,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({
        queryKey: ["getUserNotificationCount"],
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
};
