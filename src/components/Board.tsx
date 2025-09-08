import React from "react";
import { openSquare, toggleFlag, type BoardType } from "../util/logic";
import Square from "./Square";
import "./styles.css";

type Props = {  
  board: BoardType;
  setBoard: (board: BoardType) => void;
};

const Board: React.FC<Props> = ({ board, setBoard }) => {
  return (
    <div className="board" style={{ gridTemplateColumns: `repeat(${board[0].length}, 2.5rem)` }}>
      {board.map((row, rIdx) =>
        row.map((square, cIdx) => (
          <Square
            key={`${rIdx}-${cIdx}`}
            square={square}
            onClick={() => setBoard(openSquare(board, rIdx, cIdx))}
            onRightClick={() => setBoard(toggleFlag(board, rIdx, cIdx))}
          />
        ))
      )}
    </div>
  );
};

export default Board;