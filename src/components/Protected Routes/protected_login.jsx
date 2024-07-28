/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import useUserStore from "@/stores/useUserStore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProtectedWrapper = (Component, role) => (props) => {
  const { currentUser, isLoading } = useUserStore();
  const [showChildren, setShowChildren] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (role) {
      if (currentUser?.roles !== role) {
        router.push("/");
      }
    }
    if (!currentUser) {
      router.push("/register?login=true");
    } else {
      setShowChildren(true);
    }
  }, [currentUser, router, setShowChildren, isLoading]);

  return showChildren ? <Component {...props} /> : <div>Redirecting...</div>;
};

export const withProtectedWrapper = ProtectedWrapper;
