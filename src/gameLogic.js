export const PLAYER_X = "X";
export const PLAYER_O = "O";
export const AI = "O";

// Create New Board
export const createBoard = () =>
  Array(3)
    .fill(null)
    .map(() => Array(3).fill(""));

      //  CHECK WINNER
  export const checkWinner = (b) => {
    const lines = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],

      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],

      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (let line of lines) {
      const [a, b1, c] = line;

      const v1 = b[a[0]][a[1]];
      const v2 = b[b1[0]][b1[1]];
      const v3 = b[c[0]][c[1]];

      if (v1 && v1 === v2 && v2 === v3) {
        return { winner: v1, line };
      }
    }

    return null;
  };

  //  MOVES LEFT
  export const isMovesLeft = (b) => b.some((row) => row.some((cell) => cell === ""));
