import "../../styles/ttt.less";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import {
  checkBoard,
  computerGetNextMove,
  getRandomMove,
  getDfsComputerMove,
} from "./tttUtils";
import { Link } from "react-router-dom";
import HeaderBar from "../../navBar";
//-1 is empty space
//0 = O
//1 = X

const TTT = () => {
  const [boardDimension, setBoardDimension] = useState<number>(3);
  const [turn, setTurn] = useState<0 | 1>(1);
  const [againstComputer, setAgainstComputer] = useState<boolean>(false);
  const [board, setBoard] = useState<number[][]>(
    Array.from({ length: 3 }, () => Array(3).fill(-1))
  );
  const [gameOverMsg, setGameOverMsg] = useState<string>("");
  const [lastMove, setLastMove] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<
    "Easy" | "Medium" | "Hard" | string
  >("Hard");

  const makeMove = (x: number, y: number) => {
    console.log("board: ", board);
    //console.log("Moving: x:", x, ", y:", y);
    if (board[x][y] === -1 && gameOverMsg === "") {
      setLastMove([x, y]);
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
      if (difficulty !== "Hard") {
        setTimeout(() => {
          let computerMove: number[] = [];
          if (difficulty === "Easy") {
            computerMove = getRandomMove(board);
          } else if (difficulty === "Medium") {
            computerMove = computerGetNextMove(board);
          }
          makeMove(computerMove[0], computerMove[1]);
        }, 500);
      } else {
        console.log("calling hard mode");
        const computerMove = getDfsComputerMove(board, lastMove);
        if (computerMove) makeMove(computerMove[0], computerMove[1]);
      }
    }
  }, [turn]);

  useEffect(() => {
    if (moves >= 5) {
      setGameOverMsg(checkBoard(board, moves));
    }
  }, [moves]);

  const resetBoard = () => {
    const newBoard = Array.from({ length: boardDimension }, () =>
      Array(boardDimension).fill(-1)
    );
    setLastMove([]);
    setBoard(newBoard);
    setMoves(0);
    setGameOverMsg("");
    setTurn(0);
  };

  useEffect(() => {
    resetBoard();
  }, [againstComputer, boardDimension]);

  const handleDimensionUpdate = (event: SelectChangeEvent) => {
    setBoardDimension(+event.target.value);
    if (+event.target.value > 3 && difficulty === "Hard") {
      setDifficulty("Medium");
    }
  };

  useEffect(() => {
    console.log("board: ", board);
  }, [board]);

  return (
    <>
      <HeaderBar activePage="writing" />
      <div className="top-nav back">
        <Link to={"/projects"}>{"<< Back"}</Link>
      </div>
      <div style={{ marginTop: "200px" }}>
        <label>Board Dimension: </label>
        <Select
          className="select-dimension"
          id={"grid-dimension-select"}
          value={boardDimension.toString()}
          label="Board Dimension"
          onChange={handleDimensionUpdate}
        >
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
        </Select>
        {"     "}
        {againstComputer && (
          <>
            <label>Difficulty Level: </label>
            <Select
              className="select-dimension"
              id={"grid-dimension-select"}
              value={difficulty}
              label="Difficulty Level"
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <MenuItem value={"Easy"}>Easy</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem disabled={boardDimension > 3} value={"Hard"}>
                Hard
              </MenuItem>
            </Select>
          </>
        )}
      </div>
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
        {board &&
          board.length === boardDimension &&
          Array(boardDimension)
            .fill(0)
            .map((_, x) => (
              <div key={x} className="column">
                {Array(boardDimension)
                  .fill(0)
                  .map((_, y) => (
                    <div
                      key={y}
                      className="cell"
                      onClick={() => makeMove(x, y)}
                    >
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
