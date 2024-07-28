import { withProtectedWrapper } from "@/components/Protected Routes/protected_login";
import Card from "@/components/card";
import { useFetchDocByUser } from "@/hooks/query.hook";
import Layout from "@/layout/UserLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Home = () => {
  const [dropdown, setDropdown] = useState(false);
  const [filter, setFilter] = useState("All");
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
            <div className="flex justify-end cursor-pointer z-10">
              <div
                className={
                  dropdown
                    ? "relative border border-slate-300 border-b-0 w-36 p-1 font-light"
                    : "relative border border-slate-300 w-36 p-1 font-light"
                }
              >
                <div
                  onClick={() => setDropdown(!dropdown)}
                  className="flex justify-between items-center hover:bg-slate-200 duration-300"
                >
                  <div>{filter}</div>
                  <div>
                    <Image
                      className={
                        dropdown
                          ? "rotate-180 duration-150"
                          : "rotate-0 duration-150"
                      }
                      src="/images/down-arrow.png"
                      alt=""
                      height={15}
                      width={15}
                    />
                  </div>
                </div>
                <div
                  className={
                    dropdown
                      ? "absolute top-8 left-0 p-1 border border-slate-300 border-t-0 rounded-b-xl w-36 bg-white"
                      : "absolute top-8 left-0 p-1 border border-slate-300 border-t-0 rounded-b-xl w-36 bg-white hidden"
                  }
                >
                  <ul>
                    <li
                      onClick={(e) => setFilter(e.target.innerText)}
                      className="hover:bg-slate-200 duration-300"
                    >
                      All
                    </li>
                    <li
                      onClick={(e) => setFilter(e.target.innerText)}
                      className="hover:bg-slate-200 duration-300"
                    >
                      New
                    </li>
                    <li
                      onClick={(e) => setFilter(e.target.innerText)}
                      className="hover:bg-slate-200 duration-300"
                    >
                      Sort By Date
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
