import { FC } from "react";
import { DataTable } from "./DataTable";

interface LeaderBoardProps {}

const LeaderBoard: FC<LeaderBoardProps> = () => {
  return (
    <DataTable
      columns={[
        {
          accessorKey: "userName",
          header: "User Name",
        },
        {
          accessorKey: "status",
          header: "Status",
        },
      ]}
      data={[{ id: 1, status: "winner", userName: "test" }]}
    />
  );
};

export default LeaderBoard;
