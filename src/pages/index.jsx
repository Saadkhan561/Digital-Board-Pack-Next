import { withProtectedWrapper } from "@/components/Protected Routes/protected_login";
import Card from "@/components/card";
import { useFetchDocByUser } from "@/hooks/query.hook";
import Layout from "@/layout/UserLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Home = () => {
  const router = useRouter();

  const setValue = (name, value) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = value;
    }
    router.push(router, undefined, { shallow: true });
  };

  const { data, isLoading } = useFetchDocByUser();

  return (
    <Layout>
      <>
        <div
          className={
            Boolean(router.query.open) || Boolean(router.query.access)
              ? "opacity-50 duration-200"
              : ""
          }
        >
          <div className="flex flex-row-reverse justify-between items-center p-4">
            {/* FILTER DIV */}
            <div className="flex justify-end cursor-pointer z-10"></div>
            <div className="fixed bottom-10 right-10 z-10 mob_screen_closed:hidden flex justify-center p-2 bg-slate-100 border border-gray-400 rounded-full items-center cursor-pointer shadow-2xl hover:duration-200">
              <div onClick={() => setValue("open", true)}>
                <Image src="/images/plus.png" alt="" height={22} width={22} />
              </div>
            </div>
          </div>
          {/* CARDS BODY DIV */}
          <div className="p-4 flex flex-wrap gap-4 mob_screen:justify-center">
            {/* CARD */}
            {isLoading ? (
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  src="/images/loading.gif"
                  alt=""
                  height={20}
                  width={20}
                />
              </div>
            ) : (
              data?.map((document, index) => (
                <Card key={index} docData={document} />
              ))
            )}
          </div>
        </div>
      </>
    </Layout>
  );
};

export default withProtectedWrapper(Home);
