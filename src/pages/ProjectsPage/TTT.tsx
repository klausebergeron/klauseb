import "../../styles/ttt.less";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
//-1 is empty space
//0 = O
//1 = X
function checkBoard(board: number[][], moves: number): string {
  //if 3 in row for 0 return "O wins!"
  //else if 3 in row for 1 return "X wins!"
  //else whole board is full return "Tie Game!"
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
        if (i === j) leftDiag++;
        if (i + j === board.length - 1) rightDiag++;
      }
    }
  }

  if (leftDiag === board.length || rightDiag === board.length) return true;
  else return false;
}
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
    if (board[x][y] === -1) {
      setBoard((oldBoard) => {
        const newBoard = Array.from(oldBoard);
        newBoard[x][y] = turn;
        return newBoard;
      });
      setMoves((m) => m + 1);
      setTurn((t) => (t === 1 ? 0 : 1));
    }
  };

  const computerMakeMove = () => {
    //calculate random x y coordinates for move
    //todo - optomize
    let x = 0;
    let y = 0;
    while (board[x][y] !== -1) {
      if (x < boardDimension - 1) x++;
      else if (y < boardDimension - 1) {
        x = 0;
        y++;
      }
    }
    makeMove(x, y);
  };

  useEffect(() => {
    if (turn === 1 && againstComputer === true) {
      computerMakeMove();
      setTurn(0);
    }
  }, [turn]);

  useEffect(() => {
    if (moves >= 5) {
      setGameOverMsg(checkBoard(board, moves));
    }
  }, [moves]);

  const resetBoard = () => {
    setBoard(Array.from({ length: 3 }, () => Array(3).fill(-1)));
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
        {Array(3)
          .fill(0)
          .map((_, x) => (
            <div key={x} className="column">
              {Array(3)
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
