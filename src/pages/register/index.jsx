// import Login from "@/components/register/login";
// import SignUp from "@/components/register/signup";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as Yup from "yup";
import { useLoginMutation } from "../../hooks/mutation.hook";
import useUserStore from "../../stores/useUserStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// FOR TOAST
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "@/components/register/signup";

const Register = () => {
  // const router = useRouter();
  // const { currentUser } = useUserStore();
  // if (currentUser?.token) {
  //   router.push("/");
  //   return null;
  // }

  const [showpassword, setShowpassword] = useState(false);
  const { currentUser, setCurrentUser } = useUserStore();

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
        // console.log({ data });
        toast.success("Logged In", {
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
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    },
    onError(err) {
      console.log(err);
      toast.error("Invalid email or password", {
        position: "top-center",
        autoClose: 1000,
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
    mutate({ ...data });
  };

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
            <p className="flex gap-2 items-center text-lg">
              Go to admin panel
              <a
                onClick={() => {
                  router.push("admin_panel");
                }}
                className="text-blue-500 underline cursor-pointer"
              >
                <img
                  className="-rotate-90"
                  src="/images/down-arrow.png"
                  alt=""
                  height={20}
                  width={20}
                />
              </a>
            </p>
          </div>
        </div>
        {/* {eval(router.query.login) ? (
          <Login prevLogin={isLogin} onUpdateLogin={updateLogin} />
        ) : (
          <SignUp prevLogin={isLogin} onUpdateLogin={updateLogin} />
        )} */}
      </div>
    </div>
  );
};

export default Register;
