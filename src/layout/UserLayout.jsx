import AccessList from "@/components/access_list";
import Header from "@/components/header";
import MeetingInfo from "@/components/MeetingInfo";
import NewDocument from "@/components/new_document";
import { withProtectedWrapper } from "@/components/Protected Routes/protected_login";
import SignUp from "@/components/register/signup";
import Scheduler from "@/components/schedule_meeting/scheduler";
import Sidebar from "@/components/Sidebar";

import useModalStore from "@/stores/useModalStore";
import useUserStore from "@/stores/useUserStore";
import { adminNavItems, navItems } from "@/utils/constants";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

function Layout({ children }) {
  const [menu, setMenu] = useState(false);
  const { modals, closeModal } = useModalStore();
  const menuRef = useRef();
  const router = useRouter();

  const renderNewDocument = () => {
    if (router.query.open) {
      return <NewDocument />;
    }
  };

  const renderScheduleModal = () => {
    if (modals["schedule"]) {
      return <Scheduler />;
    }
  };

  const renderMeetingInfoModal = () => {
    if (modals["modals"]) {
      return <MeetingInfo />;
    }
  };

  const renderAccessListModal = () => {
    if (router.query.access) {
      return <AccessList />;
    }
  };

  const renderSignUpDiv = () => {
    if (router.query.signUp) {
      return <SignUp />;
    }
  };

  // FUNCTION TO LOGOUT A USER

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

      <div className="fixed top-0">{renderNewDocument()}</div>

      <div className="absolute top-0">{renderScheduleModal()}</div>

      <div className="absolute top-0">{renderMeetingInfoModal()}</div>

      <div className="absolute top-0">{renderAccessListModal()}</div>

      <div className="absolute top-0">{renderSignUpDiv()}</div>
    </div>
  );
}

export default Layout;
