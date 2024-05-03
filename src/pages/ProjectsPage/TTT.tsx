import "../../styles/ttt.less";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
//-1 is empty space
//0 = O
//1 = X
export const O_WIN_MSG = "O wins!";
export const X_WIN_MSG = "X wins!";
export const TIE_GAME_MSG = "Tie Game!";

export function checkBoard(board: number[][], moves: number): string {
  if (checkWin(board, 0)) return O_WIN_MSG;
  else if (checkWin(board, 1)) return X_WIN_MSG;
  if (moves >= 9) return TIE_GAME_MSG;
  else return "";
}

export function checkWin(board: number[][], player: number): boolean {
  let leftDiag = 0;
  let rightDiag = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i].every((element) => element === player)) return true;
    for (let j = 0; j < board[i].length; j++) {
      if (board.every((element) => element[i] === player)) return true;
      if (board[i][j] === player) {
        if (i === j && ++leftDiag === board.length) return true;
        if (i + j === board.length - 1 && ++rightDiag === board.length)
          return true;
      }
    }
  }
  return false;
}

export function nextValidMove(board: number[][]): number[] {
  for (let i: number = 0; i < board.length; i++) {
    for (let j: number = 0; j < board[0].length; j++) {
      if (board[i][j] === -1) return [i, j];
    }
  }
  return [0, 0];
}

export function bestMoves(board: number[][], player: number): number[][] {
  const userOrCompMoves = getMovesForUser(board, player);
  const possibleMoves: Set<string> = new Set();
  const stringifyXY = (x: number, y: number) => `${x},${y}`;
  if (userOrCompMoves.length > 0) {
    for (let move of userOrCompMoves) {
      let moveX = move[0];
      let moveY = move[1];
      if (moveX > 0 && board[moveX - 1][moveY] === -1) {
        possibleMoves.add(stringifyXY(moveX - 1, moveY));
      }
      if (moveX < board.length - 1 && board[moveX + 1][moveY] === -1) {
        possibleMoves.add(stringifyXY(moveX + 1, moveY));
      }
      if (moveY > 0 && board[moveX][moveY - 1] === -1) {
        possibleMoves.add(stringifyXY(moveX, moveY - 1));
      }
      if (moveY < board.length - 1 && board[moveX][moveY + 1] === -1) {
        possibleMoves.add(stringifyXY(moveX, moveY + 1));
      }
      if (moveX > 0 && moveY > 0 && board[moveX - 1][moveY - 1] === -1) {
        possibleMoves.add(stringifyXY(moveX - 1, moveY - 1));
      }
      if (
        moveX < board.length - 1 &&
        moveY < board.length - 1 &&
        board[moveX + 1][moveY + 1] === -1
      ) {
        possibleMoves.add(stringifyXY(moveX + 1, moveY + 1));
      }
      if (
        moveX < board.length - 1 &&
        moveY > 0 &&
        board[moveX + 1][moveY - 1] === -1
      ) {
        possibleMoves.add(stringifyXY(moveX + 1, moveY - 1));
      }
      if (
        moveX > 0 &&
        moveY < board.length - 1 &&
        board[moveX - 1][moveY + 1] === -1
      ) {
        possibleMoves.add(stringifyXY(moveX - 1, moveY + 1));
      }
    }
  }
  const arrBestMoves: number[][] = [];
  possibleMoves.forEach((m) => {
    let mv = m.split(",");
    return arrBestMoves.push([+mv[0], +mv[1]]);
  });
  return arrBestMoves;
}

export function getOneWinningMove(
  board: number[][],
  player: number
): number[] | null {
  const bestPlayerMoves = bestMoves(board, player);
  for (let i = 0; i < bestPlayerMoves.length; i++) {
    const move = bestPlayerMoves[i];
    let testBoard: number[][] = JSON.parse(JSON.stringify(board));
    testBoard[move[0]][move[1]] = player;
    if (checkWin(testBoard, player)) {
      return [move[0], move[1]];
    }
  }
  return null;
}

