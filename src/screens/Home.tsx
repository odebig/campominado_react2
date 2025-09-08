import React, { useState } from "react";
import { createBoard, type BoardType } from "../util/logic";
import Board from "../components/Board";

const ROWS = 8;
const COLS = 8;
const MINES = 5;

const Home: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(() => createBoard(ROWS, COLS, MINES));
  const [status, setStatus] = useState<"playing" | "lost"| "won">("playing");

  const resetGame = () => {
    setBoard(createBoard(ROWS, COLS, MINES));
    setStatus("playing");
  };

  return (
    <div>
      <h1>Campo Minado 💣</h1>
      {status === "lost" && <p>💥 Você perdeu! Clique em reiniciar.</p>}
      {status === "won" && <p>🎉 Você venceu! Clique em reiniciar para jogar de novo.</p>}
      <Board
        board={board}
        setBoard={setBoard}
        setStatus={setStatus}
        onReset={resetGame}
        status={status}
      />
    </div>
  );
};

export default Home;
