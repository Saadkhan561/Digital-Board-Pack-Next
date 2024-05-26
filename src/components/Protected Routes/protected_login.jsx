/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import useUserStore from "@/stores/useUserStore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProtectedWrapper = (Component, token) => (props) => {
  const { currentUser } = useUserStore();
  const [showChildren, setShowChildren] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/register?login=true");
    } else {
      setShowChildren(true);
    }
  }, [currentUser, router, setShowChildren]);

  return showChildren ? <Component {...props} /> : <div>Loading...</div>;
};

export const withProtectedWrapper = ProtectedWrapper;
