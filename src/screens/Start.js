import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Cell from '../components/Cell';
import Button from '../components/Button';
import BoatsSelector from '../components/BoatsSelector';
import { boatsOrientations } from '../constants';
import {
  userRegistration,
  successfullyPosition,
} from '../store/actions/gameActions';
import { hoverCell, setBoatSelection } from '../store/actions/cellsActions';
import {
  mapAndSetTouchedCells,
  returnAllCellsAsUntouched,
  checkBoatFill,
  getBgColor,
} from '../utils/cells';

const ContainerGroup = styled.div`
  margin: auto;
  width: 95%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 4rem;
    color: #141414;
  }
`;

const Container = styled.div`
  margin: auto;
  width: 95%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 40%;
  border: 3px solid gray;
  height: auto;
  display: flex;
  flex-wrap: wrap;
`;
const ContainerInput = styled.div`
  width: 300px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-around;
`;

const Start = ({ user, setUser }) => {
  const dispatch = useDispatch();
  const userCells = useSelector((state) => state.cells.userCells);
  const boatsGroup = useSelector((state) => state.game.boats);

  const [isUser, setIsUser] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [selectedBoat, setSelectedBoat] = useState({ id: '', length: 0 });
  const [boatOrientation, setBoatOrientation] = useState(
    boatsOrientations.HORIZONTAL
  );

  const handlerClick = () => {
    if (user.length >= 3) {
      dispatch(userRegistration(user));
      setIsUser(true);
      setUser('');
    } else {
      setMessageError('Debe ingresar mínimo 3 caracteres');
      setUser('');
    }
  };

  const handleSelectBoat = ({ boatId, length, type, positioned }) => {
    if (!positioned) {
      setSelectedBoat({ id: boatId, length, type });
    }
  };

  const handleCellMouseOver = (hoveredCell) => {
    if (selectedBoat.id && !hoveredCell.typeOfBoat) {
      const isSpaceForBoat = checkBoatFill({
        index: hoveredCell.index,
        boatLength: selectedBoat.length,
        orientation: boatOrientation,
        cells: userCells,
      });

      if (!isSpaceForBoat) {
        const initialCells = returnAllCellsAsUntouched(userCells);
        dispatch(hoverCell(initialCells));
        return;
      }
      const updatedUserCells = mapAndSetTouchedCells({
        selectedBoat,
        boatOrientation,
        userCells,
        hoveredCell,
      });

      dispatch(hoverCell(updatedUserCells));
    } else {
      const initialCells = returnAllCellsAsUntouched(userCells);
      dispatch(hoverCell(initialCells));
    }
  };

  const onMouseLeave = () => {
    if (selectedBoat.id) {
      const initialCells = returnAllCellsAsUntouched(userCells);

      dispatch(hoverCell(initialCells));
    }
    return null;
  };

  const handleClick = (cell) => {
    if (cell.typeOfBoat) {
      return;
    }
    if (selectedBoat.id) {
      dispatch(setBoatSelection(userCells, selectedBoat));
      dispatch(successfullyPosition(selectedBoat, boatsGroup));
      setSelectedBoat({ id: '', length: 0 });
    }
  };

  return (
    <>
      <ContainerGroup>
        <h1>Battleship</h1>
        {isUser ? (
          <div>
            <BoatsSelector
              boatOrientation={boatOrientation}
              setBoatOrientation={setBoatOrientation}
              handleSelectBoat={handleSelectBoat}
              selectedBoat={selectedBoat}
            />
          </div>
        ) : null}

        <Container>
          <Card onMouseLeave={onMouseLeave}>
            {userCells.map((cell) => (
              <Cell
                bgColor={getBgColor(cell)}
                index={cell.index}
                handleClick={() => handleClick(cell)}
                key={cell.id}
                positionX={cell.positionX}
                onMouseOver={() => handleCellMouseOver(cell)}
              />
            ))}
          </Card>
          {!isUser ? (
            <ContainerInput>
              <Input
                messageError={messageError}
                setUser={setUser}
                user={user}
              />
              <Button handlerClick={handlerClick} value="Start Game" />
            </ContainerInput>
          ) : null}
        </Container>
      </ContainerGroup>
    </>
  );
};

Start.propTypes = {
  user: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Start;
