import React, { useState } from "react";
import { createBoard, BoardType } from "../util/logic";
import Board from "../components/Board";

const Home: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(createBoard(8, 8, 10));

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl mb-4">Campo Minado</h1>
      <Board board={board} setBoard={setBoard} />
    </div>
  );
};

export default Home;
