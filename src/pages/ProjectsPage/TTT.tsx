import "../../styles/ttt.less";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
//-1 is empty space
//0 = O
//1 = X
function checkBoard(board: number[][], moves: number): string {
  if (checkWin(board, 0)) return "O wins!";
  else if (checkWin(board, 1)) return "X wins!";
  if (moves >= 9) return "Tie Game!";
  else return "";
}

function checkWin(board: number[][], player: number): boolean {
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

function nextValidMove(board: number[][]): number[] {
  for (let i: number = 0; i < board.length; i++) {
    for (let j: number = 0; j < board[0].length; j++) {
      if (board[i][j] === -1) return [i, j];
    }
  }
  return [0, 0];
}

const TTT = () => {
  const boardDimension = 3;
  const [turn, setTurn] = useState<0 | 1>(0);
  const [againstComputer, setAgainstComputer] = useState<boolean>(false);
  const [board, setBoard] = useState<number[][]>(
    Array.from({ length: boardDimension }, () => Array(boardDimension).fill(-1))
  );
  const [gameOverMsg, setGameOverMsg] = useState<string>("");
  const [computerMoves, setComputerMoves] = useState<number[][]>([]);
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

  const computerGetNextMove = (): number[] => {
    //calculate random x y coordinates for move
    //todo - streamline code
    const compMovesNow = Array.from(computerMoves);
    const boardNow = Array.from(board);
    let x: number | null = null;
    let y: number | null = null;
    const possibleMoves: number[][] = [];
    if (compMovesNow.length > 0) {
      for (const move of compMovesNow) {
        let moveX = move[0];
        let moveY = move[1];
        if (moveX > 0 && boardNow[moveX - 1][moveY] === -1)
          possibleMoves.push([moveX - 1, moveY]);
        if (moveX < boardNow.length && boardNow[moveX + 1][moveY] === -1)
          possibleMoves.push([moveX + 1, moveY]);
        if (moveY > 0 && boardNow[moveX][moveY - 1] === -1)
          possibleMoves.push([moveX - 1, moveY]);
        if (moveY < boardNow.length && boardNow[moveX][moveY + 1] === -1)
          possibleMoves.push([moveX, moveY + 1]);
        if (moveX > 0 && moveY > 0 && board[moveX - 1][moveY - 1] === -1)
          possibleMoves.push([moveX - 1, moveY - 1]);
        if (
          moveX < boardNow.length &&
          moveY < boardNow.length &&
          boardNow[moveX + 1][moveY + 1] === -1
        )
          possibleMoves.push([moveX + 1, moveY + 1]);
      }
    }
    if (possibleMoves.length > 0) {
      for (let i = 0; i < possibleMoves.length; i++) {
        const move = possibleMoves[i];
        let testBoard = Array.from(boardNow);
        testBoard[move[0]][move[1]] = 1;
        if (checkWin(testBoard, 1)) {
          x = move[0];
          y = move[1];
        }
        break;
      }
    }

    if (x === null || y === null) {
      const nvm = nextValidMove(board);
      x = nvm[0];
      y = nvm[1];
    }
    return [x, y];
  };

  useEffect(() => {
    if (turn === 1 && againstComputer === true) {
      const computerMove = computerGetNextMove();
      makeMove(computerMove[0], computerMove[1]);
      setTurn(0);
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
    setComputerMoves([]);
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
