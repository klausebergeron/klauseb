import { describe, it, expect, test } from "vitest";
import { bestMoves, nextValidMove } from "../TTT";

const fullTieBoard: number[][] = [
  [1, 0, 0],
  [0, 1, 1],
  [1, 0, 0],
];
const tiedUserMoves: number[][] = [
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 2],
  [2, 1],
];
const sampleBoard: number[][] = [
  [-1, 0, 0],
  [1, -1, 1],
  [-1, -1, -1],
];
const sampleUserMoves: number[][] = [
  [0, 1],
  [0, 2],
];
const expected: number[][] = [
  [0, 0],
  [1, 1],
];
describe("possibleMoves", () => {
  it("should return all spaces that contain -1 that touch 0s", () => {
    const actual = bestMoves(sampleBoard, sampleUserMoves);
    console.log("actual: ", actual);
    expect(actual.length).toEqual(expected.length);
    actual.sort().forEach((a, i) => expect(expected[i]).toStrictEqual(a));
  });
  it("should return an empty array if the board is full", () => {
    const actual = bestMoves(fullTieBoard, tiedUserMoves);
    console.log(actual);
    expect(actual).toStrictEqual([]);
  });
});
