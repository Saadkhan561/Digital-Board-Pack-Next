import { userAccessListMutation } from "@/hooks/mutation.hook";
import React, { Component, useState } from "react";
import { useForm } from "react-hook-form";

const UserAccessList = ({ userId, username }) => {
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setUsers((users) => {
      if (e.target.checked) {
        // If checkbox is checked, add user ID to the array
        return [...users, userId];
      } else {
        // If checkbox is unchecked, remove user ID from the array
        return users.filter((id) => id !== userId);
      }
    });
  };
//view dikha iska
// mtlb?
//browser pr dikha, kidhr aa raha hai
  console.log(users);

  // const initialValues = {
  //     doc_id: "",
  //     user_array: [],
  //   };

  //   const {mutate} = userAccessListMutation({
  //     onSuccess(data) {
  //         console.log(data)
  //     }
  //   })

  //   const {
  //     register,
  //     formState: { errors },
  //     handleSubmit,
  //     reset,
  //   } = useForm({
  //     values: initialValues,
  //   });

  //   const onSubmit = (data) => {
  //     console.log(data);
  //     mutate({ ...data });
  //   };
//alag component q banaya?
// user fetch karaky iterate krke dikhana tha isliye
//wohi wala component khol
  return (
    <>
      <div className="flex justify-between mt-4 border-b pb-2">
        <div className="flex gap-2 items-center">
          <img src="/images/account.png" alt="" height={20} width={20} />
          <p>Saad</p>
        </div>
        <input
          className="cursor-pointer"
          id="access"
          type="checkbox"
          value={userId}
          onChange={handleChange}
          // onClick={handleChange}
        />
      </div>
    </>
  );
};

export default UserAccessList;
