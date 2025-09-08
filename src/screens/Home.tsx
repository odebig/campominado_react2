import React, { useState } from "react";
import { createBoard, type BoardType } from "../util/logic";
import Board from "../components/Board";

const Home: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(createBoard(8, 8, 10));

  return (
    <div>
        <h1>Campo Minado</h1>
        <Board board={board} setBoard={setBoard} />
    </div>
  );
};

export default Home;
