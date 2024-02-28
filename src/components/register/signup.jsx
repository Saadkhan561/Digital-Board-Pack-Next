import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useUserStore from "@/stores/useUserStore";
import { useRegisterUser } from "@/hooks/mutation.hook";
import { useRouter } from "next/router";

const SignUp = ({ onUpdateLogin, prevLogin }) => {
  const [isLogin, setLogin] = useState(prevLogin);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { currentUser } = useUserStore();
  

  onUpdateLogin(isLogin);

  const initialValues = {
    username: null,
    pwd: null,
    first_name: null,
    last_name: null,
    email: null,
    designation: null,
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
  });
  
  const router = useRouter();
  const { mutate } = useRegisterUser({
    onSuccess(data) {
      console.log(data);
      reset();
      router.push("/register?login=true");
      // resetForm();
      // setValues({ ...initialValues });
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
  // const { values, errors, handleChange, handleSubmit, resetForm, setValues } =
  //   useFormik({
  //     initialValues: initialValues,
  //     validationSchema: signupSchema,
  //     onSubmit: (values) => {
  //       mutate({
  //         ...values,
  //       });
  //     },
  //   });
  const onSubmit = (data) => {
    mutate({
      ...data,
    });
  };
  // console.log(values);
  // const redirectFunction = (query) => {

  // }
  return (
    <div className="flex flex-col items-center h-[500px] w-[400px] menu_bar_mob:h-[450px] menu_bar_mob:w-[240px] p-4">
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
              // values={values.username}
              // onChange={handleChange}
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
              // id="first_name"
              // name="first_name"
              {...register("first_name")}
              // values={values.first_name}
              // onChange={handleChange}
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
              // id="last_name"
              // name="last_name"
              {...register("last_name")}
              // values={values.last_name}
              // onChange={handleChange}
            />
            <img className="h-4 w-4" src="/images/account_sm.png" alt="" />
          </div>
          {errors.last_name && (
            <p className="text-red-500 text-xs">{errors.last_name.message}</p>
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
              // id="pwd"
              // name="pwd"
              {...register("pwd")}
              // values={values.pwd}
              // onChange={handleChange}
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
        {/* <div>
          <label className="label" htmlFor="confirm_password">
            Confirm Password
          </label>
          <div className="flex gap-1 border-b border-b-gray-300">
            <input
              className="input_field"
              type={showPassword2 ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              values={values.confirm_password}
              onChange={handleChange}
            />
            <img
              onClick={() => setShowPassword2(!showPassword2)}
              className="cursor-pointer h-4 w-4"
              src="/images/pass_eye.png"
              alt=""
            />
          </div>
          <p className="text-red-500 text-xs">{errors.confirm_password}</p>
        </div> */}
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <div className="flex gap-1 border-b border-b-gray-300">
            <input
              className="input_field"
              type="email"
              // id="email"
              {...register("email")}
              // name="email"
              // values={values.email}
              // onChange={handleChange}
            />
            <img className="h-4 w-4" src="/images/input_email.png" alt="" />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
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
