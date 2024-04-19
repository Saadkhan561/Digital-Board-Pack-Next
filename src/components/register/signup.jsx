import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterUser } from "@/hooks/mutation.hook";
import { useRouter } from "next/router";
import { useAllDepartments } from "@/hooks/query.hook";

const SignUp = ({ onUpdateLogin, prevLogin }) => {
  const [isLogin, setLogin] = useState(prevLogin);
  const [showPassword1, setShowPassword1] = useState(false);
  const [dropDown, setDropDown] = useState("None");
  const [downArrow, setDownArrow] = useState(false);

  const { data, isLoading } = useAllDepartments();

  onUpdateLogin(isLogin);

  const initialValues = {
    username: null,
    pwd: null,
    first_name: null,
    last_name: null,
    email: null,
    designation: null,
    group_id: null,
  };

  const signupSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    pwd: Yup.string()
      .min(8, "Password must be atleast 8 characters long")
      .max(15, "Password must not exceed this limit")
      .required("Password is required"),
    // confirm_password: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Password must match")
    //   .required("Confirmation is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    designation: Yup.string().required("Designation is required"),
    group_id: Yup.string().required("Department is required"),
  });

  const router = useRouter();
  const { mutate } = useRegisterUser({
    onSuccess(data) {
      console.log(data);
      reset();
      router.push("/register?login=true");
    },
    onError(error) {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    values: initialValues,
    resolver: yupResolver(signupSchema),
  });
  const onSubmit = (data) => {
    mutate({
      ...data,
    });
  };

  const handleDropDown = (e) => {
    setDropDown(e.target.innerText);
  };

  return (
    <div className="flex flex-col items-center h-[550px] w-[400px] menu_bar_mob:h-[450px] menu_bar_mob:w-[240px] p-4">
      <div className="text-3xl menu_bar_mob:text-xl font-semibold">
        Create your account
      </div>
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
              {...register("username")}
            />
            <img className="h-4 w-4" src="/images/account_sm.png" alt="" />
          </div>
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
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
            <img className="h-4 w-4" src="/images/account_sm.png" alt="" />
          </div>
          {errors.first_name && (
            <p className="text-red-500 text-xs">{errors.first_name.message}</p>
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
            <img className="h-4 w-4" src="/images/account_sm.png" alt="" />
          </div>
          {errors.last_name && (
            <p className="text-red-500 text-xs">{errors.last_name.message}</p>
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
            <img className="h-4 w-4" src="/images/input_email.png" alt="" />
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
              {...register("pwd")}
            />
            <img
              onClick={() => setShowPassword1(!showPassword1)}
              className="cursor-pointer h-4 w-4"
              src="/images/pass_eye.png"
              alt=""
            />
          </div>
          {errors.pwd && (
            <p className="text-red-500 text-xs">{errors.pwd.message}</p>
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
            <img className="h-4 w-4" src="/images/role.png" alt="" />
          </div>
          {errors.designation && (
            <p className="text-red-500 text-xs">{errors.designation.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="label" htmlFor="designation">
            Choose Your Department
          </label>
          <div>
            <select {...register("group_id")}>
              <option value="">Select Department</option>
              {isLoading ? (
                <option disabled>Loading...</option>
              ) : (
                data &&
                data.map((depart) => (
                  <option key={depart.group_id} value={depart.group_id}>
                    {depart.group_name}
                  </option>
                ))
              )}
            </select>
          </div>
          {errors.department && (
            <p className="text-red-500 text-xs">{errors.department.message}</p>
          )}
        </div>
        <button
          className="border menu_bar_mob:text-sm rounded-md bg-slate-100 font-semibold hover:bg-slate-200 ease-in-out duration-200 p-[1px] mt-2"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="flex gap-1 text-md menu_bar_mob:text-xs mt-2">
        <p>
          Already have an account?{" "}
          <a
            onClick={() => {
              router.query.login = String(true);
              router.push(router, undefined, { shallow: true });
            }}
            className="text-blue-500 underline  cursor-pointer"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
