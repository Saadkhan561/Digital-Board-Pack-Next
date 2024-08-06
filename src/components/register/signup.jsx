import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAdminCreateUser, useRegisterUser } from "@/hooks/mutation.hook";
import { useRouter } from "next/router";
// import { useAllDepartments } from "@/hooks/query.hook";

// FOR TOAST
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { passwordValidation } from "@/utils/common";
import { Form } from "../ui/form";
import { X } from "lucide-react";

const SignUp = () => {
  const [showPassword1, setShowPassword1] = useState(false);

  const signupSchema = Yup.object({
    user_name: Yup.string().required("Username is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    password: passwordValidation("new password"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    designation: Yup.string().required("Designation is required"),
  });

  const router = useRouter();
  const { mutate, isPending: isSignUpPending } = useAdminCreateUser({
    onSuccess(data) {
      toast.success("Account created successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      reset();
      signUp("signUp");
    },
    onError(error) {
      toast.error("Email already exist!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    },
  });

  const form = useForm({
    resolver: yupResolver(signupSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = (data) => {
    data?.["roles"] = "user"
    mutate(data);
  };

  const signUp = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  return (
    <div className=" flex justify-center items-center w-screen h-screen">
      <div className="rounded-lg bg-white shadow-2xl">
        <div className="bg-slate-900 text-white flex justify-between items-center p-5">
          <div className="text-2xl font-semibold">
            Sign Up
          </div>
          <X
            onClick={() => signUp("signUp")}
            className="h-6 w-6 cursor-pointer rounded-full p-1 hover:bg-slate-700 duration-200"
          />
        </div>

        <div className="flex flex-col items-center h-[550px] w-[400px] menu_bar_mob:h-[450px] menu_bar_mob:w-[240px] p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[300px] menu_bar_mob:w-[200px] mt-4 flex flex-col gap-1"
          >
            <div>
              <label className="label" htmlFor="username">
                User Name
              </label>
              <div className="flex gap-1 border-b border-b-gray-300">
                <input
                  className="input_field"
                  type="text"
                  {...register("user_name")}
                />
                <Image
                  className="h-4 w-4"
                  src="/images/account_sm.png"
                  alt=""
                  height={4}
                  width={4}
                />
              </div>
              {errors.user_name && (
                <p className="text-red-500 text-xs">
                  {errors.user_name.message}
                </p>
              )}
            </div>
            <div>
              <label className="label" htmlFor="first_name">
                First Name
              </label>
              <div className="flex gap-1 border-b border-b-gray-300">
                <input
                  className="input_field"
                  type="text"
                  {...register("first_name")}
                />
                <Image
                  className="h-4 w-4"
                  src="/images/account_sm.png"
                  alt=""
                  height={4}
                  width={4}
                />
              </div>
              {errors.first_name && (
                <p className="text-red-500 text-xs">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div>
              <label className="label" htmlFor="username">
                Last Name
              </label>
              <div className="flex gap-1 border-b border-b-gray-300">
                <input
                  className="input_field"
                  type="text"
                  {...register("last_name")}
                />
                <Image
                  className="h-4 w-4"
                  src="/images/account_sm.png"
                  alt=""
                  height={4}
                  width={4}
                />
              </div>
              {errors.last_name && (
                <p className="text-red-500 text-xs">
                  {errors.last_name.message}
                </p>
              )}
            </div>
            <div>
              <label className="label" htmlFor="email">
                Email
              </label>
              <div className="flex gap-1 border-b border-b-gray-300">
                <input
                  className="input_field"
                  type="email"
                  {...register("email")}
                />
                <Image
                  className="h-4 w-4"
                  src="/images/input_email.png"
                  alt=""
                  height={4}
                  width={4}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="label" htmlFor="password">
                Password
              </label>
              <div className="flex gap-1 border-b border-b-gray-300">
                <input
                  className="input_field"
                  type={showPassword1 ? "text" : "password"}
                  {...register("password")}
                />
                <Image
                  onClick={() => setShowPassword1(!showPassword1)}
                  className="cursor-pointer h-4 w-4"
                  src="/images/pass_eye.png"
                  alt=""
                  height={4}
                  width={4}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="label" htmlFor="designation">
                Designation
              </label>
              <div className="flex gap-1 border-b border-b-gray-300">
                <input
                  className="input_field"
                  type="text"
                  {...register("designation")}
                />
                <Image
                  className="h-4 w-4"
                  src="/images/role.png"
                  alt=""
                  height={4}
                  width={4}
                />
              </div>
              {errors.designation && (
                <p className="text-red-500 text-xs">
                  {errors.designation.message}
                </p>
              )}
            </div>
            <button
              className={
                isSignUpPending
                  ? "border menu_bar_mob:text-sm rounded-md bg-slate-100 font-semibold hover:bg-slate-200 ease-in-out duration-200 p-[1px] mt-2 opacity-25"
                  : "border menu_bar_mob:text-sm rounded-md bg-slate-100 font-semibold hover:bg-slate-200 ease-in-out duration-200 p-[1px] mt-2"
              }
              type="submit"
              disabled={isSignUpPending}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
