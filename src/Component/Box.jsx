import React, { useState } from 'react';
import './Box.css';

const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal TL to BR
  [2, 4, 6]  // Diagonal TR to BL
];

function calculateWinner(boxes) {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
      return boxes[a];
    }
  }
  return null;
}

function Box() {
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function handleClicked(e) {
    const index = parseInt(e.target.id);
    if (boxes[index] || calculateWinner(boxes)) return;
    
    const newBoxes = [...boxes];
    newBoxes[index] = isXNext ? 'X' : 'O';
    setBoxes(newBoxes);
    setIsXNext(!isXNext);
  }

  const winner = calculateWinner(boxes);
  const isDraw = !winner && boxes.every(box => box !== null);
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Game is a draw!';
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }
  

  return (
    <div className="box-container item-center text-center">
      <div className="status mb-4">{status}</div>
      
      <div className="row">
        <div className="box" id="0" onClick={handleClicked}>{boxes[0]}</div>
        <div className="box" id="1" onClick={handleClicked}>{boxes[1]}</div>
        <div className="box" id="2" onClick={handleClicked}>{boxes[2]}</div>
      </div>
      
      <div className="row">
        <div className="box" id="3" onClick={handleClicked}>{boxes[3]}</div>
        <div className="box" id="4" onClick={handleClicked}>{boxes[4]}</div>
        <div className="box" id="5" onClick={handleClicked}>{boxes[5]}</div>
      </div>
      
      <div className="row">
        <div className="box" id="6" onClick={handleClicked}>{boxes[6]}</div>
        <div className="box" id="7" onClick={handleClicked}>{boxes[7]}</div>
        <div className="box" id="8" onClick={handleClicked}>{boxes[8]}</div>
      </div>
     
    </div>
  );
}

export default Box;