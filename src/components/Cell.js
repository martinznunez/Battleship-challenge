import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Square = styled.span`
  flex-basis: calc(10% - 4px);
  height: 30px;
  border: 2px solid #777;
  background: ${(p) => p.bgColor};
`;

const getColor = (touched, typeOfBoat) => {
  let baseCondition = typeOfBoat;
  if (touched) {
    baseCondition = 'touched';
  }
  const colors = {
    touched: '#000',
    cruiser: 'red',
    carrier: 'green',
    submarine: 'blue',
  };

  return colors[baseCondition];
};

const Cell = ({ onMouseOver, touched, handleClick, typeOfBoat, index }) => {
  const bgColor = getColor(touched, typeOfBoat);

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
};

Cell.propTypes = {
  index: PropTypes.number.isRequired,
  typeOfBoat: PropTypes.string,
  onMouseOver: PropTypes.func,
  handleClick: PropTypes.func,
  touched: PropTypes.bool,
};

export default Cell;
