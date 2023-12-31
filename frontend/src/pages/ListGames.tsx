import { FC, useEffect, useState } from "react";
import { DataTable } from "@components/DataTable";
import { listGamesApi } from "@api/game";
import { Button } from "@components/ui/Button";
import { useNavigate } from "react-router-dom";
import FadeOutTransition from "@components/FadeOutTransition";

interface ListGamesProps {}

const ListGames: FC<ListGamesProps> = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

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
     console.log(res.data.games);
   }

   useEffect(() => {
     if (games.length === 0) {
       getGames();
     }
   }, [games.length]);

  return (
    <FadeOutTransition>
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
                accessorKey: "gameName",
                header: "Game name",
              },
              {
                accessorKey: "joinedNumber",
                header: "Joined players",
              },
              {
                accessorKey: "playersNumber",
                header: "Max no. of players",
              },
              {
                id: "gameId",
                accessorKey: "gameId",
                header: "actions",
                cell: ({ row }) => (
                  <Button
                    onClick={() => {
                      const gameId = row.getValue("gameId");
                      console.log(gameId);
                      navigate(`/game/${gameId}`);
                    }}
                  >
                    Join Game
                  </Button>
                ),
              },
            ]}
            data={games}
          />
        )}
      </div>
    </FadeOutTransition>
  );
};

export default ListGames;
