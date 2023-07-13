import { Request, Response, Router } from "express";
import { GameDB } from "../DAO/GameDB";
import Player from "../Logic/Player";


export class MoveHandler{

    public async  autoPlay(starttime: Date, gameID: number) {
        let currentGame;

        try {
            currentGame = await GameDB.getGameById(gameID);
        } catch (e) {
            console.log(e);
        }

        const lastMove: Date = currentGame.last_move;

        if (starttime.getTime() > lastMove.getTime()) {
            const result = await Player.moveMyPlayer(currentGame.turn, currentGame);
            const game = this.splitMyOutput(result)
            return game
        }else{
            return null
        }
    }


    public splitMyOutput(result : number []){

        let roll: number = 0;
        let steps: number[] = [];
        let nextPlayer: number = 0;
        let state: string = "";

        roll = result[0];
        steps = result.slice(1, result.length - 1);
        nextPlayer = result[result.length - 1];

        if (steps[steps.length - 1] == 100) {
            state = "end";
        } else {
            state = "start";
        }

        const game = {
            roll,
            steps,
            turn: nextPlayer,
            state,
        };
        return game
    }
    public async move (userid , gameid,socket)  {
        try {
            let currentGame;
            try {
                currentGame = await GameDB.getGameById(gameid);
            } catch (error) {
                console.log(error);
            }

            if (currentGame.turn == userid && currentGame.state == "start") {
                const result = await Player.moveMyPlayer(userid, currentGame)
                const outPut = this.splitMyOutput(result)

               this.broadcast(gameid,outPut,socket)



                let getMyGame;

                const intervalId = setInterval(
                    async () => {
                        try {
                            getMyGame = await GameDB.getGameById(gameid);
                        } catch (e) {
                            console.log(e);
                        }
                        const myState: string = getMyGame.state;

                        if (myState == "end") {
                            clearInterval(intervalId);
                            socket.to(gameid).emit("state", "end")
                        }
                        let autoPlayOutput =  this.autoPlay(new Date(), gameid);
                        this.broadcast(gameid,autoPlayOutput,socket)
                    },
                    20000
                );

            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    };

    public broadcast(gameid,outPut,socket){
        socket.to(gameid).emit("rull_number", outPut.turn)
        let start= outPut.steps[0]
        let end1= outPut.steps[1]
        let end2= -1
        if(outPut.steps.length == 3)
            end2= outPut.steps[2]
        for(let i= start; i<=end1; i++){
            socket.to(gameid).emit("move", i)
        }
        if(end2!= -1){
            if(end1 > end2){
                let t= end1
                end1=end2
                end2=t
            }
            for(let i= end1; i<=end2; i++){
                socket.to(gameid).emit("move", i)
            }
        }
        socket.to(gameid).emit("new_turn", outPut.turn)
        socket.to(gameid).emit("state", outPut.state)




    }

}



// export default function moveRoutes(router: Router) {
//     router.post("/move", move);
// }
