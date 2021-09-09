import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Cell from '../components/Cell';

const Container = styled.div`
  margin: auto;
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Card = styled.div`
  width: 40%;
  border: 3px solid gray;
  height: auto;
  display: flex;
  flex-wrap: wrap;
`;

const Game = () => {
  const userCells = useSelector((state) => state.cells.userCells);
  console.log(
    '%c 🥖 userCells: ',
    'font-size:20px;background-color: #FFDD4D;color:#fff;',
    userCells
  );

  return (
    <>
      <h1>Game</h1>
      <Container>
        <Card>
          {userCells.map((cell) => (
            <Cell key={cell.id} positionX={cell.positionX} />
          ))}
        </Card>
        <Card>
          {userCells.map((cell) => (
            <Cell key={cell.id} positionX={cell.positionX} />
          ))}
        </Card>
      </Container>
    </>
  );
};

export default Game;
