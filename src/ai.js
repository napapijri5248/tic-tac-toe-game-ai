import {
  AI,
  PLAYER_X,
  checkWinner,
  isMovesLeft
} from "./gameLogic.js";

//  MINIMAX
  export const minimax = (b, isMax) => {
    const result = checkWinner(b);

    if (result?.winner === AI) return 10;
    if (result?.winner === PLAYER_X) return -10;
    if (!isMovesLeft(b)) return 0;

    if (isMax) {
      let best = -1000;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (b[i][j] === "") {
            b[i][j] = AI;
            best = Math.max(best, minimax(b, false));
            b[i][j] = "";
          }
        }
      }

      return best;
    } else {
      let best = 1000;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (b[i][j] === "") {
            b[i][j] = PLAYER_X;
            best = Math.min(best, minimax(b, true));
            b[i][j] = "";
          }
        }
      }

      return best;
    }
  };

  //  AI MOVE
  export const findBestMove = (b) => {
    let bestVal = -1000;
    let move = null;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (b[i][j] === "") {
          b[i][j] = AI;

          const val = minimax(b, false);

          b[i][j] = "";

          if (val > bestVal) {
            bestVal = val;
            move = { i, j };
          }
        }
      }
    }

    return move;
  };