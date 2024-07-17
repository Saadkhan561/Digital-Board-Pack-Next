import React, { Suspense } from "react";
import Sidebar from "../components/Sidebar";
import { navItems } from "@/utils/constants";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/components/layout/admin-mobile-nav";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className={cn("block lg:!hidden")}>
        <MobileSidebar />
      </div>
      <Sidebar navItems={navItems} />
      <main className="w-full pt-16 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
