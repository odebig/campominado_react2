import React from "react";
import { openSquare, toggleFlag, type BoardType } from "../util/logic";
import Square from "./Square";
import "./styles.css";

type Props = {
  board: BoardType;
  setBoard: (board: BoardType) => void;
  setStatus: (status: "playing" | "lost" | "won") => void;
  onReset: () => void;
  status: string;
};

const Board: React.FC<Props> = ({
  board,
  setBoard,
  setStatus,
  onReset,
  status,
}) => {
  const handleClick = (row: number, col: number) => {
    if (status !== "playing") return;
    const result = openSquare(board, row, col);
    setBoard(result.board);
    setStatus(result.status);
  };
  
  const handleRightClick = (row: number, col: number) => {
    if (status !== "playing") return;
    const newBoard = toggleFlag(board, row, col);
    setBoard(newBoard);
  };

  return (
    <>
      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${board[0].length}, 2.5rem)` }}
      >
        {board.map((row, rIdx) =>
          row.map((square, cIdx) => (
            <Square
              key={`${rIdx}-${cIdx}`}
              square={square}
              onClick={() => handleClick(rIdx, cIdx)}
              onRightClick={() => handleRightClick(rIdx, cIdx)}
            />
          ))
        )}
      </div>
      <div className="botao">
        <button onClick={onReset}>🔄 Reiniciar Jogo</button>{" "}
      </div>
    </>
  );
};

export default Board;
