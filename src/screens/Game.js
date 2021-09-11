import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Cell from '../components/Cell';

const Container = styled.div`
  margin: auto;
  width: 100%;
  height: 33vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ContainerTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 30px;
  h1 {
    font-size: 3rem;
  }
`;

const ContainerName = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-around;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 900;
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
  const cpuCells = useSelector((state) => state.cells.cpuCells);
  const userName = useSelector((state) => state.game.userName);

  return (
    <>
      <ContainerTitle>
        <h1>Game</h1>
        <ContainerName>
          <p> {userName} </p>
          <p> computer </p>
        </ContainerName>
      </ContainerTitle>
      <Container>
        <Card>
          {userCells.map((cell) => (
            <Cell
              key={cell.id}
              typeOfBoat={cell.typeOfBoat}
              index={cell.index}
              positionX={cell.positionX}
            />
          ))}
        </Card>
        <Card>
          {cpuCells.map((cell) => (
            <Cell
              key={cell.id}
              index={cell.index}
              typeOfBoat={cell.typeOfBoat}
              positionX={cell.positionX}
            />
          ))}
        </Card>
      </Container>
    </>
  );
};

export default Game;
