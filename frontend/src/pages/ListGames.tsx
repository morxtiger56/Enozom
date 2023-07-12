import { FC, useEffect, useState } from "react";
import { DataTable } from "@components/DataTable";
import { listGamesApi } from "@api/game";
import { Button } from "@components/ui/Button";
import { useNavigate } from "react-router-dom";

interface ListGamesProps {}

const ListGames: FC<ListGamesProps> = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getGames() {
      const res = await listGamesApi();

      if (
        !res ||
        Array.isArray(res.data.games) === false ||
        (res.data.games as any[]).length === 0
      ) {
        return;
      }
      console.log(Array.isArray(res.data.games));
      setGames(res.data.games);
    }

    getGames().then(() => console.log(games));
  }, []);
  return (
    <div className="container mx-auto w-full ">
      {games.length === 0 ? (
        <div className="grid max-w-md mx-auto gap-5">
          <h1 className="text-center"> No active games </h1>
          <Button onClick={() => navigate("/game/main-menu")}>
            Create Game
          </Button>
        </div>
      ) : (
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
          data={games}
        />
      )}
    </div>
  );
};

export default ListGames;