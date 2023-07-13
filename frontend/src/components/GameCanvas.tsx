import { FC, useEffect, useRef } from "react";

interface GameCanvasProps {
  players?: {
    playerId: number;
    position: number;
  }[];
}

/**
 * The function `drawBoard` takes a canvas context, width, height, and step size as parameters and
 * draws a grid on the canvas.
 * @param {CanvasRenderingContext2D} context - The context parameter is the rendering context of the
 * canvas element on which you want to draw the board. It is of type CanvasRenderingContext2D, which
 * provides methods and properties for drawing on the canvas.
 * @param {number} w - The parameter `w` represents the width of the canvas in pixels.
 * @param {number} h - The parameter `h` represents the height of the canvas.
 * @param {number} step - The "step" parameter represents the distance between each line on the board.
 * It determines the size of each square on the board.
 */

function drawBoard(
  context: CanvasRenderingContext2D,
  w: number,
  h: number,
  step: number
) {
  context.beginPath();
  for (var x = 0; x <= w; x += step) {
    context.moveTo(x, 0);
    context.lineTo(x, h);
  }
  context.strokeStyle = "rgb(0,0,0)";
  context.lineWidth = 1;
  context.stroke();
  context.beginPath();
  for (var y = 0; y <= h; y += step) {
    context.moveTo(0, y);
    context.lineTo(w, y);
  }
  context.strokeStyle = "rgb(0,0,0)";
  context.lineWidth = 1;
  context.stroke();
}

let gameBoardGrid: any[][];

function gameBoard(): any[][] {
  const rows = 10;
  const columns = 10;
  const gameBoard: any[][] = [];
  let isRightToLeft = false;
  for (let row = rows - 1; row >= 0; row--) {
    const currentRow: any[] = [];
    for (let col = 0; col < columns; col++) {
      currentRow.push({ x: col * 100, y: -(-1 + rows - row) * 100 + 1000 });
    }
    if (isRightToLeft) currentRow.reverse();
    gameBoard.push(currentRow);
    isRightToLeft = !isRightToLeft;
  }
  return gameBoard;
}

function drawPlayer(
  context: CanvasRenderingContext2D,

  players: any[] | undefined
) {
  if (!players) {
    return;
  }

  for (const player of players) {
    const row = Math.floor(player.position / 10);
    const col = player.position % 10;

    context.beginPath();
    context.arc(
      gameBoardGrid[row][col].x + 50,
      gameBoardGrid[row][col].y - 50,
      30,
      0,
      2 * Math.PI
    );
    context.fill();
    context.stroke();
  }
}

const GameCanvas: FC<GameCanvasProps> = ({ players }) => {
  const gameRef = useRef<HTMLCanvasElement>(null);
  let context: CanvasRenderingContext2D | null;

  useEffect(() => {
    if (!gameRef || !gameRef.current) {
      return;
    }

    gameBoardGrid = gameBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    context = gameRef.current.getContext("2d");
    if (!context) {
      return;
    }
    context.canvas.width = 1000;
    context.canvas.height = 1000;

    drawBoard(context, 1000, 1000, 100);
    drawPlayer(context, players);
  }, [players]);

  return (
    <div className="min-h-screen w-full container m-auto flex justify-center content-center">
      <canvas
        className=" bg-[url('/public/snakeAndLadder.jpeg')] bg-no-repeat "
        ref={gameRef}
        style={{
          backgroundSize: "100% 100%",
        }}
      ></canvas>
    </div>
  );
};

export default GameCanvas;
