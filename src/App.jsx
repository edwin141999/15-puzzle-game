import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""].sort(
    () => Math.random() - 0.5
  );

  const ORDER_WINNER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];

  const [number, setNumber] = useState(NUMBERS);

  useEffect(() => {
    for (let index = 0; index < number.length; index++) {
      if (number[index] === ORDER_WINNER[index]) {
        const id = document.getElementById(index);
        id.classList.remove("bg-red-500");
        id.classList.add("bg-green-500");
      }else{
        const id = document.getElementById(index);
        id.classList.remove("bg-green-500");
        id.classList.add("bg-red-500");
      }
    }
  }, [number, ORDER_WINNER,NUMBERS]);

  const moveTile = (index) => {
    const tile = number[index];
    const tileIndex = number.indexOf(tile);
    const emptyIndex = number.indexOf("");

    const tileRow = Math.floor(tileIndex / 4);
    const emptyRow = Math.floor(emptyIndex / 4);
    const tileCol = tileIndex % 4;
    const emptyCol = emptyIndex % 4;

    const isMoveable =
      (tileRow === emptyRow && Math.abs(tileCol - emptyCol) === 1) ||
      (tileCol === emptyCol && Math.abs(tileRow - emptyRow) === 1);

    if (isMoveable) {
      const newNumbers = [...number];
      newNumbers[tileIndex] = "";
      newNumbers[emptyIndex] = tile;
      setNumber(newNumbers);
    }

    if (NUMBERS === ORDER_WINNER) {
      alert("You win!");
    }
  };

  return (
    <div className="h-screen bg-slate-500 text-white">
      <h1 className="flex justify-center text-2xl py-5">15-Puzzle Game</h1>
      <div className="puzzle">
        {number.map((cell, index) => (
          <div
            key={index}
            id={index}
            className="tile"
            onClick={() => moveTile(index)}
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
