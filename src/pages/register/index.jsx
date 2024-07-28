// import Login from "@/components/register/login";
// import SignUp from "@/components/register/signup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useLoginMutation } from "../../hooks/mutation.hook";
import useUserStore from "../../stores/useUserStore";

// FOR TOAST
import AdminPanelDiv from "@/components/admin_panel";
import Image from "next/image";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { withProtectedWrapper } from "@/components/Protected Routes/protected_login";

const Register = () => {
  const [showpassword, setShowpassword] = useState(false);
  const { currentUser, setCurrentUser } = useUserStore();
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const { mutate, isPending } = useLoginMutation({
    async onSuccess(data) {
      if (data) {
        reset();
        if (
          data.userData.roles === "user" ||
          data.userData.roles === "secretary"
        ) {
          const { token, userData } = data;
          const { password, ...rest } = userData;
          setCurrentUser({ ...rest, token: token });
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
          router.push("/");
        } else {
          toast.error("Access denied", {
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
        }
      }
    },
    onError(err) {
     
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

  const renderAdminPanelDiv = () => {
    if (router.query.admin) {
      return <AdminPanelDiv />;
    }
  };

  if (currentUser?.token) {
    router.push("/");
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex justify-center items-center relative">
      <div
        className={
          router.query.admin
            ? "flex shadow-2xl rounded-lg border border-slate-300 opacity-50 duration-200"
            : "flex shadow-2xl rounded-lg border border-slate-300"
        }
      >
        <div className="h-[600px] w-[400px] relative md:hidden">
          <Image
            className="object-cover h-full"
            src="/images/login_img.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
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
                <Image
                  className="h-4 w-4"
                  src="/images/account_sm.png"
                  alt=""
                  height="4"
                  width="4"
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
                  type={showpassword ? "text" : "password"}
                  {...register("password")}
                />
                <Image
                  onClick={() => setShowpassword(!showpassword)}
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
            <button
              className={isPending ? "border menu_bar_mob:text-sm rounded-md bg-slate-100 font-semibold hover:bg-slate-200 ease-in-out duration-200 p-[1px] mt-2 opacity-50":"border menu_bar_mob:text-sm rounded-md bg-slate-100 font-semibold hover:bg-slate-200 ease-in-out duration-200 p-[1px] mt-2"}
              type="submit"
              disabled={isPending}
            >
              Submit
            </button>
          </form>
          <div
            className="hover:text-blue-300 mb-2 mt-2
          "
          >
            <Link href={"/forget-password"}>Forgot Password ?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
