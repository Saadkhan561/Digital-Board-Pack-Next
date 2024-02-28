import Notification from "@/components/layout/notification";
import Search from "@/components/layout/searchBar";
import NewDocument from "@/components/new_document";
import Link from "next/link";
import { useEffect, useState } from "react";

// FOR TOAST
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout({ children }) {
  const [menu, setMenu] = useState(false);
  const [notify, setNotify] = useState(false);
  const [isNewDocument, setNewDocument] = useState(false);

  // const loggedIn = localStorage.getItem('loggen_in')
  // const username = localStorage.getItem('username')

const userToast = () => toast(username, "logged in successfully!")

  const updateNewDocument = (newDocumentVal) => {
    setNewDocument(newDocumentVal);
  };

  const renderNewDocument = () => {
    if (isNewDocument) {
      return (
        <NewDocument
          prevNewDocument={isNewDocument}
          updateNewDocument={updateNewDocument}
        />
      );
    }
  };

  return (
    <div className="flex relative overflow-x-hidden h-screen">
      <div>
        <ToastContainer />
      </div>
      {/* SIDE BAR */}
      <div
        className={
          isNewDocument
            ? "p-4 h-screen w-[300px] mob_screen:hidden opacity-50"
            : "p-4 h-screen w-[300px] mob_screen:hidden"
        }
      >
        {/* SIDE BAR DIV */}
        <div>
          <div className="text-xl font-semibold">Digital Board Pack</div>
          <div
            onClick={() => setNewDocument(!isNewDocument)}
            className="flex justify-center p-2 border border-gray-400 rounded-xl items-center w-24 mt-4 ml-2 cursor-pointer shadow-2xl hover:duration-200 hover:bg-slate-100"
          >
            <div className="mr-2">
              <img src="/images/plus.png" alt="" height={15} width={15} />
            </div>
            <div className="text-sm font-semibold">New</div>
          </div>
          {/* SIDE BAR FULL SCREEN */}
          <div className="mt-4">
            <ul className="text-md">
              <li className="flex items-center mb-1 cursor-pointer p-2 hover:rounded-2xl hover:bg-slate-200 hover:duration-200">
                <div className="mr-2">
                  <img
                    src="/images/dashboard.png"
                    alt=""
                    height={20}
                    width={20}
                  />
                </div>
                <div>Dashboard</div>
              </li>
              <li className="flex items-center mb-1 cursor-pointer p-2 hover:rounded-2xl hover:bg-slate-200 hover:duration-200">
                <div className="mr-2">
                  <img
                    src="/images/calendar.png"
                    alt=""
                    height={20}
                    width={20}
                  />
                </div>
                <div>Calendar</div>
              </li>
              <li className="flex items-center mb-1 cursor-pointer p-2 hover:rounded-2xl hover:bg-slate-200 hover:duration-200">
                <div className="mr-2">
                  <img src="/images/tools.png" alt="" height={20} width={20} />
                </div>
                <div>Tools</div>
              </li>
              <li className="flex items-center mb-1 cursor-pointer p-2 hover:rounded-2xl hover:bg-slate-200 hover:duration-200">
                <div className="mr-2">
                  <img
                    src="/images/meeting.png"
                    alt=""
                    height={20}
                    width={20}
                  />
                </div>
                <div>Scheduling</div>
              </li>
              <li className="flex items-center mb-1 cursor-pointer p-2 hover:rounded-2xl hover:bg-slate-200 hover:duration-200">
                <div className="mr-2">
                  <img src="/images/email.png" alt="" height={20} width={20} />
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
        {/* <SideBar
          prevValue={isNewDocument}
          updateNewDocument={updateNewDocument}
        /> */}
      </div>
      {/* MIDDLE DIV */}
      <div
        className={
          menu || isNewDocument
            ? "w-full opacity-50 duration-200 relative"
            : "w-full opacity-100 duration-200 relative"
        }
      >
        {/* SEARCH BAR DIV */}
        <div className="flex justify-between items-center p-4">
          {/* SEARCH BAR */}
          <Search />
          {/* FULL SCREEM NOTIFICATION DIV */}
          <div className="flex items-center mob_screen:hidden">
            <div className="relative cursor-pointer">
              <div onClick={() => setNotify(!notify)}>
                <img src="/images/notify.png" alt="" height={25} width={25} />
              </div>
              {/* NOTIFICATION DIV */}
              <div
                className={
                  notify ? "notification-div" : "notification-div hidden"
                }
              >
                <Notification />
              </div>
              
            </div>
            <Link
              href="register"
              className="cursor-pointer border border-gray-400 rounded-full w-8 h-8 ml-2"
            >
              <img src="/images/account.png" alt="" height={28} width={28} />
            </Link>
          </div>
          {/* SMALL SCREEM NOTIFICATION DIV */}
          <div className="relative flex gap-2 items-center mob_screen_closed:hidden">
            <div className="cursor-pointer" onClick={() => setNotify(!notify)}>
              <img src="/images/notify.png" alt="" height={25} width={25} />
            </div>
            {/* NOTIFICATION DIV */}
            <div
              className={
                notify ? "notification-div" : "notification-div hidden"
              }
            >
              <Notification />
            </div>
            <div
              onClick={() => setMenu(!menu)}
              className="hover:shadow-2xl cursor-pointer"
            >
              <img src="/images/menu.png" alt="" height={25} width={25} />
            </div>
          </div>
        </div>
        {/* ROUTING COMPONENT */}
        {children}
      </div>
      {/* MENU SIDEBAR */}
      <div
        className={
          menu
            ? "absolute top-0 right-0 mob_screen_closed:hidden shadow-2xl"
            : "absolute top-0 left-full mob_screen_closed:hidden"
        }
      >
        <ul className="text-md font-semibold p-2 bg-white h-screen w-[250px] menu_bar_mob:w-screen border">
          <div
            onClick={() => setMenu(!menu)}
            className="float-right mt-3 mb-2 border w-[28px] p-[3px] rounded-2xl hover:bg-slate-300 duration-300 cursor-pointer"
          >
            <img src="/images/right-arrow.png" alt="" height={20} width={20} />
          </div>
          <li className="menu-bar-li flex justify-between">Account</li>
          <li className="menu-bar-li">Profile</li>
          <hr />
          <li className="menu-bar-li mt-2">Dashboard</li>
          <li className="menu-bar-li">Calendar</li>
          <li className="menu-bar-li">Tools</li>
          <li className="menu-bar-li">Scheduling</li>
          <li className="menu-bar-li">Share Document</li>
        </ul>
        <div className="border border-slate-500 p-[3px] rounded-2xl hover:bg-slate-400 duration-300">
          <img src="/images/right-arrow.png" alt="" height={20} width={20} />
        </div>
      </div>
      {/* NEW DOCUMENT DIV */}
      <div className="absolute top-0">{renderNewDocument()}</div>
    </div>
  );
}

export default Layout;
