import moment from "moment";
import { CellAction } from "./cell-action";

export const columns = [
  {
    accessorKey: "doc_id",
    header: "ID",
  },
  {
    accessorKey: "doc_name",
    header: "Name",
  },

  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "doc_status",
    header: "Status",
  },

  {
    header: "Creation Date",
    cell: ({ row }) => (
      <p>{moment(row.original.created_at).format("DD-MM-YYYY")}</p>
    ),
  },
  {
    header: "Update Date",
    cell: ({ row }) => (
      <p>{moment(row.original.updated_at).format("DD-MM-YYYY")}</p>
    ),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
