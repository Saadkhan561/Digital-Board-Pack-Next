import React, {useState, useEffect} from 'react';

const SideBar = ({prevValue, updateNewDocument}) => {
  const [isNewDocument, setNewDocument] = useState(prevValue)
  // console.log(isNewDocument);

  useEffect(() => {
    updateNewDocument(isNewDocument)
  },[isNewDocument] )

  return (
    <>
      {/* SIDE BAR DIV */}
      <div>
        <div className='text-xl font-semibold'>Digital Board Pack</div>
        <div onClick={() => setNewDocument(!isNewDocument)} className='flex justify-center p-2 border border-gray-400 rounded-xl items-center w-24 mt-4 ml-2 cursor-pointer shadow-2xl hover:duration-200 hover:bg-slate-100'>
          <div className='mr-2'>
            <img src='/images/plus.png' alt='' height={15} width={15} />
          </div>
          <div className='text-sm font-semibold'>New</div>
        </div>
        {/* SIDE BAR FULL SCREEN */}
        <div className='mt-4'>
          <ul className='text-md'>
            <li className='flex items-center mb-1 cursor-pointer p-2 hover:rounded-2xl hover:bg-slate-200 hover:duration-200'>
              <div className='mr-2'>
                <img
                  src='/images/dashboard.png'
                  alt=''
                  height={20}
                  width={20}
                />
              </div>
              <div>Dashboard</div>
            </li>
            <li className='flex items-center mb-1 cursor-pointer p-2 hover:rounded-2xl hover:bg-slate-200 hover:duration-200'>
              <div className='mr-2'>
                <img src='/images/calendar.png' alt='' height={20} width={20} />
              </div>
              <div>Calendar</div>
            </li>
            <li className='flex items-center mb-1 cursor-pointer p-2 hover:rounded-2xl hover:bg-slate-200 hover:duration-200'>
              <div className='mr-2'>
                <img src='/images/tools.png' alt='' height={20} width={20} />
              </div>
              <div>Tools</div>
            </li>
            <li className='flex items-center mb-1 cursor-pointer p-2 hover:rounded-2xl hover:bg-slate-200 hover:duration-200'>
              <div className='mr-2'>
                <img src='/images/meeting.png' alt='' height={20} width={20} />
              </div>
              <div>Scheduling</div>
            </li>
            <li className='flex items-center mb-1 cursor-pointer p-2 hover:rounded-2xl hover:bg-slate-200 hover:duration-200'>
              <div className='mr-2'>
                <img src='/images/email.png' alt='' height={20} width={20} />
              </div>
              <div>Share Document</div>
            </li>
          </ul>
        </div>
        {/* SIDE BAR MEDIUM SCREEN */}
        {/* <div className="mt-16 w-8 relative side_bar_full:hidden border border-black">
          <ul>
            <li className="cursor-pointer relative peer">
              <img src="/images/dashboard.png" alt="" height={30} width={30} />
              <div className="hidden absolute top-0 left-10 text-white bg-black text-xs p-[4px] items-center rounded-3xl peer-hover:block border border-black">
                Dashboard
              </div>
            </li>
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default SideBar;