export const getMovesForUser = (board: number[][], player: number) => {
  const moves: number[][] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === player) moves.push([i, j]);
    }
  }
  return moves;
};

export const computerGetNextMove = (board: number[][]): number[] => {
  //calculate random x y coordinates for move
  //todo - streamline code
  const boardNow = Array.from(board);
  const bestComputerMoves = bestMoves(boardNow, 1);
  const bestUserMoves = bestMoves(boardNow, 0);

  let x: number | null = null;
  let y: number | null = null;
  let maybeBestMove: number[] | null = null;

  //check if there are optimal moves for the computer
  if (bestComputerMoves.length > 0) {
    const winningMove = getOneWinningMove(boardNow, 1);
    if (winningMove !== null) return [winningMove[0], winningMove[1]];
    //if theres no winning move the next best will be some optimal one
    else maybeBestMove = bestComputerMoves[0];
  }
  //check if computer can block other player from winning next turn
  if (bestUserMoves.length > 0) {
    const winningMove = getOneWinningMove(boardNow, 0);
    if (winningMove !== null) return [winningMove[0], winningMove[1]];
    //if there's no optimal move for X, steal an optimal move from 0
    else if (maybeBestMove === null) maybeBestMove = bestUserMoves[0];
  }
  if (maybeBestMove !== null) return maybeBestMove;
  //if there's no optimal moves to use or steal, get some valid move
  else if (x === null || y === null) {
    const nvm = nextValidMove(board);
    x = nvm[0];
    y = nvm[1];
  }
  return [x, y];
};

const TTT = () => {
  const boardDimension = 3;
  const [turn, setTurn] = useState<0 | 1>(0);
  const [againstComputer, setAgainstComputer] = useState<boolean>(false);
  const [board, setBoard] = useState<number[][]>(
    Array.from({ length: boardDimension }, () => Array(boardDimension).fill(-1))
  );
  const [gameOverMsg, setGameOverMsg] = useState<string>("");
  const [moves, setMoves] = useState<number>(0);

  const makeMove = (x: number, y: number) => {
    if (board[x][y] === -1 && gameOverMsg === "") {
      setBoard((oldBoard) => {
        const newBoard = Array.from(oldBoard);
        newBoard[x][y] = turn;
        return newBoard;
      });
      setMoves((m) => m + 1);
      setTurn((t) => (t === 1 ? 0 : 1));
    }
  };

  useEffect(() => {
    if (turn === 1 && againstComputer === true) {
      const computerMove = computerGetNextMove(board);
      makeMove(computerMove[0], computerMove[1]);
    }
  }, [turn]);

  useEffect(() => {
    if (moves >= 5) {
      setGameOverMsg(checkBoard(board, moves));
    }
  }, [moves]);

  const resetBoard = () => {
    setBoard(
      Array.from({ length: boardDimension }, () =>
        Array(boardDimension).fill(-1)
      )
    );
    setMoves(0);
    setGameOverMsg("");
    setTurn(0);
  };

  useEffect(() => {
    resetBoard();
  }, [againstComputer]);

  return (
    <>
      <div>
        <label>Play against computer</label>
        <Checkbox
          checked={againstComputer}
          onChange={() => setAgainstComputer(!againstComputer)}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
      <div>
        {gameOverMsg === "" ? (
          <h3>{turn === 0 ? "O" : "X"}'s turn!</h3>
        ) : (
          <h2>{gameOverMsg}</h2>
        )}
      </div>
      <div className="ttt-board">
        {Array(boardDimension)
          .fill(0)
          .map((_, x) => (
            <div key={x} className="column">
              {Array(boardDimension)
                .fill(0)
                .map((_, y) => (
                  <div key={y} className="cell" onClick={() => makeMove(x, y)}>
                    {board[x][y] === 0 ? "O" : board[x][y] === 1 ? "X" : ""}
                  </div>
                ))}
            </div>
          ))}
      </div>
      <div>
        <button onClick={resetBoard} className="reset-button">
          Reset Game
        </button>
      </div>
    </>
  );
};

export default TTT;
