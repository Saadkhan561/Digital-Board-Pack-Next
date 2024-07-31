import moment from "moment";
import { useState } from "react";
import VersionModalReplies from "./versionModalReplies";

const VersionModalComments = ({
  data: commentData,
  user_name,
  docVersionStatus,
}) => {
  const [isViewReply, setViewReply] = useState(false);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <div className="border h-fit mt-2 rounded-full p-2">
            <img
              className="menu_bar_div:h-[10px] menu_bar_mob:w-[10px]"
              src="/images/account.png"
              alt=""
              height={18}
              width={18}
            />
          </div>
          <div className="p-2 w-full ml-2">
            <div className="flex justify-between">
              <div>
                <div className="flex gap-5 items-center">
                  <p className=" menu_bar_mob:text-xs font-semibold">
                    {user_name}
                  </p>
                  <p className="text-gray-500 text-xs menu_bar_mob:text-xs">
                    {moment(commentData?.created_at).format("DD MMM")}
                  </p>
                  <p className="text-gray-500 text-xs menu_bar_mob:text-xs">
                    {moment(commentData?.created_at).format("HH:mm")}
                  </p>
                </div>
                <div>{commentData.comment}</div>
              </div>
            </div>
            <div className="text-gray-400 text-md mt-2">
              <p className="flex gap-5 text-sm menu_bar_mob:text-xs">
                <div className="flex gap-2">
                  <a onClick={() => setViewReply(!isViewReply)} href="#">
                    View Replies
                  </a>
                </div>
              </p>
            </div>
            {isViewReply && (
              <div>
                {commentData.replies.map((reply) => (
                  <VersionModalReplies
                    key={reply.comment_id}
                    replyData={reply}
                    commentator_id={reply.commentator_id}
                    docVersionStatus={docVersionStatus}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionModalComments;
