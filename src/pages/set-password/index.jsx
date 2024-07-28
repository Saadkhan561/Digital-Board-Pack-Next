import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSetPassword } from "@/hooks/mutation.hook";
import { passwordValidation } from "@/utils/common";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import * as Yup from "yup";

const SetPasswordFormSchema = Yup.object().shape({
  newPassword: passwordValidation("new password"),
  confirmPassword: passwordValidation("confirm password").oneOf(
    [Yup.ref("newPassword"), null],
    "Password and confirm password must be the same"
  ),
});

const Page = ({ token }) => {
  const form = useForm({
    resolver: yupResolver(SetPasswordFormSchema),
  });
  const { handleSubmit, control } = form;

  const setPasswordHandler = (data) => {
    mutate({ token, ...data });
  };
  const { push } = useRouter();

  const { mutate, isPending } = useSetPassword({
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
  return (
    <main className="antialiased bg-slate-200 text-gray-900 font-sans">
      <div className="flex items-center h-screen w-full">
        <div className="w-[25%] bg-white rounded shadow-lg p-8 m-4 md:max-w-sm mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            Enter New Password
          </span>
          <Form {...form}>
            <form className="mb-4" onSubmit={handleSubmit(setPasswordHandler)}>
              <div className="mb-6 md:w-full">
                <FormField
                  control={control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xs mb-1">
                        Password
                      </FormLabel>
                      <FormControl>
                        <input
                          type="password"
                          className="input_field"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-6 md:w-full">
                <FormField
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xs mb-1">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <input
                          type="password"
                          className="input_field"
                          placeholder="Re-Enter your password"
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

export const getServerSideProps = async (context) => {
  if (context?.query?.token) {
    return { props: { token: context.query.token } };
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default Page;
