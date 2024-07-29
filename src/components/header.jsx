import { useChangeNotificationStatus } from "@/hooks/mutation.hook";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Notification from "./layout/notification";
import Search from "./layout/searchBar";

import useUserStore from "@/stores/useUserStore";
import { adminNavItems, navItems } from "@/utils/constants";
import { BellIcon } from "lucide-react";
import { MobileSidebar } from "./layout/mobile-nav";

const Header = ({ menu, setMenu, menuRef, children }) => {
  const router = useRouter();
  const {logout} = useUserStore()
  const setValue = (value, name) => {
    router.query[name] = value;
    router.push(router, undefined, { shallow: true });
  };
  const notificationRef = useRef();

  const { currentUser } = useUserStore();
  const [notify, setNotify] = useState(false);
  const { mutate: changeStatus } = useChangeNotificationStatus();

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
  const handleNotification = () => {
    setNotify((prev) => !prev);

    if (!notify) {
      changeStatus();
    }
  };
  return (
    <div
      className={
        menu ||
        Boolean(router.query?.open) ||
        Boolean(router.query?.schedule) ||
        Boolean(router.query?.modal) ||
        Boolean(router.query?.access)
          ? "w-full opacity-50 duration-200 relative"
          : "w-full opacity-100 duration-200 relative"
      }
    >
      {/* SEARCH BAR DIV */}
      <div className="flex justify-between items-center p-4 gap-2">
        {/* SEARCH BAR */}
        <Search  />
        {/* FULL SCREEM NOTIFICATION DIV */}
        <div className="flex items-center mob_screen:hidden">
          <div className="relative cursor-pointer">
            <BellIcon onClick={handleNotification} />

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
          <div onClick={logout} className="border border-black p-2">
            Logout
          </div>
        </div>
        {/* SMALL SCREEM NOTIFICATION DIV */}
        <div className="relative flex  items-center mob_screen_closed:hidden">
          <BellIcon className="cursor-pointer" onClick={handleNotification} />

          <MobileSidebar
            navItems={
              currentUser?.roles === "secretary" ? adminNavItems : navItems
            }
          />

          <div
            className={
              notify
                ? "notification-div max-h-[200px]"
                : "notification-div hidden "
            }
          >
            <Notification />
          </div>

          {/* <div
            onClick={() => setMenu(!menu)}
            className="hover:shadow-2xl cursor-pointer"
          >
            <Image src="/images/menu.png" alt="" height={25} width={25} />
          </div> */}
        </div>
      </div>

      {children}
    </div>
  );
};

export default Header;
