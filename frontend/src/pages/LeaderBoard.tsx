import { FC } from "react";
import { DataTable } from "@components/DataTable";

interface LeaderBoardProps {}

const LeaderBoard: FC<LeaderBoardProps> = () => {
  return (
    <div className="container mx-auto w-full ">
      <DataTable
        columns={[
          {
            accessorKey: "userName",
            header: "Username",
          },
          {
            accessorKey: "status",
            header: "Status",
          },
        ]}
        data={[
          { id: 1, status: "winner", userName: "test" },
          { id: 2, status: "lose", userName: "test 2" },
          { id: 3, status: "lose", userName: "test 3" },
          { id: 4, status: "lose", userName: "test 4" },
        ]}
      />
    </div>
  );
};

export default LeaderBoard;
