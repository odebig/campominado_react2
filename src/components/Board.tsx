import React from "react";
import { openSquare, toggleFlag, type BoardType } from "../util/logic";
import Square from "./Square";
import "./styles.css";

type Props = {  
  board: BoardType;
  setBoard: (board: BoardType) => void;
  setStatus: (status: "playing" | "lost"| "won") => void;
  onReset: () => void;
};

const Board: React.FC<Props> = ({ board, setBoard, setStatus, onReset }) => { 
  const handleClick = (row: number, col: number) => {
    const result = openSquare(board, row, col);
    setBoard(result.board);
    setStatus(result.status);

    
    
    
  };

  return (
    <>
    <div className="board" style={{ gridTemplateColumns: `repeat(${board[0].length}, 2.5rem)` }}>
      {board.map((row, rIdx) =>
        row.map((square, cIdx) => (
          <Square
            key={`${rIdx}-${cIdx}`}
            square={square}
            onClick={() => handleClick(rIdx, cIdx)} 
            onRightClick={() => setBoard(toggleFlag(board, rIdx, cIdx))}
          />
        ))
      )}
    </div>
    <button className="botao"  onClick={onReset}>🔄 Reiniciar Jogo</button> 
    </>
  );
};

export default Board;

