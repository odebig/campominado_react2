export type SquareType = {
  row: number;
  col: number;
  hasMine: boolean;
  nearMines: number;
  state: "closed" | "opened" | "flagged";
};

export type BoardType = SquareType[][];

export const createBoard = (rows: number, cols: number, mines: number): BoardType => {
  const board: BoardType = [];

  for (let r = 0; r < rows; r++) {
    const row: SquareType[] = [];
    for (let c = 0; c < cols; c++) {
      row.push({ row: r, col: c, hasMine: false, nearMines: 0, state: "closed" });
    }
    board.push(row);
  }

  // Distribuir minas
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!board[r][c].hasMine) {
      board[r][c].hasMine = true;
      minesPlaced++;
    }
  }

  // Calcular minas próximas
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!board[r][c].hasMine) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const nr = r + i;
            const nc = c + j;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].hasMine) {
              count++;
            }
          }
        }
        board[r][c].nearMines = count;
      }
    }
  }

  return board;
};

// Função básica para abrir uma célula
export function openSquare(board: BoardType, row: number, col: number): BoardType {
  const newBoard = board.map(r => r.map(s => ({ ...s })));
  const square = newBoard[row][col];
  if (square.state === "closed") {
    square.state = "opened";
  }
  return newBoard;
}

// Função básica para marcar/desmarcar bandeira
export function toggleFlag(board: BoardType, row: number, col: number): BoardType {
  const newBoard = board.map(r => r.map(s => ({ ...s })));
  const square = newBoard[row][col];
  if (square.state === "closed") square.state = "flagged";
  else if (square.state === "flagged") square.state = "closed";
  return newBoard;
}
