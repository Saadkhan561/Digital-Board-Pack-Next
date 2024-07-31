import moment from "moment";
import { CellAction } from "./cell-action";

export const columns = [
  {
    header: "S #",
    cell: ({ row }) => <p>{row?.index + 1}</p>,
  },

  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "user_name",
    header: "Username",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
];
