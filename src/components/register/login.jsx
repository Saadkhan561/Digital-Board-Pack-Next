import React, { useState } from "react";
import * as Yup from "yup";
import { useLoginMutation } from "../../hooks/mutation.hook";
import useUserStore from "../../stores/useUserStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

// FOR TOAST
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onUpdateLogin, prevLogin }) => {
  const [isLogin, setLogin] = useState(prevLogin);
  const [showpassword, setShowpassword] = useState(false);
  const { currentUser, setCurrentUser } = useUserStore();
  onUpdateLogin(isLogin);

  // FOR TOAST
  const notify = () => toast(username, "logged in successfully");

  const initialValues = {
    email: "",
    pwd: "",
  };

  const loginSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    pwd: Yup.string().required("Password is required"),
  });

  const router = useRouter();
  const { mutate } = useLoginMutation({
    onSuccess(data) {
      if (data) {
        const { token, userData } = data;
        const { pwd, ...rest } = userData;
        setCurrentUser({ ...rest, token: token });
        reset();
        console.log({ data });
        router.push("/");
      }

      // console.log(data);
    },
    onError(err) {
      console.log(err);
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    values: initialValues,
    resolver: yupResolver(loginSchema),
  });
  const onSubmitHandle = (data) => {
    console.log(data);
    mutate({ ...data });
  };

  return (
    <div className="relative">
      <div className="absolute">
        <ToastContainer />
      </div>
      {/* LOGIN DIV */}
      <div className="flex flex-col items-center h-[500px] w-[400px] menu_bar_mob:h-[400px] menu_bar_mob:w-[240px] p-8">
        <div className="text-3xl menu_bar_mob:text-xl font-semibold">
          Welcome
        </div>
        <div className="text-slate-500 text-sm">Sign in to your account</div>
        <form
          onSubmit={handleSubmit(onSubmitHandle)}
          className="w-[300px] menu_bar_mob:w-[200px] mt-8 flex flex-col gap-3"
        >
          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <div className="flex gap-1 border-b border-b-gray-300">
              <input
                className="input_field"
                type="text"
                // id="email"
                // name="email"
                // values={values.email}
                // onChange={handleChange}
                {...register("email")}
              />
              <img className="h-4 w-4" src="/images/account_sm.png" alt="" />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="label" htmlFor="pwd">
              Password
            </label>
            <div className="flex gap-1 border-b border-b-gray-300">
              <input
                className="input_field"
                type={showpassword ? "text" : "password"}
                // id="pwd"
                // name="pwd"
                // values={values.pwd}
                // onChange={handleChange}
                {...register("pwd")}
              />
              <img
                onClick={() => setShowpassword(!showpassword)}
                className="cursor-pointer h-4 w-4"
                src="/images/pass_eye.png"
                alt=""
              />
            </div>
            {errors.pwd && (
              <p className="text-red-500 text-xs">{errors.pwd.message}</p>
            )}
          </div>
          <button
            className="border menu_bar_mob:text-sm rounded-md bg-slate-100 font-semibold hover:bg-slate-200 ease-in-out duration-200 p-[1px] mt-2"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className="flex gap-1 text-xs mt-2">
          <p>
            Don't have an account?{" "}
            <a
              onClick={() => {
                router.query.login = String(false);
                router.push(router, undefined, { shallow: true });
              }}
              className="text-blue-500 underline cursor-pointer"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
