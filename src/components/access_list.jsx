import { useFetchAccessedUsers, useFetchAllUsers } from "@/hooks/query.hook";
import useUserStore from "@/stores/useUserStore";
import { Image, X } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import {
  useAccessListMutation,
  useRemoveAccessMutation,
} from "@/hooks/mutation.hook";

const AccessList = () => {
    const [userAccessBtn, setUserAccessBtn] = useState(false)
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

  const { data: userAccessed, refetch: refetchAccessedUsers } =
    useFetchAccessedUsers({ docId });
  //   console.log(userAccessed);

  const { data, isLoading } = useFetchAllUsers();

  const { mutate: documentAccess, isPending: isAccessPending } =
    useAccessListMutation({
      onSuccess(data) {
        refetch();
        reset();
        toast.success("Document added successfully!", {
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
        resetAddForm();
        refetchDoc();
        refetchAccessedUsers();
      },
      onError(error) {
        toast.error("Failed to Upload Document", {
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

  const { mutate: removeAccess } = useRemoveAccessMutation({
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
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
    removeAccess({ docId, users: newValue });
  };

  const handleUserClick = (index, userId) => {
    setUserAccessBtn(!userAccessBtn)
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
          <form onSubmit={handleRemoveFormSubmit(onRemoveAccessSubmit)}>
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-sm">Accessed Users:</div>
              <div className="p-2 flex gap-2 items-center flex-wrap">
                {userAccessed?.map((user, index) => (
                  <button
                    key={user.user_id}
                    type="button"
                    onClick={() => handleUserClick(index, user.user_id)}
                    className="text-center cursor-pointer text-xs font-semibold text-white rounded-lg w-max gap-3 p-1 bg-slate-500 duration-200"
                  >
                    <div>
                      <p>{user.user_name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end w-full cursor-pointer ">
              <button
                type="submit"
                className="bg-red-500 text-white text-xs font-semibold p-1 rounded-md"
              >
                Remove Users
              </button>
            </div>
          </form>
          <form onSubmit={handleAddFormSubmit(onSubmit)}>
            <div>
              <div className="p-2 mt-4">
                <div className="font-semibold text-xl">Add Permissions</div>
                <div className="h-[200px] overflow-y-auto mt-2">
                  {isLoading ? (
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
                              <Image
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
            <div className="flex justify-end p-4 mr-4 mt-4">
              <div>
                {isAccessPending ? (
                  <div>
                    <Image
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
