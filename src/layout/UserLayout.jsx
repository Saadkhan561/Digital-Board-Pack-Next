import Notification from "@/components/layout/notification";
import Search from "@/components/layout/searchBar";
import NewDocument from "@/components/new_document";
import Scheduler from "@/components/schedule_meeting/scheduler";
import MeetingInfo from "@/pages/scheduling/[id]";
import useUserStore from "@/stores/useUserStore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function Layout({ children }) {
  const [menu, setMenu] = useState(false);
  const [notify, setNotify] = useState(false);
  const [logOut, setLogout] = useState(false);
  const router = useRouter();

  const newDocument = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  const renderNewDocument = () => {
    if (router.query.open) {
      return <NewDocument />;
    }
  };

  const renderScheduleModal = () => {
    if (router.query.schedule) {
      return <Scheduler />;
    }
  };

  const renderMeetingInfoModal = () => {
    if (router.query.modal) {
      return <MeetingInfo />;
    }
  };

  // FUNCTION TO LOGOUT A USER
  const { logout } = useUserStore();

  const setValue = (value, name) => {
    router.query[name] = value;
    router.push(router, undefined, { shallow: true });
  };

  return (
    <div className="flex relative overflow-x-hidden h-screen">
      {/* SIDE BAR */}
      <div
        className={
          eval(router.query.open || router.query.schedule || router.query.modal)
            ? "p-4 border border-black rounded-r-2xl shadow-2xl text-white bg-slate-900  h-screen w-[300px] mob_screen:hidden opacity-50"
            : "p-4 border border-black rounded-r-2xl shadow-2xl text-white bg-slate-900 h-screen w-[300px] mob_screen:hidden"
        }
      >
        {/* SIDE BAR DIV */}
        <div>
          <div className="text-xl font-semibold">Digital Board Pack</div>
          <div
            onClick={() => newDocument("open")}
            className="flex justify-center p-2 border border-gray-400 rounded-xl items-center w-24 mt-4 ml-2 cursor-pointer shadow-2xl hover:duration-200 hover:bg-slate-700"
          >
            <div className="mr-2">
              <img src="/images/plus2.png" alt="" height={15} width={15} />
            </div>
            <div className="text-sm font-semibold">New</div>
          </div>
          {/* SIDE BAR FULL SCREEN */}
          <div className="mt-4">
            <ul className="text-md">
              <Link
                href={"/"}
                className="flex items-center mb-1 cursor-pointer p-2 hover:rounded-2xl hover:bg-slate-700 hover:duration-200"
              >
                <div className="mr-2">
                  <img
                    src="/images/dashboard2.png"
                    alt=""
                    height={20}
                    width={20}
                  />
                </div>
                <div>Dashboard</div>
              </Link>
              {/* <li className="flex items-center mb-1 cursor-pointer p-2 hover:rounded-2xl hover:bg-slate-200 hover:duration-200">
                <div className="mr-2">
                  <img
                    src="/images/calendar.png"
                    alt=""
                    height={20}
                    width={20}
                  />
                </div>
                <div>Calendar</div>
              </li> */}
              {/* <li className="flex items-center mb-1 cursor-pointer p-2 hover:rounded-2xl hover:bg-slate-200 hover:duration-200">
                <div className="mr-2">
                  <img src="/images/tools.png" alt="" height={20} width={20} />
                </div>
                <div>Tools</div>
              </li> */}
              <Link
                href={"scheduling"}
                className="flex items-center mb-1 cursor-pointer p-2 hover:rounded-2xl hover:bg-slate-700 hover:duration-200"
              >
                <div className="mr-2">
                  <img
                    src="/images/meeting2.png"
                    alt=""
                    height={20}
                    width={20}
                  />
                </div>
                <div>Scheduling</div>
              </Link>
              {/* <li className="flex items-center mb-1 cursor-pointer p-2 hover:rounded-2xl hover:bg-slate-200 hover:duration-200">
                <div className="mr-2">
                  <img src="/images/email.png" alt="" height={20} width={20} />
                </div>
                <div>Share Document</div>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      {/* MIDDLE DIV */}
      <div
        className={
          menu ||
          eval(router.query.open || router.query.schedule || router.query.modal)
            ? "w-full opacity-50 duration-200 relative"
            : "w-full opacity-100 duration-200 relative"
        }
      >
        {/* SEARCH BAR DIV */}
        <div className="flex justify-between items-center p-4">
          {/* SEARCH BAR */}
          <Search setValue={setValue} value={router?.query?.search} />
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
            <div className="flex items-center relative">
              <Link
                href={""}
                onClick={() => setLogout(!logOut)}
                className="cursor-pointer rounded-full w-8 h-8 ml-2"
              >
                <img src="/images/account.png" alt="" height={28} width={28} />
              </Link>
              {logOut ? (
                <div
                  onClick={logout}
                  className="absolute z-10 top-8 -left-5 rounded-md border border-slate-300 p-1 pl-2 pr-2 shadow-2xl mt-1 text-sm font-semibold text-red-500 hover:bg-slate-100 duration-200 cursor-pointer"
                >
                  Logout
                </div>
              ) : null}
            </div>
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
          <Link href={"register"} className="menu-bar-li flex justify-between">
            Account
          </Link>
          <li className="menu-bar-li">Profile</li>
          <hr />
          <li className="menu-bar-li">
            <Link href={"/"}>Dashboard</Link>
          </li>
          <li className="menu-bar-li">
            <Link href={"/scheduling"}>Scheduling</Link>
          </li>
          <li onClick={logout} className="menu-bar-li text-red-500">
            Log Out
          </li>
        </ul>
        <div className="border border-slate-500 p-[3px] rounded-2xl hover:bg-slate-400 duration-300">
          <img src="/images/right-arrow.png" alt="" height={20} width={20} />
        </div>
      </div>
      {/* NEW DOCUMENT DIV  */}
      <div className="fixed top-0">{renderNewDocument()}</div>

      {/* SCHEDULE MODAL DIV */}
      <div className="absolute top-0">{renderScheduleModal()}</div>

      {/* MEETING INFO MODAL DIV */}
      <div className="absolute top-0">{renderMeetingInfoModal()}</div>
    </div>
  );
}

export default Layout;
