export const O_WIN_MSG = "O wins!";
export const X_WIN_MSG = "X wins!";
export const TIE_GAME_MSG = "Tie Game!";

export function checkBoard(board: number[][], moves: number): string {
  if (checkWin(board, 0)) return O_WIN_MSG;
  else if (checkWin(board, 1)) return X_WIN_MSG;
  if (moves >= board.length * board.length) return TIE_GAME_MSG;
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

export const getRandomMove = (board: number[][]) => {
  const moveOptions = getMovesForUser(board, -1);
  const randomIndex = Math.floor(Math.random() * moveOptions.length);
  return moveOptions[randomIndex];
};

class Choice {
  move: number[];
  value: number;
  depth: number;
  constructor(m: number[], v: number, d: number) {
    this.move = m;
    this.value = v;
    this.depth = d;
  }
}

export const getDfsComputerMove = (board: number[][]): number[] | undefined => {
  console.log("Board: ", board);
  let maxDepth = -1;
  let nodesMap = new Map();

  const minMax = (
    board: number[][],
    isMax: boolean,
    currentPlayer: number,
    lastMove: number[] | null,
    depth: number
  ) => {
    if (depth === 0) nodesMap.clear();
    console.log("Nodes map: ", nodesMap);
    const legalMoves = getMovesForUser(board, -1);
    if ((legalMoves.length === 0 || depth === maxDepth) && lastMove) {
      if (checkWin(board, 1)) {
        //console.log("Move: ", lastMove);
        //console.log("Found winning X board: ", board);
        //return new Choice(lastMove, 100 - depth, depth);
        return 100 - depth;
      } else if (checkWin(board, 0)) {
        //console.log("Move: ", lastMove);
        //console.log("Found winning O board: ", board);
        //return new Choice(lastMove, -100 + depth, depth);
        return -100 + depth;
      } else if (legalMoves.length === 0) {
        //return new Choice(lastMove, 0, depth);
        return 0;
      }
    }

    //const candidateChoices: Choice[] = [];

    if (isMax) {
      let best = -100;
      legalMoves.forEach((move, i) => {
        const testBoard: number[][] = JSON.parse(JSON.stringify(board));
        testBoard[move[0]][move[1]] = currentPlayer;
        const nodeVal = minMax(testBoard, false, 1, move, depth + 1);
        best = Math.max(best, nodeVal);
        if (depth === 0) {
          const moves = nodesMap.has(nodeVal)
            ? `${nodesMap.get(nodeVal)},${i}`
            : i;
          nodesMap.set(nodeVal, moves);
        }
      });
      if (depth === 0) {
        let returnVal;
        if (typeof nodesMap.get(best) == "string") {
          const arr = nodesMap.get(best).split(",");
          const rand = Math.floor(Math.random() * arr.length);
          returnVal = arr[rand];
        } else {
          returnVal = nodesMap.get(best);
        }
        return returnVal;
      }
      return best;
    }
    if (!isMax) {
      let best = 100;
      legalMoves.forEach((move, i) => {
        const testBoard: number[][] = JSON.parse(JSON.stringify(board));
        testBoard[move[0]][move[1]] = currentPlayer;
        const nodeVal = minMax(testBoard, true, 1, move, depth + 1);
        best = Math.min(best, nodeVal);
        if (depth === 0) {
          const moves = nodesMap.has(nodeVal)
            ? `${nodesMap.get(nodeVal)},${i}`
            : i;
          nodesMap.set(nodeVal, moves);
        }
      });
      if (depth === 0) {
        let returnVal;
        if (typeof nodesMap.get(best) == "string") {
          const arr = nodesMap.get(best).split(",");
          const rand = Math.floor(Math.random() * arr.length);
          returnVal = arr[rand];
        } else {
          returnVal = nodesMap.get(best);
        }
        return returnVal;
      }
      return best;
    }
    // for (let i = 0; i < legalMoves.length; i++) {
    //   let row = legalMoves[i][0];
    //   let col = legalMoves[i][1];
    //   let testBoard: number[][] = JSON.parse(JSON.stringify(board));
    //   testBoard[row][col] = currentPlayer;
    //   let result = minMax(
    //     testBoard,
    //     !isMax,
    //     currentPlayer === 1 ? 0 : 1,
    //     legalMoves[i],
    //     depth + 1
    //   );
    //   if (result) candidateChoices.push(result);
    // }

    // }
    //   let maxChoice: Choice | null = null;
    //   let maxValue = -100;
    //   let minChoice: Choice | null = null;
    //   let minValue = 100;

    //   for (let i = 0; i < candidateChoices.length; i++) {
    //     let choice = candidateChoices[i];
    //     if (isMax && choice.value > maxValue) {
    //       maxChoice = choice;
    //       maxValue = choice.value;
    //     } else if (!isMax && choice.value < minValue) {
    //       minChoice = choice;
    //       minValue = choice.value;
    //     }
    //   }

    //   if (isMax) {
    //     return maxChoice;
    //   } else return minChoice;
  };

  const choice = minMax(board, true, 1, null, 0);
  console.log("best choice: ", choice);
  return choice?.move;
};
