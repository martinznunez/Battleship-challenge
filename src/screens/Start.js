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

  const handleCellMouseOver = (cellId) => {
    if (selectedBoat.id) {
      const updatedUserCells = userCells.map((cell) => {
        const copiedCell = cell;
        if (copiedCell.id === cellId) {
          copiedCell.touched = true;
        } else {
          copiedCell.touched = false;
        }

        return copiedCell;
      });

      dispatch(hoverCell(updatedUserCells));
    }
  };

  return (
    <>
      <ContainerGroup>
        <h1>Battleship</h1>
        {isUser ? (
          <div>
            <BoatsSelector
              handleSelectBoat={handleSelectBoat}
              selectedBoat={selectedBoat}
            />
          </div>
        ) : null}

        <Container>
          <Card>
            {userCells.map((cell) => (
              <Cell
                key={cell.id}
                touched={cell.touched}
                positionX={cell.positionX}
                onMouseOver={() => handleCellMouseOver(cell.id)}
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