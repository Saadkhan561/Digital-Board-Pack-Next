import { deleteComment, deleteReply, insertComment, insertReply, updateComment, updateReply } from "@/services/comments.service";
import {
  deleteDocument,
  insertDocument,
  insertUpdatedDocument,
  meetingMinutesId,
  uploadDocument,
  userAccessList,
} from "@/services/document.service";
import { insertMeeting, updateAgendaDocument, updateMeetingMinDocument } from "@/services/meeting.sevice,";
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

// TO INSERT UPDATED DOCUMENT
export const useInsertUpdatedDocument = (options) => {
  return useMutation({
    mutationFn: insertUpdatedDocument,
    ...options
  })
}

// TO INSERT THE DOCUMENT INTO THE DATABASE
export const useInsertDocumentMutation = (option) => {
  return useMutation({
    mutationFn: insertDocument,
    ...option,
  });
};

// TO DELETE A DOCUMENT
export const useDeleteDocument=(option) => {
  return useMutation({
    mutationFn: deleteDocument,
    ...option
  })
}

// TO GIVE ACCESS OF DOCUMENT TO USERS
export const userAccessListMutation = (option) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation({
    mutationFn: userAccessList,
    ...option,
  });
};

// TO SAVE THE MEETING
export const useInsertMeeting = (option) => {
  return useMutation({
    mutationFn: insertMeeting,
    ...option,
  });
};

export const useMeetingMinutesId = (options) => {
  return useMutation({
    mutationFn: (params) => meetingMinutesId(params),
    ...options,
  });
};

export const useInsertComment = (options) => {
  return useMutation({
    mutationFn: insertComment,
    ...options
  })
}

export const useInsertReply = (options) => {
  return useMutation({
    mutationFn: insertReply,
    ...options
  })
}

export const useUpdateComment = (options) => {
  return useMutation({
    mutationFn: updateComment,
    ...options
  })
}

export const useUpdateReply = (options) => {
  return useMutation({
    mutationFn: updateReply,
    ...options
  })
}

export const useDeleteComment = (options) => {
  return useMutation({
    mutationFn: (params) => deleteComment(params),
    ...options
  })
}

export const useUpdateAgendaDocument= (options) => {
  return useMutation({
    mutationFn: updateAgendaDocument,
    ...options
  })
}

export const useUpdateMeetingMinDocument= (options) => {
  return useMutation({
    mutationFn: updateMeetingMinDocument,
    ...options
  })
}

export const useDeleteReply = (options) => {
  return useMutation({
    mutationFn: (params) => deleteReply(params),
    ...options
  })
}

