// import { Loader } from 'lucide-react'
import React from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex gap-4 items-center">
        <HashLoader size={30}/>
        <div className="text-xl font-semibold text-slate-900">Digital Board Pack</div>
      </div>
    </div>
  );
};

export default Loader;
