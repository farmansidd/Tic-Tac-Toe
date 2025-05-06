import React, { useState } from 'react';
import Box from './Box';

function Header() {
  const [player1, setPlayer1] = useState('X');
  const [player2, setPlayer2] = useState('O');
  const [tempPlayer1, setTempPlayer1] = useState('');
  const [tempPlayer2, setTempPlayer2] = useState('');
  const [isPlayer1Active, setIsPlayer1Active] = useState(true);
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [showBoard, setShowBoard] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tempPlayer1.trim() && tempPlayer2.trim()) {
      setPlayer1(tempPlayer1.trim());
      setPlayer2(tempPlayer2.trim());
      setShowBoard(true); // Show the board when players are set
    } else {
      setShowBoard(false); // Hide the board if names are not set
      alert('Please enter both player names');
    }
  };

  const handleBoxClick = (index) => {
    if (boxes[index]) return; // Ignore if already filled

    const newBoxes = boxes.slice();
    newBoxes[index] = isPlayer1Active ? 'X' : 'O';
    setBoxes(newBoxes);
    setIsPlayer1Active(!isPlayer1Active);
  };
  const resetGame = () => {
    setBoxes(Array(9).fill(null));
    setIsPlayer1Active(true);
    setShowBoard(false); // Hide the board when resetting the game
    setTempPlayer1('');
    setTempPlayer2('');
  }


  return (
    <div className="game-container">
      <div className="game-header">
        <h1 className="game-title">Tic Tac Toe</h1>
        
        <form className="player-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Player 1 Name"
            value={tempPlayer1}
            onChange={(e) => setTempPlayer1(e.target.value)}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Enter Player 2 Name"
            value={tempPlayer2}
            onChange={(e) => setTempPlayer2(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="btn-primary">
            Start Game
          </button>
        </form>

        <div className="players-status">
          <div className={`player-badge ${isPlayer1Active ? 'active-player' : ''}`}>
            {player1} (X)
          </div>
          <div className={`player-badge ${!isPlayer1Active ? 'active-player' : ''}`}>
            {player2} (O)
          </div>
        </div>
      </div>
      {showBoard && <Box boxes={boxes} onBoxClick={handleBoxClick} />}
      <button className="btn-primary" onClick={resetGame}>
  Reset Game
</button>
   </div>
  );
}

export default Header;
