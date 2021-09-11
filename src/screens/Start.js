import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Cell from '../components/Cell';
import Button from '../components/Button';
import BoatsSelector from '../components/BoatsSelector';
import { boatsOrientations } from '../constants';
import { userRegistration } from '../store/actions/gameActions';
import { hoverCell } from '../store/actions/cellsActions';

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

const setHoveredCells = ({
  selectedBoat,
  boatOrientation,
  userCells,
  hoveredCell,
}) => {
  let finalCells;
  const boatLength = selectedBoat.length;

  if (boatOrientation === boatsOrientations.HORIZONTAL) {
    if (hoveredCell.positionX - 1 + boatLength > 9) {
      return userCells;
    }

    finalCells = userCells.map((cell) => {
      const copiedCell = { ...cell };
      if (
        copiedCell.positionX >= hoveredCell.positionX &&
        copiedCell.positionX < hoveredCell.positionX + boatLength &&
        copiedCell.positionY === hoveredCell.positionY
      ) {
        copiedCell.touched = true;
      } else {
        copiedCell.touched = false;
      }
      return copiedCell;
    });

    return finalCells;
  }

  return setHoveredCells;
};

const Start = ({ user, setUser }) => {
  const dispatch = useDispatch();
  const userCells = useSelector((state) => state.cells.userCells);

  const [isUser, setIsUser] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [selectedBoat, setSelectedBoat] = useState({ id: '', length: '' });
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

  const handleSelectBoat = ({ boatId, length }) => {
    setSelectedBoat({ id: boatId, length });
  };

  const handleCellMouseOver = (hoveredCell) => {
    if (selectedBoat.id) {
      const updatedUserCells = setHoveredCells({
        selectedBoat,
        boatOrientation,
        userCells,
        hoveredCell,
      });

      dispatch(hoverCell(updatedUserCells));
    }
  };

  const onMouseLeave = () => {
    if (selectedBoat.id) {
      const initialCell = [...userCells];

      initialCell.map((cell) => {
        if (cell.touched) {
          cell.touched = false;
        }

        return cell;
      });

      return dispatch(hoverCell(initialCell));
    }

    return onMouseLeave;
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
                key={cell.id}
                touched={cell.touched}
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
