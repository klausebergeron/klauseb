import { describe, it, expect } from "vitest";
import {
  bestMoves,
  nextValidMove,
  checkWin,
  checkBoard,
  O_WIN_MSG,
  X_WIN_MSG,
  TIE_GAME_MSG,
  getOneWinningMove,
  computerGetNextMove,
  getDfsComputerMove,
} from "../tttUtils";

const fullTieBoard: number[][] = [
  [1, 0, 0],
  [0, 1, 1],
  [1, 0, 0],
];
const sampleBoard: number[][] = [
  [-1, 0, 0],
  [1, -1, 1],
  [-1, -1, -1],
];
describe("bestMoves", () => {
  it("should return all spaces that contain -1 that touch 0s", () => {
    const expected: number[][] = [
      [0, 0],
      [1, 1],
    ];
    const actual = bestMoves(sampleBoard, 0);
    expect(actual.length).toEqual(expected.length);
    actual.sort().forEach((a, i) => expect(expected[i]).toStrictEqual(a));
  });
  it("should return an empty array if the board is full", () => {
    const actual = bestMoves(fullTieBoard, 0);
    expect(actual).toStrictEqual([]);
  });
  it("should return unique set for best move", () => {
    const canWinBoard1: number[][] = [
      [0, -1, 0],
      [1, -1, 0],
      [1, 0, 1],
    ];
    const expectedBestMoves = [
      [0, 1],
      [1, 1],
    ];
    const actual = bestMoves(canWinBoard1, 1);
    console.log("actual: ", actual);
    expect(actual.length).toEqual(expectedBestMoves.length);
    expect(actual.sort()).toStrictEqual(expectedBestMoves.sort());
  });
});

describe("nextValidMove", () => {
  it("should return the earliest -1 space in the board", () => {
    expect(nextValidMove(sampleBoard)).toStrictEqual([0, 0]);
    const newBoard = Array.from(sampleBoard);
    newBoard[0][0] = 0;
    expect(nextValidMove(newBoard)).toStrictEqual([1, 1]);
  });
  it("should return [0,0] for a full board", () => {
    expect(nextValidMove(fullTieBoard)).toStrictEqual([0, 0]);
  });
});

describe("checkWin", () => {
  it("should return false for either user when noone has won", () => {
    sampleBoard[0][0] = -1;
    expect(checkWin(sampleBoard, 0)).toBeFalsy();
    expect(checkWin(sampleBoard, 1)).toBeFalsy();
    expect(checkWin(fullTieBoard, 0)).toBeFalsy();
    expect(checkWin(fullTieBoard, 1)).toBeFalsy();
  });
  it("should return true for user when they have won a rowmatch and false for X", () => {
    sampleBoard[0][0] = 0;
    expect(checkWin(sampleBoard, 0)).toBeTruthy();
    expect(checkWin(sampleBoard, 1)).toBeFalsy();
  });
  it("should return true for user when they have won a colmatch and false for X", () => {
    const rowWinBoard: number[][] = [
      [-1, 0, 0],
      [1, 0, 1],
      [1, 0, 1],
    ];
    expect(checkWin(rowWinBoard, 0)).toBeTruthy();
    expect(checkWin(rowWinBoard, 1)).toBeFalsy();
  });
  it("should return true for user when they have won a left diagonal false for X", () => {
    const leftdiagWinBoard: number[][] = [
      [0, 1, 0],
      [1, 0, 1],
      [1, 0, 0],
    ];
    expect(checkWin(leftdiagWinBoard, 0)).toBeTruthy();
    expect(checkWin(leftdiagWinBoard, 1)).toBeFalsy();
  });
  it("should return true for user when they have won a left diagonal false for X", () => {
    const rightdiagWinBoard: number[][] = [
      [1, 1, 0],
      [1, 0, 1],
      [0, 0, 1],
    ];
    expect(checkWin(rightdiagWinBoard, 0)).toBeTruthy();
    expect(checkWin(rightdiagWinBoard, 1)).toBeFalsy();
  });
});

describe("checkBoard", () => {
  it("should return O wins message when O wins", () => {
    const rowWinBoard: number[][] = [
      [-1, 0, 0],
      [1, 0, 1],
      [1, 0, 1],
    ];
    expect(checkBoard(rowWinBoard, 9)).toEqual(O_WIN_MSG);
  });
  it("should return X wins message when X wins", () => {
    const xWinBoard: number[][] = [
      [1, 0, 0],
      [1, -1, 0],
      [1, 0, 1],
    ];
    expect(checkBoard(xWinBoard, 9)).toEqual(X_WIN_MSG);
  });
  it("should return tie game message when board is full and game is tied", () => {
    expect(checkBoard(fullTieBoard, 9)).toEqual(TIE_GAME_MSG);
  });
});

describe("getOneWinningMove", () => {
  const canWinBoard: number[][] = [
    [-1, 0, 0],
    [1, -1, 0],
    [1, 0, 1],
  ];
  it("should return a winning move it finds for 0", () => {
    const winninMoveOptions = [
      [0, 0],
      [1, 1],
    ];
    const winningMove = getOneWinningMove(canWinBoard, 0);
    expect(winninMoveOptions).toContainEqual(winningMove);
  });
  it("should return a winning move it finds for 1", () => {
    const winninMoveOptions = [[0, 0]];
    const winningMove = getOneWinningMove(canWinBoard, 1);
    expect(winninMoveOptions).toContainEqual(winningMove);
  });
});

describe("computerGetNextMove", () => {
  it("should return a winning move if there is one", () => {
    const canWinBoard2: number[][] = [
      [-1, 0, 0],
      [1, -1, 0],
      [1, 0, 1],
    ];

    expect(computerGetNextMove(canWinBoard2)).toStrictEqual([0, 0]);
  });
  it("should return a move that will block 0 from winning if there is one", () => {
    const canWinBoard1: number[][] = [
      [0, -1, 0],
      [1, -1, 0],
      [1, 0, 1],
    ];
    expect(getOneWinningMove(canWinBoard1, 0)).toStrictEqual([0, 1]);
    expect(computerGetNextMove(canWinBoard1)).toStrictEqual([0, 1]);
  });
});

describe("getDfsComputerMove", () => {
  it("should pick the best next move based on dfs search", () => {
    const canWinBoard3: number[][] = [
      [0, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1],
    ];
    const actual = getDfsComputerMove(canWinBoard3);
    console.log("move: ", actual);
    expect(actual).toStrictEqual([1, 1]);
  });
});
