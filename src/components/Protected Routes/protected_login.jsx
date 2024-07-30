/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import useUserStore from "@/stores/useUserStore";
import { isTokenExpired } from "@/utils/common";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProtectedWrapper = (Component, role) => (props) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const logout = useUserStore((state) => state.logout);

  // console.log(currentUser);
  const [showChildren, setShowChildren] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (currentUser === null) {
        router.push("/register?login=true");
        return;
      } else if (currentUser) {
        if (role) {
          if (currentUser?.roles !== role) {
            setShowChildren(false);
            router.push("/");
            return;
          }
        }
        if (currentUser?.token && isTokenExpired(currentUser?.token)) {
          logout();
          router.push("/register?login=true");
          return;
        } else {
          setShowChildren(true);
        }
      } else {
        setShowChildren(false);
        router.push("/register?login=true");
      }
    };

    const timeoutId = setTimeout(() => {
      checkAuth(); // Execute the check after 2 seconds
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [currentUser, router, setShowChildren]);

  return showChildren ? <Component {...props} /> : <div>Redirecting...</div>;
};

export const withProtectedWrapper = ProtectedWrapper;
