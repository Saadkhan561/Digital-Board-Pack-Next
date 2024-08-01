import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgetPassword } from "@/hooks/mutation.hook";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import * as Yup from "yup";

const ForgetPasswordFormSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
});

const page = () => {
  const form = useForm({
    resolver: yupResolver(ForgetPasswordFormSchema),
  });
  const { handleSubmit, control } = form;
  const { push } = useRouter();
  const { mutate, isPending } = useForgetPassword({
    onSuccess(data) {
      push("/register?login");
      toast.success(data.message, {
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
    onError(err) {
      toast.error(err.message, {
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

  const handleForgetPassword = (data) => {
    mutate(data);
  };
  return (
    <main className="antialiased text-gray-900 font-sans bg-slate-100">
      <div className="flex items-center h-screen w-full">
        <div className="w-1/2 bg-card rounded shadow-lg p-8 m-4 mx-auto">
          <span className="block w-full text-xl uppercase mb-4">
            Forgot Password?
          </span>
          <Form {...form}>
            <form
              className="mb-4"
              onSubmit={handleSubmit(handleForgetPassword)}
            >
              <div className="mb-6 md:w-full">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xs mb-1">
                        Email
                      </FormLabel>
                      <FormControl>
                        <input
                          type="email"
                          className="input_field"
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="rounded-md bg-slate-100 font-semibold hover:bg-slate-200  text-black uppercase text-sm border border-black "
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default page;
