import AccessList from "@/components/access_list";
import Header from "@/components/header";
import NewDocument from "@/components/new_document";
import { withProtectedWrapper } from "@/components/Protected Routes/protected_login";
import Scheduler from "@/components/schedule_meeting/scheduler";
import Sidebar from "@/components/Sidebar";
import MeetingInfo from "@/pages/scheduling/[id]";
import useUserStore from "@/stores/useUserStore";
import { adminNavItems, navItems } from "@/utils/constants";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

function Layout({ children }) {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef();
  const router = useRouter();

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

  const { currentUser } = useUserStore();

  return (
    <div className="flex relative overflow-x-hidden h-screen">
      {/* SIDE BAR */}

      {/* SIDE BAR DIV */}

      <Sidebar
        navItems={currentUser?.roles === "secretary" ? adminNavItems : navItems}
      />

      {/* MIDDLE DIV */}
      <Header menu={menu} setMenu={setMenu} menuRef={menuRef}>
        {children}
      </Header>
      {/* MENU SIDEBAR */}
      {/* <div
        className={
          menu
            ? "absolute top-0 right-0 mob_screen_closed:hidden shadow-2xl bg-slate-900 text-white"
            : "absolute top-0 left-full mob_screen_closed:hidden bg-slate-900 text-white"
        }
        ref={menuRef}
      >
        <ul className="text-md font-semibold p-2 h-screen w-[250px] menu_bar_mob:w-screen border">
          <div className="flex justify-end p-1 cursor-pointer">
            <ArrowRight
              onClick={() => setMenu(!menu)}
              className="h-6 w-6 hover:bg-slate-700 duration-200 rounded-full p-1"
            />
          </div>

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
      </div> */}

      <div className="fixed top-0">{renderNewDocument()}</div>

      <div className="absolute top-0">{renderScheduleModal()}</div>

      <div className="absolute top-0">{renderMeetingInfoModal()}</div>

      <div className="absolute top-0">{renderAccessListModal()}</div>
    </div>
  );
}

export default Layout;
