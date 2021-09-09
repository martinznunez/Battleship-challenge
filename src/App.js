import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import constants from './constants';
import Start from './screens/Start';
import Game from './screens/Game';

function App() {
  const gameStatus = useSelector((state) => state.game.status);
  const initialGame = useSelector((state) => state.game.game);

  const [user, setUser] = useState('');

  if (gameStatus === constants.GAME_STATUS.INIT) {
    return <Start setUser={setUser} user={user} />;
  }

  if (initialGame === constants.GAME_STATUS.GAME) {
    return <Game />;
  }

  return <div>APP</div>;
}

export default App;
