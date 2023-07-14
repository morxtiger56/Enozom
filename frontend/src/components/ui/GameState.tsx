import { Container, Typography, CircularProgress, IconButton } from "@material-ui/core";
import React, { useEffect, useState, memo } from "react";
import { Socket } from "socket.io-client";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import StopIcon from "@material-ui/icons/Stop";

interface GameHeaderProps {
    socket: Socket;
}

function useGameData(socket: Socket) {
    console.log(" here ")
    const game = JSON.parse(localStorage.getItem("gameData") || "{}");
    const [number, setNumber] = useState(game ? game.joinedNumber : 0);
    const [total, setTotal] = useState(game ? game.playersNumber : 0);
    const [state, setState] = useState(game ? game.state : "");
    const [name, setName] = useState(game ? game.gameName : "");

    useEffect(() => {
        socket.on("add_player", (data) => {
            localStorage.setItem("gameData", JSON.stringify(data));
            console.log(data);

            setTotal(total || data.playersNumber);
            setState(name || data.state);
            setNumber(data.joinedNumber);
            setName(data.gameName);
        });
        return () => {
            socket.off("add_player");
        };
    }, []);


    return [number, name, state, setState, total] as const;
}

const GameHeader: React.FC<GameHeaderProps> = memo(({ socket }) => {
    const [number, name, state, setState, total] = useGameData(socket);
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        setVisible(false);
        const timer = setTimeout(() => {
            setVisible(true);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [name]);

    return (
        <Container className="game-header">
            <div
                className="game-name"
                style={{
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.5s",
                    color: "white",
                    backgroundColor: "purple",
                    padding: "10px",
                    borderRadius: "10px",
                    fontFamily: "Roboto",
                    textShadow: "2px 2px 4px black",
                    background: "linear-gradient(to right, purple , yellow)",
                }}
            >
                <Typography variant="h3">{name}</Typography>
            </div>
            <CircularProgress variant="determinate" value={(number / total) * 100} color="secondary" style={{margin: "10px"}}/>
            <div className="game-info">
                <Typography variant="h5" className="game-players">Players joined: {number}</Typography>
                <div className="game-status">
                    {state === "start" ? (
                        <IconButton disabled={true}>
                            <PlayArrowIcon style={{color: "green"}}/>
                        </IconButton>
                    ) : state === "pending" ? (
                        <IconButton disabled={true}>
                            <PauseIcon style={{color: "orange"}}/>
                        </IconButton>
                    ) : (
                        <IconButton disabled={true}>
                            <StopIcon style={{color: "red"}}/>
                        </IconButton>
                    )}
                </div>
            </div>
        </Container>
    );
});

export default GameHeader;