import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import IconsComponent from "./icons";

export function AdminSideBar({ items, setOpen }) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items?.map((item, index) => {
       
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
    </nav>
  );
}