import { ConnectionManager } from "./ConnectionManager";
import { Game } from "../entity/Game";
import { BoardDB } from "./BoardDB";
import { UserDB } from "./UserDB";
import { FindManyOptions, FindOneOptions } from "typeorm";

export class GameDB {
    async addGame(
        players_number: number,
        ownerid: number,
        state: string,
        joinedPlayers: number,
        boardid: number,
        gameName: string
    ): Promise<Game | null> {
        try {
            const connection = await ConnectionManager.getConnection();
            console.log("connected");
            const game = new Game();
            console.log("after connection", game);

            game.players_number = players_number;
            game.joined_number = joinedPlayers;
            game.state = state;
            game.gameName = gameName;
            console.log("after init data", game);

            const boardDB = new BoardDB();
            const board_id = await boardDB.getBoardById(1);
            if (board_id) {
                game.board_id = board_id;
            } else {
                return null;
            }

            console.log("after getting board", game);

            const userDB = new UserDB();

            console.log("after before owner", ownerid);

            const user_id = await userDB.getUserById(ownerid);
            console.log("after getting owner", user_id);

            if (user_id) {
                game.turn = user_id;
            } else {
                return null;
            }
            console.log("before save:", game);

            const newGame = await connection.manager.save(game);
            return newGame;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    public static async getGameById(gameId: number): Promise<Game | string> {
        try {
            const connection = await ConnectionManager.getConnection();
            const options: FindOneOptions<Game> = {
                where: { id: gameId },
                loadRelationIds: true,
            };

            const game = await connection.manager.findOne(Game, options);
            if (game != null) return game;
            else return `Game with id: ${gameId} not found`;
        } catch (error) {
            console.log(error);
            return "Error";
        }
    }

    public static async getLastMoveById(
        gameId: number
    ): Promise<Date | string> {
        try {
            const connection = await ConnectionManager.getConnection();
            const options: FindOneOptions<Game> = {
                where: { id: gameId },
            };

            const game = await connection.manager.findOne(Game, options);

            if (game != null) return game.last_move;
            else return `Game with id: ${gameId} not found`;
        } catch (error) {
            console.log(error);
            return "Error";
        }
    }

    public static async changeGameTurnByGameID(
        gameID: number,
        newturn: number
    ): Promise<string> {
        const connection = await ConnectionManager.getConnection();
        const GameRepository = connection.getRepository(Game);
        const gameToUpdate = await this.getGameById(gameID);
        if (gameToUpdate) {
            await GameRepository.update({ id: gameID }, { turn: newturn });
            return "Updated successfully";
        } else {
            return `Game with id: ${gameID} not found`;
        }
    }

    public static async changelastMoveByGameId(
        gameID: number,
        lastTime: Date
    ): Promise<string> {
        const connection = await ConnectionManager.getConnection();
        const GameRepository = connection.getRepository(Game);
        const gameToUpdate = await this.getGameById(gameID);
        if (gameToUpdate) {
            await GameRepository.update(
                { id: gameID },
                { last_move: lastTime }
            );
            return "Updated successfully";
        } else {
            return `Game with id: ${gameID} not found`;
        }
    }

    public static async changeGameStateByGameID(
        gameID: number,
        state = "end"
    ): Promise<string> {
        try {
            const connection = await ConnectionManager.getConnection();
            const GameRepository = connection.getRepository(Game);
            const gameToUpdate = await this.getGameById(gameID);
            if (gameToUpdate) {
                await GameRepository.update({ id: gameID }, { state });
                return "Updated successfully";
            } else {
                return `Game with id: ${gameID} not found`;
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * QueryGame
     */
    async QueryGameByState(state: string) {
        try {
            const connection = await ConnectionManager.getConnection();
            const options: FindManyOptions<Game> = {
                where: {
                    state,
                },
                loadRelationIds: true,
            };

            const games = await connection.manager.find(Game, options);
            if (!games || games.length === 0) {
                return "No Pending Games";
            }
            return games;
        } catch (error) {
            throw error;
        }
    }

    async SaveGame(game: Game) {
        try {
            const connection = await ConnectionManager.getConnection();
            await connection.manager.save(game);
        } catch (error) {
            throw error;
        }
    }
}
