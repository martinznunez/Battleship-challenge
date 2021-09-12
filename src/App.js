import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { gameStatus } from './constants';
import Start from './screens/Start';
import Game from './screens/Game';
import GameWinner from './screens/GameWinner';

function App() {
  const gameStatusState = useSelector((state) => state.game.status);

  const [user, setUser] = useState('');

  if (gameStatusState === gameStatus.INIT) {
    return <Start setUser={setUser} user={user} />;
  }

  if (gameStatusState === gameStatus.PLAYING) {
    return <Game />;
  }

  if (gameStatusState === gameStatus.FINISHED) {
    return <GameWinner />;
  }

  return <div>APP</div>;
}

export default App;
