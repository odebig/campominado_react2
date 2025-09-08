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

export type GameStatus = "playing" | "lost" | "won";

export interface OpenSquareResult {
  board: BoardType;
  status: GameStatus;
}

export function checkWin(board: BoardType): boolean {
  for (const row of board) {
    for (const square of row) {
      if (!square.hasMine && square.state !== "opened") {
        return false;
      }
    }
  }
  return true;
}

export function openSquare(board: BoardType, row: number, col: number): OpenSquareResult {
  const newBoard = board.map(r => r.map(s => ({ ...s })));

  const clicked = newBoard[row][col];

  // 👉 Se clicou em bomba, perdeu
  if (clicked.hasMine) {
    clicked.state = "opened";

    // Abrir todas as bombas
    for (let r = 0; r < newBoard.length; r++) {
      for (let c = 0; c < newBoard[0].length; c++) {
        if (newBoard[r][c].hasMine) {
          newBoard[r][c].state = "opened";
        }
      }
    }

    return {
      board: newBoard,
      status: "lost",
    };
  }

  // 👉 Caso não seja bomba, segue abrindo células
  const dfs = (r: number, c: number) => {
    const square = newBoard[r][c];
    if (square.state !== "closed") return;
    square.state = "opened";

    if (square.nearMines === 0 && !square.hasMine) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const nr = r + i;
          const nc = c + j;
          if (
            nr >= 0 &&
            nr < newBoard.length &&
            nc >= 0 &&
            nc < newBoard[0].length &&
            !(i === 0 && j === 0)
          ) {
            dfs(nr, nc);
          }
        }
      }
    }
  };

  dfs(row, col);

  // ✅ Verifica vitória após abrir as células
  if (checkWin(newBoard)) {
    return {
      board: newBoard,
      status: "won",
    };
  }

  return {
    board: newBoard,
    status: "playing",
  };
}



// Função básica para marcar/desmarcar bandeira
export function toggleFlag(board: BoardType, row: number, col: number): BoardType {
  const newBoard = board.map(r => r.map(s => ({ ...s })));
  const square = newBoard[row][col];
  if (square.state === "closed") square.state = "flagged";
  else if (square.state === "flagged") square.state = "closed";
  return newBoard;
}
