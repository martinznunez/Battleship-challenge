import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { turnUser } from '../constants';

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

  return (
    <Container>
      <h2> WINNER!!</h2>

      <p> {winner === turnUser.USER ? userName : turnUser.CPU} </p>
    </Container>
  );
};

export default GameWinner;
