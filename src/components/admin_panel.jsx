import { React, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// FOR TOAST
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useLoginMutation } from "@/hooks/mutation.hook";
import useUserStore from "@/stores/useUserStore";

const AdminPanelDiv = () => {
  const [showpassword, setShowpassword] = useState(false);
  const router = useRouter();
  const { currentUser, setCurrentUser } = useUserStore();

  const initialValues = {
    email: "",
    pwd: "",
  };

  const loginSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    pwd: Yup.string().required("Password is required"),
  });

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
          router.push("/admin_panel");
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

  const admin = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="p-10 rounded-lg bg-white shadow-2xl">
        <div
          onClick={() => admin("admin")}
          className="flex justify-end cursor-pointer"
        >
          <img src="/images/cross.png" alt="" height={15} width={15} />
        </div>
        <p className="font-semibold text-lg">Login to admin panel</p>
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
      </div>
    </div>
  );
};

export default AdminPanelDiv;
