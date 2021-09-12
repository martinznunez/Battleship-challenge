import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Cell from '../components/Cell';
import { attack } from '../store/actions/cellsActions';
import {
  changeTurn,
  changeGameStatus,
  setWinner,
} from '../store/actions/gameActions';
import { getBgColor, getRandomAvailableCell } from '../utils/cells';
import checkWinner from '../utils/game';
import { turnUser, gameStatus } from '../constants/index';
import Button from '../components/Button';

const Container = styled.div`
  margin: auto;
  width: 100%;
  height: 33vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
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
  h5 {
    font-size: 1.3rem;
    font-weight: 100;
  }
`;

const ContainerName = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-size: 1.4rem;
  text-transform: uppercase;
  font-weight: 300;
  margin-top: 40px;
`;

const Card = styled.div`
  width: 30%;
  max-width: 500px;
  border: 4px solid gray;
  height: auto;
  display: flex;
  min-width: 300px;
  flex-wrap: wrap;
`;

const Game = () => {
  const dispatch = useDispatch();
  const userCells = useSelector((state) => state.cells.userCells);
  const boats = useSelector((state) => state.game.boats);
  const cpuBoats = useSelector((state) => state.game.cpuBoats);
  const cpuCells = useSelector((state) => state.cells.cpuCells);
  const userName = useSelector((state) => state.game.userName);
  const turn = useSelector((state) => state.game.turn);

  const handleClick = (cell) => {
    if (turn === turnUser.USER) {
      dispatch(attack(cell, cpuCells));
      dispatch(changeTurn(turn));
    }
  };

  useEffect(() => {
    const winner = checkWinner(boats, cpuBoats);

    if (winner) {
      dispatch(setWinner(winner));

      dispatch(changeGameStatus(gameStatus.FINISHED));
    }
    if (turn === turnUser.CPU) {
      const cell = getRandomAvailableCell(userCells);

      setTimeout(() => {
        dispatch(attack(cell, userCells, turn));
        dispatch(changeTurn(turn));
      }, 1000);
    }
  }, [turn]);

  const handleSurrender = () => {
    dispatch(setWinner(turnUser.CPU));
    dispatch(changeGameStatus(gameStatus.FINISHED));
  };

  const hideBoats = true;

  return (
    <>
      <ContainerTitle>
        <h1>Game</h1>
        <h5> Playing: {turn === turnUser.USER ? userName : turnUser.CPU} </h5>
        <Button value="Surrender" handlerClick={handleSurrender} />
      </ContainerTitle>
      <Container>
        <Card>
          {userCells.map((cell) => (
            <Cell
              bgColor={getBgColor(cell)}
              key={cell.id}
              positionX={cell.positionX}
            />
          ))}
        </Card>

        <Card>
          {cpuCells.map((cell) => (
            <Cell
              bgColor={getBgColor(cell, hideBoats)}
              handleClick={() => handleClick(cell)}
              key={cell.id}
              index={cell.index}
              positionX={cell.positionX}
            />
          ))}
        </Card>
      </Container>
      <ContainerName>
        <p> {userName} </p>
        <p> computer </p>
      </ContainerName>
    </>
  );
};

export default Game;
