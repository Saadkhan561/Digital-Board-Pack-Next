import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ docData }) => {
  const fileExtIndex = docData.doc_name?.lastIndexOf(".");
  const fileExt = docData.doc_name?.slice(fileExtIndex + 1);

  return (
    <Link
      href={`/card_details?id=${docData.doc_id}`}
      className="w-[150px] mob_screen:w-[130px] card_div_sm:w-screen border border-slate-400 rounded-b-lg cursor-pointer hover:scale-105 duration-100"
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
        <div className="text-gray-600 text-xs">{moment(docData?.created_at).format('DD MMMM')}</div>
        <div className="text-gray-600 text-xs">No of versions - {docData.docVersions.length}</div>
      </div>
    </Link>
  );
};

export default Card;
