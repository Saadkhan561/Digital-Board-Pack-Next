import React from "react";

const Replies = () => {
  return (
    <div className="flex gap-5 p-2">
      <div className="border h-fit mt-2 rounded-full p-2">
        <img src="/images/account.png" alt="" height={20} width={20} />
      </div>
      <div className="p-2 w-4/5 ml-2">
        <div className="flex gap-5 items-center">
          <p className="text-md font-semibold">Senior Manager</p>
          <p className="text-gray-500 text-sm">1 Nov</p>
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          harum veritatis eius saepe blanditiis voluptatibus beatae iste
          accusamus impedit nostrum reprehenderit fugit ab nobis, sint ullam,
          quos unde explicabo? Quae.
        </div>
      </div>
    </div>
  );
};

export default Replies;
