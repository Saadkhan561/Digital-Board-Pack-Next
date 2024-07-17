import moment from "moment";
import { CellAction } from "./cell-action";

export const columns = [
  {
    accessorKey: "meeting_id",
    header: "ID",
  },
  {
    accessorKey: "meeting_title",
    header: "Title",
  },

  {
    header: "Meeting Date",
    cell: ({ row }) => (
      <p>
        {row.original?.meeting_datetime
          ? moment(row.original?.meeting_datetime).format("DD-MM-YYYY")
          : "N/A"}
      </p>
    ),
  },
];
