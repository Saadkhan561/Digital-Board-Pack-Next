import Login from "@/components/register/login";
import SignUp from "@/components/register/signup";
import useUserStore from "@/stores/useUserStore";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Register = () => {
  const [isLogin, setLogin] = useState("true");
  const updateLogin = (newLogin) => {
    setLogin(newLogin);
  };
  const router = useRouter();
  const { currentUser } = useUserStore();
  if (currentUser?.token) {
    router.push("/");
    return null;
  }

  return (
    <div className="border border-black h-screen flex justify-center items-center">
      <div className="flex shadow-2xl rounded-lg border border-slate-300">
        <div className="h-[600px] w-[400px] relative md:hidden">
          <img
            className="object-cover h-full"
            src="/images/login_img.jpg"
            alt=""
          />
          <p className="absolute top-1/3 left-5 text-3xl font-semibold">
            Digital Board Pack
          </p>
        </div>
        {/* {register()}
         */}
        {eval(router.query.login) ? (
          <Login prevLogin={isLogin} onUpdateLogin={updateLogin} />
        ) : (
          <SignUp prevLogin={isLogin} onUpdateLogin={updateLogin} />
        )}
      </div>
    </div>
  );
};

export default Register;
