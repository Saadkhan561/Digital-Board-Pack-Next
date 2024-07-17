import moment from 'moment'
import React from 'react'

const VersionModalReplies = ({replyData}) => {
  return (
    <div className="flex justify-between gap-2">
    <div className="flex gap-5 p-2 items-center">
      <div className="border h-fit mt-2 rounded-full p-2">
        <img src="/images/account.png" alt="" height={18} width={18} />
      </div>
      <div className="p-2 w-4/5 ml-2">
        <div className="flex gap-5 items-center">
          <p className="text-sm font-semibold">{replyData.user_name}</p>
          <p className="text-gray-500 text-xs">
            {moment(replyData.created_at).format("DD MMM")}
          </p>
          <p className="text-gray-500 text-xs">
            {moment(replyData.created_at).format("HH:mm")}
          </p>
        </div>
        <div className="text-sm menu_bar_div:text-xs">{replyData.comment}</div>
      </div>
    </div>
  </div>
  )
}

export default VersionModalReplies