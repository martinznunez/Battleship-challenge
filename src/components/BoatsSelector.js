import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RiSailboatFill } from 'react-icons/ri';
import Button from './Button';
import { boatTypes, boatsOrientations, colors } from '../constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-align: center;
  flex-wrap: wrap;
  padding-top: 20px;
`;

const BoatType = styled.p`
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 50px;
`;

const BoatIcon = styled(RiSailboatFill)`
  font-size: 4rem;
  margin: 15px 15px 5px 15px;
  cursor: pointer;
  color: ${(p) => {
    if (p.type === boatTypes.CRUISER) {
      return colors.ORANGE;
    }

    if (p.type === boatTypes.SUBMARINE) {
      return colors.GREEN;
    }

    if (p.type === boatTypes.CARRIER) {
      return colors.VIOLET;
    }

    return '#000';
  }};
  border: ${(p) => (p.selected ? '1px solid red' : '')};
  cursor: ${(p) => (p.hide ? 'no-drop' : 'pointer')};
  background: ${(p) => (p.hide ? 'rgba(255,0,0,0.2)' : null)};
`;

const ContainerBtn = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  margin-top: 20px;

  @media screen and (min-width: 600px) {
    width: 90%;
    margin: auto;
  }

  @media screen and (min-width: 800px) {
    img {
      width: 15%;
      margin: 10px;
    }
  }
  @media screen and (min-width: 1200px) {
    img {
      width: 10%;
    }
  }
`;

const BoatsSelector = ({
  selectedBoat,
  handleSelectBoat,
  setBoatOrientation,
  boatOrientation,
}) => {
  const boats = useSelector((state) => state.game.boats);

  const handleClickBoat = (boatId, length, type, positioned) => {
    handleSelectBoat({ boatId, length, type, positioned });
  };

  const handlerClick = () => {
    if (boatOrientation === boatsOrientations.HORIZONTAL) {
      setBoatOrientation(boatsOrientations.VERTICAL);
    } else {
      setBoatOrientation(boatsOrientations.HORIZONTAL);
    }
  };

  const renderBoat = (boat) => (
    <div key={boat.id}>
      <BoatIcon
        hide={boat.positioned}
        type={boat.type}
        selected={selectedBoat.id === boat.id}
        src={`/assets/${boat.type}.png`}
        alt="Boat type"
        onClick={() =>
          handleClickBoat(boat.id, boat.length, boat.type, boat.positioned)
        }
      />
      <BoatType>{boat.type}</BoatType>
    </div>
  );

  return (
    <>
      <Container>{boats.map((boat) => renderBoat(boat))}</Container>
      <ContainerBtn>
        <Button handlerClick={handlerClick} value="rotate ship" />
      </ContainerBtn>
    </>
  );
};

BoatsSelector.propTypes = {
  selectedBoat: PropTypes.shape({
    id: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
  }).isRequired,
  handleSelectBoat: PropTypes.func.isRequired,
  setBoatOrientation: PropTypes.func.isRequired,
  boatOrientation: PropTypes.string.isRequired,
};

export default BoatsSelector;
