import React from 'react';
import { Button } from '@zendeskgarden/react-buttons';

const TurnDisplay = ({
  endTurn,
  gameState: {
    playing, redPlayers, redLeader, blueLeader, currentTurn,
  },
}) => {
  if (!playing) { return null; }

  const playerId = window.socket.id;
  const playersColor = redPlayers.indexOf(playerId) >= 0 ? 'red' : 'blue';
  const playersTurn = playersColor === currentTurn;
  const playersLeader = playersColor == 'red' ? redLeader : blueLeader;
  const isLeader = playerId === playersLeader;
  return (
    <div className="turn-display">
      <p className="turn-text">
        Current turn:
        {' '}
        <span className={`${currentTurn}-text`}>{currentTurn.charAt(0).toUpperCase() + currentTurn.substring(1)}</span>
      </p>
      { playersTurn ? (
        <CurrentPlayerDisplay
          isLeader={isLeader}
          endTurn={() => endTurn(playerId)}
        />
      ) : (
        <OpponentPlayerDisplay turn={turn} />
      )}
    </div>
  );
};

const CurrentPlayerDisplay = ({
  isLeader,
  endTurn,
}) => (
  <div>
    Your turn
    { isLeader && <button onClick={endTurn}>End turn</button> }
  </div>
);

const OpponentPlayerDisplay = () => (
  <div>
    <p className="waiting-text">Waiting for turn...</p>
  </div>
);

export default TurnDisplay;
