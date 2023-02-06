import { useEffect, useState } from "react";
import Square from "./Square";

type Scores = {
  [key: string]: number;
};

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];
const INITIAL_SCORES: Scores = { X: 0, O: 0 };
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [scores, setScores] = useState(INITIAL_SCORES);

  useEffect(() => {
    checkForWinner();
  }, [gameState]);

  const checkForWinner = () => {
    let roundWon = false;
    const resetBoard = () => setGameState(INITIAL_GAME_STATE);

    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const winCombo = WINNING_COMBOS[i];

      let a = gameState[winCombo[0]];
      let b = gameState[winCombo[1]];
      let c = gameState[winCombo[2]];

      if ([a, b, c].includes("")) {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setTimeout(() => {
        window.alert(`Congrats player ${currentPlayer}! You are the winner`);
        const newPlayerScore = scores[currentPlayer] + 1;
        const newScores = { ...scores };
        newScores[currentPlayer] = newPlayerScore;
        setScores(newScores);
        resetBoard();
      }, 500);

      return;
    }

    if (!gameState.includes("")) {
      setTimeout(() => {
        window.alert("The game ended in a draw");
        resetBoard();
        if (currentPlayer === "X") {
        }
      }, 500);

      return;
    }

    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleClick = (e: any) => {
    const cellIndex = Number(e.target.getAttribute("data-cell-index"));
    const currValue = gameState[cellIndex];
    if (currValue) {
      return;
    }
    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
  };

  return (
    <div className="h-full  p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="text-white text-5xl mb-4 text-center">Tic tac toe</h1>
      <div>
        <div className="grid grid-cols-3 gap-3 mx-auto w-96">
          {gameState.map((player, index) => (
            <Square
              key={index}
              handleClick={handleClick}
              {...{ player, index }}
            />
          ))}
        </div>
        <div className="text-center mt-4 text-white">
          Next player: {currentPlayer} <br />
          X: {scores.X} <br /> O: {scores.O}
        </div>
      </div>
    </div>
  );
}

export default App;
