import { useState } from "react";
import Square from "./Square";

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];

function App() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handleClick = (e: any) => {
    const cellIndex = Number(e.target.getAttribute("data-cell-index"));
    const currValue = gameState[cellIndex];
    if (currValue) {
      return;
    }
    // const newValues = gameState.map((item) => item);
    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
    console.log(newValues);
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
        <div>Scores Go Here</div>
      </div>
    </div>
  );
}

export default App;
