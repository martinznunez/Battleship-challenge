import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import constants from './constants';
import Start from './screens/Start';
import Game from './screens/Game';

function App() {
  const gameStatus = useSelector((state) => state.game.status);

  const [user, setUser] = useState('');

  if (gameStatus === constants.GAME_STATUS.INIT) {
    return <Start setUser={setUser} user={user} />;
  }

  if (gameStatus === constants.GAME_STATUS.PLAYING) {
    return <Game />;
  }

  return <div>APP</div>;
}

export default App;
