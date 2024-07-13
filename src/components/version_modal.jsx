import React, { version } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFetchComments } from "@/hooks/query.hook";
import useUserStore from "@/stores/useUserStore";
import { Download } from "lucide-react";
import Comment from "./card_details/comments";

const VersionModal = ({
  versionData,
  modalState,
  setModalState,
  docVersionStatus,
}) => {
  const { currentUser } = useUserStore();

  const doc_name = versionData?.doc_name.split(".")[0];
  console.log(versionData);

  const { data: comments, refetch: refetchComments } = useFetchComments({
    docId: versionData?.doc_id,
    role: currentUser.roles,
    docVersionStatus,
  });

  console.log(comments);

  return (
    <Dialog
      open={modalState}
      modal
      onOpenChange={() => setModalState((prev) => !prev)}
    >
      <DialogContent>
        <div className="flex justify-between items-center mt-4">
          <DialogTitle>{doc_name}</DialogTitle>
          <div className="flex items-center">
            <div className="p-1 cursor-pointer text-sm rounded-lg border border-gray-400 mr-4 hover:bg-slate-100 duration-200">
              <button>
                <a
                  href={`/pdf/${doc_name}/${versionData?.doc_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 font-semibold"
                >
                  Open PDF
                </a>
              </button>
            </div>
            <Download className="h-4 w-4 cursor-pointer" />
          </div>
        </div>
        {/* COMMENT DIV */}
        <div className="border border-black">
          {comments?.length === 0 ? (
            <div className="flex justify-center text-slate-500 items-center">No comments...</div>
          ) : (
            comments
              ?.map((comment, index) => {
                return (
                  <Comment
                    user_name={comment.user_name}
                    data={comment}
                    key={index}
                    comment={comment.comment_id}
                    roles={comment.roles}
                    commentator_id={comment.commentator_id}
                    refetchComments={refetchComments}
                  />
                );
              })
              .reverse()
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VersionModal;
