import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Square from '../functional/Square';
import Wait from '../functional/Wait';
import Status from '../functional/Status';
import ScoreBoard from '../functional/ScoreBoard';
import PlayAgain from '../functional/PlayAgain';

const Board = () => {
  const [game, setGame] = useState(new Array(9).fill(null));
  const [piece, setPiece] = useState('X');
  const [turn, setTurn] = useState(true);
  const [end, setEnd] = useState(false);
  const [room, setRoom] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [currentPlayerScore, setCurrentPlayerScore] = useState(0);
  const [opponentPlayer, setOpponentPlayer] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [joinError, setJoinError] = useState(false);

  const socketID = null; // You might need to replace this with the actual socket ID.

  useEffect(() => {
    // Replace this with your API call to get room and name information from the backend.
    const fetchRoomAndName = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT'); // Replace with your API endpoint
        const { room, name } = await response.json();
        setRoom(room);

        // Emit to the backend to process the new room join.
        // Replace this with your API call if needed.
        emitNewRoomJoin(room, name);
      } catch (error) {
        // Handle errors
      }
    };

    fetchRoomAndName();
  }, []);

  // Replace this function with your actual API call for new room join.
  const emitNewRoomJoin = (room, name) => {
    // Make an API call to inform the backend about the new room join.
    // You might use the fetch function or a library like Axios for this.
    // Example:
    // fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ room, name }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Handle the response data
    // })
    // .catch(error => {
    //   // Handle errors
    // });
  };

  const gameStart = (gameState, players, turn) => {
    const opponent = players.find(([id, name]) => id !== socketID)[1];
    setOpponentPlayer([opponent, 0]);
    setEnd(false);
    setBoard(gameState);
    setTurn(turn);
    setMessage();
  };

  const handleClick = (index) => {
    if (!game[index] && !end && turn) {
      // Replace this with your API call to make a move.
      // You'll need to send 'room', 'piece', and 'index' to the backend.
      // Example:
      // fetch('YOUR_API_ENDPOINT', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ room, piece, index }),
      // })
      // .then(response => response.json())
      // .then(data => {
      //   // Handle the response data
      // })
      // .catch(error => {
      //   // Handle errors
      // });
    }
  };

  const handleUpdate = (gameState, turn) => {
    setBoard(gameState);
    setTurn(turn);
    setMessage();
  };

  const handleWin = (id, gameState) => {
    setBoard(gameState);
    if (socketID === id) {
      const playerScore = currentPlayerScore + 1;
      setCurrentPlayerScore(playerScore);
      setStatusMessage('You Win');
    } else {
      const opponentScore = opponentPlayer[1] + 1;
      setOpponentPlayer([opponentPlayer[0], opponentScore]);
      setStatusMessage(`${opponentPlayer[0]} Wins`);
    }
    setEnd(true);
  };

  const handleDraw = (gameState) => {
    setBoard(gameState);
    setEnd(true);
    setStatusMessage('Draw');
  };

  const playAgainRequest = () => {
    // Replace this with your API call to request a play again.
    // Example:
    // fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ room }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Handle the response data
    // })
    // .catch(error => {
    //   // Handle errors
    // });
  };

  const setMessage = () => {
    const message = turn ? 'Your Turn' : `${opponentPlayer[0]}'s Turn`;
    setStatusMessage(message);
  };

  const setBoard = (gameState) => {
    setGame(gameState);
  };

  const renderSquare = (i) => (
    <Square
      key={i}
      value={game[i]}
      player={piece}
      end={end}
      id={i}
      onClick={handleClick}
      turn={turn}
    />
  );

  if (joinError) {
    return <Navigate to="/" />;
  } else {
    const squareArray = [];
    for (let i = 0; i < 9; i++) {
      squareArray.push(renderSquare(i));
    }
    return (
      <>
        {/* <Wait display={waiting} room={room} /> */}
        <Status message={statusMessage} />
        <div className="board">{squareArray}</div>
        <ScoreBoard
          data={{
            player1: ['You', currentPlayerScore],
            player2: [opponentPlayer[0], opponentPlayer[1]],
          }}
        />
        <PlayAgain end={end} onClick={playAgainRequest} />
      </>
    );
  }
};

export default Board;