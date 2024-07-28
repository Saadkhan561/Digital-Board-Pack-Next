import AccessList from "@/components/access_list";
import Notification from "@/components/layout/notification";
import Search from "@/components/layout/searchBar";
import NewDocument from "@/components/new_document";
import { withProtectedWrapper } from "@/components/Protected Routes/protected_login";
import Scheduler from "@/components/schedule_meeting/scheduler";
import { useChangeNotificationStatus } from "@/hooks/mutation.hook";
import MeetingInfo from "@/pages/scheduling/[id]";
import useUserStore from "@/stores/useUserStore";
import { ArrowRight, LogOut, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

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

  const renderAccessListModal = () => {
    if (router.query.access) {
      return <AccessList />;
    }
  };

  // FUNCTION TO LOGOUT A USER
  const { logout } = useUserStore();
  // const handleLogoutHandler = () => {
  //   router.push("/register?login=true");
  //   logout();
  // };
  const setValue = (value, name) => {
    router.query[name] = value;
    router.push(router, undefined, { shallow: true });
  };

  const { currentUser } = useUserStore();
  const notificationRef = useRef();

  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotify(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    
  }, [setMenu, setNotify]);

  const { mutate: changeStatus } = useChangeNotificationStatus();
  const handleNotification = () => {
    setNotify((prev) => !prev);

    if (!notify) {
      changeStatus();
    }
  };

  return (
    <div className="flex relative overflow-x-hidden h-screen">
      {/* SIDE BAR */}
      <div
        className={
          Boolean(router.query.open) ||
          Boolean(router.query.schedule) ||
          Boolean(router.query.modal) ||
          Boolean(router.query.access)
            ? "p-4 border border-black shadow-2xl text-white bg-slate-900 h-screen w-[300px] mob_screen:hidden opacity-50"
            : "p-4 border border-black shadow-2xl text-white bg-slate-900 h-screen w-[300px] mob_screen:hidden"
        }
      >
        {/* SIDE BAR DIV */}
        <div>
          <div className="text-xl font-semibold">Digital Board Pack</div>
          {currentUser?.roles === "secretary" && (
            <div
              onClick={() => newDocument("open")}
              className="flex justify-center p-2 border border-gray-400 rounded-xl items-center w-24 mt-4 ml-2 cursor-pointer shadow-2xl hover:duration-200 hover:bg-slate-700"
            >
              <div className="mr-2">
                <Image src="/images/plus2.png" alt="" height={15} width={15} />
              </div>
              <div className="text-sm font-semibold">New</div>
            </div>
          )}
          {/* SIDE BAR FULL SCREEN */}
          <div className="mt-20">
            <ul className="text-md">
              <Link
                href={"/"}
                className="flex items-center mb-1 cursor-pointer p-2 rounded-2xl hover:bg-slate-700 hover:duration-200"
              >
                <div className="mr-2">
                  <Image
                    src="/images/dashboard2.png"
                    alt=""
                    height={20}
                    width={20}
                  />
                </div>
                <div>Dashboard</div>
              </Link>
              <Link
                href={"scheduling"}
                className="flex items-center mb-1 cursor-pointer p-2 rounded-2xl hover:bg-slate-700 hover:duration-200"
              >
                <div className="mr-2">
                  <Image
                    src="/images/meeting2.png"
                    alt=""
                    height={20}
                    width={20}
                  />
                </div>
                <div>Scheduling</div>
              </Link>
              {currentUser.roles === "secretary" && (
                <Link
                  href={"admin"}
                  className="flex items-center gap-2 mb-1 cursor-pointer p-2 rounded-2xl hover:bg-slate-700 hover:duration-200"
                >
                  <Shield className="h-5 w-5" />
                  <div>Admin Panel</div>
                </Link>
              )}
              <li
                onClick={() => logout()}
                className="flex items-center gap-2 mb-1 cursor-pointer p-2 rounded-2xl hover:bg-red-800 hover:duration-200 ml-1 "
              >
                <LogOut className="h-5 w-5" />
                <div>Logout</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* MIDDLE DIV */}
      <div
        className={
          menu ||
          Boolean(router.query.open) ||
          Boolean(router.query.schedule) ||
          Boolean(router.query.modal) ||
          Boolean(router.query.access)
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
              <div onClick={handleNotification}>
                <Image src="/images/notify.png" alt="" height={25} width={25} />
              </div>

              <div
                className={
                  notify
                    ? "notification-div min-h-[50px]"
                    : "notification-div hidden"
                }
                ref={notificationRef}
              >
                <Notification />
              </div>
            </div>
            <div className="flex gap-4 items-center relative">
              <div className="cursor-pointer rounded-full w-8 h-8 ml-2">
                <Image
                  src="/images/account.png"
                  alt=""
                  height={28}
                  width={28}
                />
              </div>
              {/* <div
                onClick={() => logout()}
                className="flex gap-2 items-center border border-slate-400 rounded-lg cursor-pointer hover:bg-slate-100 duration-200 p-1 text-slate-600 text-xs"
              >
                <LogOut className="h-4 w-4" />
                <button>Logout</button>
              </div> */}
            </div>
          </div>
          {/* SMALL SCREEM NOTIFICATION DIV */}
          <div className="relative flex gap-2 items-center mob_screen_closed:hidden">
            <div className="cursor-pointer" onClick={handleNotification}>
              <Image src="/images/notify.png" alt="" height={25} width={25} />
            </div>

            <div
              className={
                notify
                  ? "notification-div max-h-[200px]"
                  : "notification-div hidden "
              }
            >
              <Notification />
            </div>
            <div
              onClick={() => setMenu(!menu)}
              className="hover:shadow-2xl cursor-pointer"
            >
              <Image src="/images/menu.png" alt="" height={25} width={25} />
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
            ? "absolute top-0 right-0 mob_screen_closed:hidden shadow-2xl bg-slate-900 text-white"
            : "absolute top-0 left-full mob_screen_closed:hidden bg-slate-900 text-white"
        }
        ref={menuRef}
      >
        <ul className="text-md font-semibold p-2 h-screen w-[250px] menu_bar_mob:w-screen border">
          {/* <li
            onClick={() => setMenu(!menu)}
            className="float-right mt-3 mb-2 border w-[28px] p-[3px] rounded-2xl hover:bg-slate-700 duration-300 cursor-pointer"
          >
            <Image
              src="/images/right-arrow.png"
              alt=""
              height={20}
              width={20}
            />
          </li> */}
          <div className="flex justify-end p-1 cursor-pointer">
            <ArrowRight
              onClick={() => setMenu(!menu)}
              className="h-6 w-6 hover:bg-slate-700 duration-200 rounded-full p-1"
            />
          </div>
          {/* <Link href={"register"} className="menu-bar-li flex justify-between">
            Account
          </Link>
          <li className="menu-bar-li">Profile</li>
          <hr /> */}
          <li className="menu-bar-li">
            <Link href={"/"}>Dashboard</Link>
          </li>
          <li className="menu-bar-li">
            <Link href={"/scheduling"}>Scheduling</Link>
          </li>
          <li
            onClick={logout}
            className="menu-bar-li text-white hover:bg-red-800"
          >
            Log Out
          </li>
        </ul>
      </div>
      {/* NEW DOCUMENT DIV  */}
      <div className="fixed top-0">{renderNewDocument()}</div>

      {/* SCHEDULE MODAL DIV */}
      <div className="absolute top-0">{renderScheduleModal()}</div>

      {/* MEETING INFO MODAL DIV */}
      <div className="absolute top-0">{renderMeetingInfoModal()}</div>

      {/* ACCESS LIST MODAL DIV */}
      <div className="absolute top-0">{renderAccessListModal()}</div>
    </div>
  );
}

export default withProtectedWrapper(Layout);
