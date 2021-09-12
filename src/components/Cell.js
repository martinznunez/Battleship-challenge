import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Square = styled.span`
  flex-basis: calc(10% - 4px);
  height: 30px;
  border: 2px solid #777;
  background: ${(p) => p.bgColor};
`;

const getColor = ({ touched, water, typeOfBoat, typeOfDamage }) => {
  let baseCondition = typeOfBoat;

  if (touched) {
    baseCondition = 'touched';
  }

  if (water) {
    baseCondition = 'water';
  }

  if (typeOfDamage) {
    baseCondition = typeOfDamage;
  }

  const colors = {
    touched: '#000',
    cruiser: 'orange',
    carrier: 'green',
    submarine: 'blue',
    water: 'lightblue',
    damaged: 'yellow',
    destroyed: 'red',
  };

  return colors[baseCondition];
};

const Cell = ({
  onMouseOver,
  touched,
  handleClick,
  typeOfBoat,
  index,
  water,
  typeOfDamage,
}) => {
  const bgColor = getColor({
    touched,
    water,
    typeOfDamage,
    typeOfBoat,
  });

  return (
    <Square
      onClick={handleClick}
      bgColor={bgColor}
      typeOfBoat={typeOfBoat}
      touched={touched}
      onMouseOver={onMouseOver}
    >
      {index}
    </Square>
  );
};

Cell.defaultProps = {
  typeOfBoat: null,
  onMouseOver: null,
  handleClick: null,
  touched: null,
  water: null,
  typeOfDamage: null,
  index: null,
};

Cell.propTypes = {
  index: PropTypes.number,
  typeOfBoat: PropTypes.string,
  onMouseOver: PropTypes.func,
  handleClick: PropTypes.func,
  touched: PropTypes.bool,
  water: PropTypes.bool,
  typeOfDamage: PropTypes.string,
};

export default Cell;
