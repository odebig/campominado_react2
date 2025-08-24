import React from "react";
import { SquareType } from "../util/logic";

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
      className="w-10 h-10 border flex items-center justify-center text-lg"
    >
      {content}
    </button>
  );
};

export default Square;
