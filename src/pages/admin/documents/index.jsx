import Heading from "@/components/heading";
import SearchBar from "@/components/Searchbar";
import { columns } from "@/components/tables/documents/columns";
import { DataTable } from "@/components/tables/table";
import { Breadcrumb } from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { useGetAllDocuments } from "@/hooks/query.hook";
import AdminLayout from "@/layout/admin-layout";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

const breadcrumbItems = [{ title: "Documents", link: "/admin/documents" }];

const DocumentsPage = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pageLimit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";

  const { data: documents } = useGetAllDocuments({
    searchString: search,
    PageParam: page,
    LimitParam: pageLimit,
  });
 
  

  return (
    <AdminLayout>
      <>
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
          <Breadcrumb items={breadcrumbItems} />

          <div className="flex items-start justify-between">
            <Heading
              title={`Documents (${documents?.results?.length || 0})`}
              description=""
            />
          </div>
          <Separator />

          <Separator />
          <div className="flex justify-between">{/* <SearchBar /> */}</div>
          <SearchBar />
          {Array.isArray(documents?.results) && (
            <DataTable
              columns={columns}
              data={documents?.results}
              pageCount={documents?.paginatorInfo.pages || 0}
            />
          )}
        </div>
      </>
    </AdminLayout>
  );
};

export default DocumentsPage;