import {
  useAccessListMutation,
  useRemoveAccessMutation,
} from "@/hooks/mutation.hook";
import { useFetchAccessedUsers, useFetchAllUsers } from "@/hooks/query.hook";
import useUserStore from "@/stores/useUserStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image, X } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const AccessList = () => {
  const [clickedButtons, setClickedButtons] = useState([]);
  const router = useRouter();

  const { currentUser } = useUserStore();

  const docId = router.query.id;
  const accessList = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  const {
    data: userAccessed,
    refetch: refetchAccessedUsers,
    isLoading: isAccessedUsersLoading,
  } = useFetchAccessedUsers({ docId });

  const {
    data,
    isLoading: isAllUsersLoading,
    refetch: refetchUsers,
  } = useFetchAllUsers();

  const { mutate: documentAccess, isPending: isAccessPending } =
    useAccessListMutation({
      onSuccess(data) {
        // toast.success("Document added successfully!", {
        //   position: "top-center",
        //   autoClose: 2000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: false,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "dark",
        //   transition: Bounce,
        // });
        resetAddForm();
        refetchAccessedUsers();
        refetchDoc();
        refetchUsers();
      },
      onError(error) {
        // toast.error("Failed to Upload Document", {
        //   position: "top-center",
        //   autoClose: 1000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: false,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "dark",
        //   transition: Bounce,
        // });
      },
    });

  const { mutate: removeAccess, isPending: isRemoveAccessPending } = useRemoveAccessMutation({
    onSuccess() {
      refetchAccessedUsers();
      refetchDoc();
      refetchUsers();
    }
  });

  const initialValues = {
    userId: [],
  };

  const documentSchema = Yup.object({
    userId: Yup.array().min(1, "At least one user is required"),
  });

  const {
    register: registerAddForm,
    handleSubmit: handleAddFormSubmit,
    formState: { errors: addFormErrors },
    reset: resetAddForm,
    // refetch: refetchAccessedUsers
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(documentSchema),
  });

  const {
    register: registerRemoveForm,
    handleSubmit: handleRemoveFormSubmit,
    setValue,
    watch,
    formState: { errors: removeFormErrors },
    reset: resetRemoveForm,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(documentSchema),
  });

  const onSubmit = (data) => {
    documentAccess({ docId, userId: data.userId });
  };

  const onRemoveAccessSubmit = (data) => {
    const newValue = data.userId.filter(Boolean);
    console.log(newValue);
    removeAccess({ docId, users: newValue });
  };

  const handleUserClick = (index, userId) => {
    setClickedButtons((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index); // Remove the index if it's already clicked
      } else {
        return [...prev, index]; // Add the index if it's not clicked
      }
    });
    const fieldName = `userId[${index}]`;
    const currentValue = watch(fieldName);
    const newValue = currentValue ? undefined : userId;
    setValue(fieldName, newValue);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="bg-white shadow-2xl rounded-md w-[600px] mob_screen:w-[500px] new_document:w-[350px] z-10 mob_screen:h-[600px]">
        <div className="flex justify-between items-center p-4 bg-slate-900 text-white">
          <p className="text-xl font-semibold mob_screen:text-lg">
            Access List
          </p>
          <X
            onClick={() => accessList("access")}
            className="h-6 w-6 cursor-pointer rounded-full p-1 hover:bg-slate-700 duration-200"
          />
        </div>
        <div className="p-6">
          <form
            className="pb-4"
            onSubmit={handleRemoveFormSubmit(onRemoveAccessSubmit)}
          >
            <div className="flex gap-2 items-center">
              <div className="font-semibold">Accessed Users:</div>
              <div className="p-2 flex gap-2 items-center flex-wrap">
                {isAccessedUsersLoading ? (
                  <div>
                    Loading...
                  </div>
                ) : (
                  userAccessed?.map((user, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleUserClick(index, user.user_id)}
                      className={
                        clickedButtons.includes(index)
                          ? "text-center cursor-pointer text-xs font-semibold text-white rounded-lg w-max gap-3 p-1 bg-slate-700 duration-100"
                          : "text-center cursor-pointer text-xs font-semibold text-white rounded-lg w-max gap-3 p-1 bg-slate-500"
                      }
                    >
                      <p>{user.user_name}</p>
                    </button>
                  ))
                )}
              </div>
            </div>
            <div className="flex justify-end w-full cursor-pointer ">
              <button
                type="submit"
                className={isRemoveAccessPending ? "bg-red-500 opacity-50 text-white text-xs font-semibold p-1 rounded-md":"bg-red-500 text-white text-xs font-semibold p-1 rounded-md"}
                disabled={isRemoveAccessPending}
              >
                Remove Users
              </button>
            </div>
          </form>
          <hr />
          <form onSubmit={handleAddFormSubmit(onSubmit)}>
            <div>
              <div className="p-2 mt-4">
                <div className="font-semibold text-xl">Add Permissions</div>
                <div className="h-[200px] overflow-y-auto mt-2">
                  {isAllUsersLoading ? (
                    <div>Loading...</div>
                  ) : (
                    data?.map(
                      (user, index) =>
                        user.roles === "user" &&
                        userAccessed?.every(
                          (existedUser) => existedUser.user_id !== user.user_id
                        ) && (
                          <div
                            className="flex justify-between mt-4 border-b pr-2 pl-2 pb-2"
                            key={index}
                          >
                            <div className="flex gap-2 items-center">
                              <img
                                src="/images/account.png"
                                alt=""
                                height={20}
                                width={20}
                              />
                              <p>{user.email}</p>
                            </div>
                            <input
                              className="cursor-pointer"
                              type="checkbox"
                              {...registerAddForm("userId")}
                              value={user?.user_id}
                            />
                          </div>
                        )
                    )
                  )}
                </div>
              </div>
              {addFormErrors.userId && (
                <p className="text-red-500 text-xs">
                  {addFormErrors.userId.message}
                </p>
              )}
            </div>
            <div className="flex justify-end items-center gap-2 p-4 mr-4 mt-4">
              <div>
                {isAccessPending ? (
                  <div className="pt-2">
                    <img
                      src="/images/loading.gif"
                      alt=""
                      height={15}
                      width={15}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <button
                className={
                  isAccessPending
                    ? "mt-4 w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200 opacity-75"
                    : "mt-4 w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200"
                }
                type="submit"
                disabled={isAccessPending}
                // onKeyDown={handleKeyDown}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccessList;
