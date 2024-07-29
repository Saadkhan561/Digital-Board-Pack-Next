import { useQueryString } from "@/hooks/queryString.hook";
import { cn } from "@/lib/utils";
import useUserStore from "@/stores/useUserStore";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import IconsComponent from "./icons";
import Link from "next/link";

export default function Sidebar({ navItems }) {
  const { isLoading, currentUser } = useUserStore();
  const { queryStringChanger } = useQueryString();
  const path = usePathname();

  if (!navItems?.length) {
    return null;
  }

  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-16 lg:block sm:block w-72 bg-slate-900`
      )}
    >
      <div className="flex gap-5 flex-col justify-center items-center">
        <Link  href="/" className="text-xl font-semibold text-white text-center">
          Digital Board Pack
        </Link>
        {currentUser?.roles === "secretary" && (
          <div
            onClick={() => queryStringChanger("open")}
            className="flex justify-center p-2 border border-gray-400 rounded-xl items-center w-[50%] cursor-pointer shadow-2xl hover:duration-200 hover:bg-slate-700"
          >
            <div className="mr-2">
              <Image src="/images/plus2.png" alt="" height={15} width={15} />
            </div>
            <div className="text-sm font-semibold text-white">New</div>
          </div>
        )}
      </div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {isLoading ? (
              <>
                <div className="py-2">
                  <Skeleton className="h-4 w-[200px] mb-4 py-2" />
                  <Skeleton className="h-4 w-[200px] mb-4 py-2" />
                  <Skeleton className="h-4 w-[200px] mb-4 py-2" />
                  <Skeleton className="h-4 w-[200px] mb-4 py-2" />
                  <Skeleton className="h-4 w-[200px] mb-4 py-2" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </>
            ) : (
              <nav className="grid items-start gap-2">
                {navItems?.map((item, index) => {
                  const Icon = IconsComponent[item.icon || "arrowRight"];

                  return (
                    item.href && (
                      <Link key={index} href={item.disabled ? "/" : item.href}>
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
