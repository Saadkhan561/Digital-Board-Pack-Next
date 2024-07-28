import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { MenuIcon } from "lucide-react";
import useUserStore from "@/stores/useUserStore";
import { useState } from "react";
import Sidebar from "../Sidebar";
import { navItems } from "@/utils/constants";

export function MobileSidebar() {
  console.log(navItems)
  const [open, setOpen] = useState(false);
  const { currentUser } = useUserStore();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="absolute right-0 p-2 pr-6 cursor-pointer">
      <SheetTrigger asChild>
        <MenuIcon />
      </SheetTrigger>
      </div>
      <SheetContent side="right" className="!px-0 bg-slate-900">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-white">
              Overview
            </h2>
            <div className="space-y-1">
              <Sidebar navItems={navItems} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
