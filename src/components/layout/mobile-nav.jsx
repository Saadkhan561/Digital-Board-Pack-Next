import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import useUserStore from "@/stores/useUserStore";
import { LogOutIcon, MenuIcon } from "lucide-react";
import { useState } from "react";
import IconsComponent from "../icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MobileSidebar({ navItems }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { logout } = useUserStore();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="relative right-0 p-4 cursor-pointer hover:text-slate-500  duration-100">
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
      </div>
      <SheetContent side="right" className="!px-0 bg-slate-900 text-white">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-white">
              Overview
            </h2>
            <div className="space-y-1">
              <nav className="grid items-start gap-2">
                {navItems?.map((item, index) => {
                  const Icon = IconsComponent[item.icon || "arrowRight"];

                  return (
                    item.href && (
                      <Link
                        key={index}
                        href={item.disabled ? "/" : item.href}
                        onClick={() => {
                          setOpen?.(false);
                        }}
                      >
                        <span
                          className={cn(
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            path === item.href
                              ? "bg-accent text-black"
                              : "transparent text-white",
                            item.disabled && "cursor-not-allowed opacity-80"
                          )}
                        >
                          {Icon && <Icon className="mr-2 h-4 w-4" />}
                          <span>{item.title}</span>
                        </span>
                      </Link>
                    )
                  );
                })}
                <Link onClick={logout}>
                  <span
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <LogOutIcon />
                    <span>Logout</span>
                  </span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
