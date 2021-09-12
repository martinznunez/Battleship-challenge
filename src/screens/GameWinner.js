import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { turnUser } from '../constants';
import { restartGame } from '../store/actions/gameActions';
import { restartCells } from '../store/actions/cellsActions';
import Button from '../components/Button';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  height: 100vh;

  h2 {
    font-weight: 900;
    font-size: 3rem;
  }

  p {
    font-size: 1.4rem;
    text-transform: uppercase;
  }
`;
const GameWinner = () => {
  const winner = useSelector((state) => state.game.winner);
  const userName = useSelector((state) => state.game.userName);
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(restartGame());
    dispatch(restartCells());
  };
  return (
    <Container>
      <h2> WINNER!!</h2>

      <p> {winner === turnUser.USER ? userName : turnUser.CPU} </p>
      <Button value="Restart" handlerClick={handleOnClick} />
    </Container>
  );
};

export default GameWinner;
