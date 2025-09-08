import React from "react";
import { type SquareType } from "../util/logic";

type Props = {
  square: SquareType;
  onClick: () => void;
  onRightClick: () => void;
};

const Square: React.FC<Props> = ({ square, onClick, onRightClick }) => {
  let content = "";
  if (square.state === "flagged") content = "🚩";
  else if (square.state === "opened" && square.hasMine) content = "💣";
  else if (square.state === "opened" && square.nearMines > 0) content = square.nearMines.toString();

  return (
    <button
      onClick={onClick}
      onContextMenu={(e) => { e.preventDefault(); onRightClick(); }}
      style={{ backgroundColor: square.state === "opened" ? "#1a1a1a" : "#888",}}
    >
      {content}
    </button>
  );
};

export default Square;
