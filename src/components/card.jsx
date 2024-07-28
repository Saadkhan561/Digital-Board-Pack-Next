import { useUpdateDocumentStatus } from "@/hooks/mutation.hook";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Bounce } from "react-toastify";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Card = ({ docData }) => {
  const fileExtIndex = docData.doc_name?.lastIndexOf(".");
  const fileExt = docData.doc_name?.slice(fileExtIndex + 1);
  const { push } = useRouter();
  const { mutate: changeStatus } = useUpdateDocumentStatus({
    onError(error) {
      error.error.message,
        {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        };
    },
  });

  const onDocumentClick = () => {
    console.log(docData.doc_id);
    if (!docData.doc_status) {
      changeStatus({ docId: docData.doc_id });
    }
    push(`/card_details?id=${docData.doc_id}`);
  };
  return (
    <div
      onClick={onDocumentClick}
      className={`w-[150px] mob_screen:w-[130px] card_div_sm:w-screen border ${
        !docData.doc_status && "shadow-lg shadow-black/50"
      } "border-slate-400"  rounded-b-lg cursor-pointer hover:scale-105 duration-100`}
    >
      <div className="">
        <img
          className=" object-contain"
          src={fileExt === "pdf" ? "/images/pdf.png" : "/images/word.png"}
          alt=""
        />
      </div>
      <div className="p-2">
        <div className="font-semibold text-md">{docData.title}</div>
        <div className="text-gray-600 text-xs">
          {moment(docData?.created_at).format("DD MMMM")}
        </div>
        <div className="text-gray-600 text-xs">
          No of versions - {docData.docVersions.length}
        </div>
      </div>
    </div>
  );
};

export default Card;
