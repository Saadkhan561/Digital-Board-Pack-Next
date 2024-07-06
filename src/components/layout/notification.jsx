import Image from "next/image";
import React from "react";

const Notification = () => {
  return (
    <div className="">
      <ul className="p-2">
        <li className="flex gap-4 items-center mb-2 p-2 w-full hover:bg-slate-200 rounded-xl duration-200">
          <div className="border rounded-full p-1">
            <Image src="/images/account.png" alt="" height={30} width={30} />
          </div>
          <div>
            <div className="text-sm font-semibold mb-1">
              Manager shared a meeting document
            </div>
            <div className="text-blue-500 font-semibold text-xs">
              2 days ago
            </div>
          </div>
        </li>
        <li className="flex gap-4 items-center mb-2 p-2 w-full hover:bg-slate-200 rounded-xl duration-200">
          <div className="border rounded-full p-1">
            <Image src="/images/account.png" alt="" height={30} width={30} />
          </div>
          <div>
            <div className="text-sm font-semibold mb-1">
              Manager shared a meeting document
            </div>
            <div className="text-blue-500 font-semibold text-xs">
              2 days ago
            </div>
          </div>
        </li>
        <li className="flex gap-4 items-center mb-2 p-2 w-full hover:bg-slate-200 rounded-xl duration-200">
          <div className="border rounded-full p-1">
            <Image src="/images/account.png" alt="" height={30} width={30} />
          </div>
          <div>
            <div className="text-sm font-semibold mb-1">
              Manager shared a meeting document
            </div>
            <div className="text-blue-500 font-semibold text-xs">
              2 days ago
            </div>
          </div>
        </li>
        <li className="flex gap-4 items-center mb-2 p-2 w-full hover:bg-slate-200 rounded-xl duration-200">
          <div className="border rounded-full p-1">
            <Image src="/images/account.png" alt="" height={30} width={30} />
          </div>
          <div>
            <div className="text-sm font-semibold mb-1">
              Manager shared a meeting document
            </div>
            <div className="text-blue-500 font-semibold text-xs">
              2 days ago
            </div>
          </div>
        </li>
        <li className="flex gap-4 items-center mb-2 p-2 w-full hover:bg-slate-200 rounded-xl duration-200">
          <div className="border rounded-full p-1">
            <Image src="/images/account.png" alt="" height={30} width={30} />
          </div>
          <div>
            <div className="text-sm font-semibold mb-1">
              Manager shared a meeting document
            </div>
            <div className="text-blue-500 font-semibold text-xs">
              2 days ago
            </div>
          </div>
        </li>
        <li className="flex gap-4 items-center mb-2 p-2 w-full hover:bg-slate-200 rounded-xl duration-200">
          <div className="border rounded-full p-1">
            <Image src="/images/account.png" alt="" height={30} width={30} />
          </div>
          <div>
            <div className="text-sm font-semibold mb-1">
              Manager shared a meeting document
            </div>
            <div className="text-blue-500 font-semibold text-xs">
              2 days ago
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Notification;
