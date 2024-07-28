import { cn } from "@/lib/utils";
import { AdminSideBar } from "./admin-side-bar";
import { Skeleton } from "./ui/skeleton";
import useUserStore from "@/stores/useUserStore";

export default function Sidebar({ navItems }) {
  const { isLoading } = useUserStore();
  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-16 lg:block w-72 bg-zinc-400`
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight text-white ">
              Overview
            </h2>

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
              <AdminSideBar items={navItems} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
