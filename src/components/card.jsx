import Link from "next/link";
import React from "react";
// import {Link} from 'react-router-dom'

const Card = ({ docId, docName, title, versions }) => {
  return (
    <Link
      href={`/card_details?id=${docId}`}
      className="w-[170px] mob_screen:w-[130px] card_div_sm:w-screen border border-slate-400 rounded-2xl cursor-pointer hover:scale-105 duration-100"
    >
      <div>
        <img className="object-contain" src="/images/pdf.png" alt=""/>
      </div>
      <div className="p-2">
        <div className="font-semibold text-md">{title}</div>
        <div className="text-gray-600 text-xs">Added on - 03/09/23</div>
        <div className="text-gray-600 text-xs">No of versions - {versions}</div>
      </div>
    </Link>
  );
};

export default Card;
