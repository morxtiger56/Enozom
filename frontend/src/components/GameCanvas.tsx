import { FC, useEffect, useRef } from "react";

interface GameCanvasProps {}

// Box width
var bw = 1000;
// Box height
var bh = 1000;
// Padding
var p = 20;

function drawBoard(context: CanvasRenderingContext2D) {
  for (var x = 0; x <= 500; x += 40) {
    console.log(x);

    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
  }

  for (var x = 0; x <= 1000; x += 40) {
    context.moveTo(p, 0.5 + x + p);
    context.lineTo(bw + p, 0.5 + x + p);
  }
  context.strokeStyle = "black";
  context.stroke();
}

const GameCanvas: FC<GameCanvasProps> = () => {
  const gameRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!gameRef || !gameRef.current) {
      return;
    }
    const context = gameRef.current.getContext("2d");
    if (!context) {
      return;
    }
    drawBoard(context);
  }, []);

  return (
    <div className="min-h-screen w-full ">
      <canvas ref={gameRef}></canvas>
    </div>
  );
};

export default GameCanvas;
