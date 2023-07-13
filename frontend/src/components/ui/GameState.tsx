import { Container, Typography, LinearProgress, Switch } from "@material-ui/core";
import React, { useEffect, useState, memo } from "react";
import { Socket } from "socket.io-client";

interface GameHeaderProps {
    socket: Socket;
}

function useGameData(socket: Socket) {
    let total = 0;
    const [number, setNumber] = useState(0);
    const [state, setState] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        socket.on("add_player", (data) => {
            total = data.playersNumber;
            setNumber(data.joinedNumber);
            setName(data.gameName);
            setState(data.state);
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

    const mapStateToSwitch = (state: string) => {
        switch (state) {
            case "start":
                return true;
            case "end":
                return undefined;
            default:
                return false;
        }
    };

    const mapSwitchToState = (value: boolean | undefined) => {
        switch (value) {
            case true:
                return "start";
            case undefined:
                return "end";
            default:
                return "pending";
        }
    };

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;
        const newState = mapSwitchToState(value);
        setState(newState);
        socket.emit("add_player", newState);
    };

    return (
        <Container>
            <div
                className="name"
                style={{
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.5s",
                }}
            >
                <Typography variant="h3">{name}</Typography>
            </div>
            <LinearProgress variant="determinate" value={(number / total) * 100} />
            <Typography variant="h5">Players joined: {number} / {total}</Typography>
            <Switch
                checked={mapStateToSwitch(state)}
                onChange={handleSwitchChange}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
            />
            <Typography variant="h6">Game state: {state}</Typography>
        </Container>
    );
});

export default GameHeader;