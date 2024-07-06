import Image from "next/image";
import React from "react";

const Share = () => {
  return (
    <div className="share_doc_div">
      <div className="flex justify-between mt-4 items-center p-1">
        <div className="text-lg font-semibold">Sales in January</div>
        <div>
          <button className="w-24 text-sm flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200">
            <Image src="/images/share.png" alt="" height={15} width={15} />
            Share
          </button>
        </div>
      </div>
      <div>
        <div className="sticky top-0 shadow-md bg-white w-full">
          <input
            className="w-full border border-slate-300 rounded-md p-1 mt-2 focus:outline-blue-400"
            type="text"
            id="search"
            placeholder="Search here"
          />
        </div>
        <div className="flex justify-between mt-4 border-b pb-2">
          <div className="flex gap-2 items-center">
            <Image src="/images/account.png" alt="" height={20} width={20} />
            <p>Saad Nadeem Khan</p>
          </div>
          <input className="cursor-pointer" type="checkbox" id="checkbox" />
        </div>
        <div className="flex justify-between mt-4 border-b pb-2">
          <div className="flex gap-2 items-center">
            <Image src="/images/account.png" alt="" height={20} width={20} />
            <p>Saad Nadeem Khan</p>
          </div>
          <input className="cursor-pointer" type="checkbox" id="checkbox" />
        </div>
        <div className="flex justify-between mt-4 border-b pb-2">
          <div className="flex gap-2 items-center">
            <Image src="/images/account.png" alt="" height={20} width={20} />
            <p>Saad Nadeem Khan</p>
          </div>
          <input className="cursor-pointer" type="checkbox" id="checkbox" />
        </div>
        <div className="flex justify-between mt-4 border-b pb-2">
          <div className="flex gap-2 items-center">
            <Image src="/images/account.png" alt="" height={20} width={20} />
            <p>Saad Nadeem Khan</p>
          </div>
          <input className="cursor-pointer" type="checkbox" id="checkbox" />
        </div>
        <div className="flex justify-between mt-4 border-b pb-2">
          <div className="flex gap-2 items-center">
            <Image src="/images/account.png" alt="" height={20} width={20} />
            <p>Saad Nadeem Khan</p>
          </div>
          <input className="cursor-pointer" type="checkbox" id="checkbox" />
        </div>
        <div className="flex justify-between mt-4 border-b pb-2">
          <div className="flex gap-2 items-center">
            <Image src="/images/account.png" alt="" height={20} width={20} />
            <p>Saad Nadeem Khan</p>
          </div>
          <input className="cursor-pointer" type="checkbox" id="checkbox" />
        </div>
      </div>
    </div>
  );
};

export default Share;
