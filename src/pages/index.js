import React, { useEffect } from "react";
import { useState } from "react";
import Card from "@/components/card";
import NewDocument from "@/components/new_document";
import Layout from "@/layout/UserLayout";
import {
  useFetchAllDocumentQuery,
  useFetchDocumentById,
} from "@/hooks/query.hook";

const Home = () => {
  const [dropdown, setDropdown] = useState(false);
  const [filter, setFilter] = useState("All");
  const [isNewDocument, setNewDocument] = useState(false);
  const [documents, setDocument] = useState(null);

  const { data, isLoading } = useFetchAllDocumentQuery();
  // console.log(data);

  // const { data, isLoading } = useFetchDocumentById();

  console.log(data);
  console.log(isLoading);

  const updateNewDocument = (newDocumentVal) => {
    setNewDocument(newDocumentVal);
  };

  const renderNewDocument = () => {
    if (isNewDocument) {
      return (
        <NewDocument
          prevNewDocument={isNewDocument}
          updateNewDocument={updateNewDocument}
        />
      );
    }
  };

  return (
    <Layout>
      <>
        <div
          className={
            isNewDocument
              ? "opacity-50 duration-200"
              : "opacity-100 duration-200"
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
                    <img
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
              <div onClick={() => setNewDocument(!isNewDocument)}>
                <img src="/images/plus.png" alt="" height={22} width={22} />
              </div>
            </div>
          </div>
          {/* CARDS BODY DIV */}
          <div className="p-4 flex flex-wrap gap-4 mob_screen:justify-center">
            {/* CARD */}
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              data &&
              data?.map((document) => (
                <Card
                  key={document.doc_id}
                  docId={document.doc_id}
                  docName={document.doc_name}
                  title={document.title}
                />
              ))
            )}
          </div>
        </div>
        {/* NEW DOCUMENT DIV */}
        <div className="absolute top-0">{renderNewDocument()}</div>
      </>
    </Layout>
  );
};

export default Home;
