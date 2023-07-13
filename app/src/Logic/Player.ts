import { GameUserDB } from "../DAO/GameUserDB";
import { BoardDB } from "../DAO/BoardDB";
import { GameDB } from "../DAO/GameDB";
import { Game } from "../entity/Game";
import {Server, Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

export default class Player {
    private static rollDice(): number {
        return Math.floor(Math.random() * 6) + 1;
    }

    public static async changesPerMove(
        gameId: number,
        userId: number,
        newPosition: number,
        nextTurnOrder: number,
        maxPlayers: number
    ): Promise<number> {
        try {
            await GameUserDB.changePositionByGameIdAndUserID(
                gameId,
                userId,
                newPosition
            );
        } catch (error) {
            console.log(error);
        }

        if (newPosition == 100) {
            try {
                await GameDB.changeGameStateByGameID(gameId);
                await GameUserDB.changeUsersState(gameId);
            } catch (error) {
                console.log(error);
            }
        }

        if (nextTurnOrder > maxPlayers) {
            nextTurnOrder = 1;
        }

        const comingUser = (await GameUserDB.getGameUserByGameIdAndTurnOrder(
            gameId,
            nextTurnOrder
        )) as any;

        try {
            await GameDB.changeGameTurnByGameID(gameId, comingUser.user_id);
        } catch (error) {
            console.log(error);
        }

        const currentTime: Date = new Date();
        try {
            await GameDB.changelastMoveByGameId(gameId, currentTime);
        } catch (error) {
            console.log(error);
        }

        return comingUser.user_id;
    }

    public static async moveMyPlayer(userId: number, game: Game) {
        let currentUserGame;
        let currentElement;
        let currentPosition = 0;
        let newPosition = 0;
        let id_board = 0;
        let nextTurnOrder = 0;
        let isActive = 1;
        const mySteps: number[] = [];

        if (game.state != "end") {
            try {
                currentUserGame = await GameUserDB.getGameUserByUserAndGameId(
                    userId,
                    game.id
                );

                isActive = currentUserGame.active;
                const dice = this.rollDice();

                mySteps.push(dice);
                currentPosition = currentUserGame.position;
                nextTurnOrder = currentUserGame.turn_order + 1;

                newPosition = currentPosition + dice;
                mySteps.push(newPosition);
                id_board = game.board_id.id;

                try {
                    currentElement =
                        await BoardDB.getBoardElementByBoardIdAndStart(
                            id_board,
                            newPosition
                        );

                    if (currentElement.end >= 0) {
                        newPosition = currentElement.end;
                        mySteps.push(newPosition);
                    }

                    if (newPosition > 100) {
                        newPosition = currentUserGame.position;
                        mySteps.pop();
                    }

                    const nexTID = await this.changesPerMove(
                        game.id,
                        userId,
                        newPosition,
                        nextTurnOrder,
                        game.players_number
                    );
                    mySteps.push(nexTID);
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        }

        return mySteps;
    }
}
