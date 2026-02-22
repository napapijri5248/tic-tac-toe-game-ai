import React, { useState } from "react";
import "./App.css";

import {
  PLAYER_X,
  PLAYER_O,
  AI,
  createBoard,
  checkWinner,
  isMovesLeft
} from "./gameLogic.js";

import { findBestMove } from "./ai.js";


export default function App() {
  const [board, setBoard] = useState(createBoard());
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState(null);
  const [turn, setTurn] = useState(PLAYER_X);
  const [winningLine, setWinningLine] = useState([]);


  

  //  START GAME
  const startGame = (m) => {
    setMode(m);
    resetGame(m);
  };

  //  CLICK
  const handleClick = (i, j) => {
    if (board[i][j] || gameOver) return;

    const newBoard = board.map((r) => [...r]);

    // -------- FRIEND MODE --------
    if (mode === "FRIEND") {
      newBoard[i][j] = turn;
      setBoard(newBoard);

      const result = checkWinner(newBoard);

      if (result) {
        setMessage(`Player ${result.winner} Wins`);
        setWinningLine(result.line);
        setGameOver(true);
        return;
      }

      if (!isMovesLeft(newBoard)) {
        setMessage("Draw");
        setGameOver(true);
        return;
      }

      const next = turn === PLAYER_X ? PLAYER_O : PLAYER_X;

      setTurn(next);
      setMessage(`Player ${next} Turn`);
    }

    // -------- AI MODE --------
    if (mode === "AI") {
      newBoard[i][j] = PLAYER_X;
      setBoard(newBoard);

      const result = checkWinner(newBoard);

      if (result) {
        setMessage("You Win");
        setWinningLine(result.line);
        setGameOver(true);
        return;
      }

      if (!isMovesLeft(newBoard)) {
        setMessage("Draw");
        setGameOver(true);
        return;
      }

      // AI TURN
      setTimeout(() => {
        const ai = findBestMove(newBoard);

        if (ai) {
          newBoard[ai.i][ai.j] = AI;
          setBoard(newBoard.map((r) => [...r]));
        }

        const result2 = checkWinner(newBoard);

        if (result2) {
          setMessage("AI Wins");
          setWinningLine(result2.line);
          setGameOver(true);
          return;
        }

        if (!isMovesLeft(newBoard)) {
          setMessage("Draw");
          setGameOver(true);
          return;
        }

        setMessage("Your Turn");
      }, 500);
    }
  };

  //  RESET
  const resetGame = (mode) => {
    setBoard(createBoard());
    setGameOver(false);
    setTurn(PLAYER_X);
    setWinningLine([]);

    if (mode === "AI") setMessage("Your Turn");
    else if (mode === "FRIEND") setMessage("Player X Turn");
  };

  //  MODE SCREEN
  if (!mode) {
    return (
      <div className="main-container">
        <div className="mode-card">
          <h1 className="mode-title">
            <span className="tic">TIC</span>
            <span className="tac">TAC</span>
            <span className="toe">TOE</span>
          </h1>

          <p className="mode-subtitle">Select Game Mode</p>

          <div className="mode-buttons">
            <button className="ai-btn" onClick={() => startGame("AI")}>
              Play with AI
            </button>

            <button className="friend-btn" onClick={() => startGame("FRIEND")}>
              Play with Friend
            </button>
          </div>
        </div>
      </div>
    );
  }

  //  GAME SCREEN
  return (
    <div className="main-container">
      <div className="card">
        <h1 className="game-logo">TIC TAC TOE</h1>

        <p className={`status ${gameOver ? "result-glow" : ""}`}>{message}</p>

        <div className="board">
          {board.map((row, i) =>
            row.map((cell, j) => (
              <button
                key={i + "-" + j}
                className={`cell
                  ${cell === "X" ? "x-style" : "o-style"}
                  ${
                    winningLine.some(([r, c]) => r === i && c === j)
                      ? "win-cell"
                      : ""
                  }
                `}
                onClick={() => handleClick(i, j)}
              >
                {cell}
              </button>
            )),
          )}
        </div>

        <div className="button-group">
          <button className="primary-btn" onClick={resetGame}>
            Restart
          </button>

          <button className="secondary-btn" onClick={() => setMode(null)}>
            Change Mode
          </button>
        </div>
      </div>
    </div>
  );
}
