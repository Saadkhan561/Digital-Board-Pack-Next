import BubbleChart from "@/components/chart";
import AdminLayout from "@/layout/admin-layout";
import { withProtectedWrapper } from "@/components/Protected Routes/protected_login";
import SignUp from "@/components/register/signup";
import useUserStore from "@/stores/useUserStore";
import { useRouter } from "next/router";
import React from "react";

const AdminPanel = () => {
  const { currentUser, logout } = useUserStore();
  const router = useRouter();

  return (
    <AdminLayout>
      <div className="flex justify-center items-center relative">
        <div
          className={
            router.query.signUp
              ? "p-4 h-screen w-4/5 flex flex-col gap-10 opacity-25 duration-200"
              : "p-4 h-screen w-4/5 flex flex-col gap-10"
          }
        >
          <div className="flex justify-between items-center border-b border-b-slate-300 pb-5">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-300 text-white font-semibold rounded-full">
                {currentUser && currentUser.first_name?.split("")[0]}
                {currentUser && currentUser.last_name?.split("")[0]}
              </div>
              <div className="text-xl font-semibold">
                {currentUser &&
                  currentUser.first_name + " " + currentUser.last_name}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="font-semibold text-sm border border-slate-300 p-1 rounded-md cursor-pointer hover:bg-slate-200 duration-200 w-max"
                type="submit"
                onClick={logout}
              >
                Logout
              </button>
              <div
                onClick={() => router.push("?signUp=true")}
                className="font-semibold text-sm border border-slate-300 p-1 rounded-md cursor-pointer hover:bg-slate-200 duration-200 w-max"
              >
                Add a new user
              </div>
            </div>
          </div>
          {/* DASHBOARD BODY DIV */}
          <div>
            <div className="text-md font-semibold">Analytics</div>
            <div>
              <BubbleChart />
            </div>
          </div>
        </div>
        <div className="absolute top-0 h-screen flex justify-center items-center">
          {router.query.signUp && <SignUp />}
        </div>
      </div>
    </AdminLayout>
  );
};

export default withProtectedWrapper(AdminPanel, "secretary");
