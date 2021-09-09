import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Square = styled.span`
  flex-basis: calc(10% - 4px);
  height: 30px;
  border: 2px solid #777;
  background: ${(p) => p.touched && '#000'};
`;
const Cell = ({ positionX, onMouseOver, touched }) => {
  return (
    <Square touched={touched} onMouseOver={onMouseOver}>
      {positionX}
    </Square>
  );
};

Cell.propTypes = {
  positionX: PropTypes.number.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  touched: PropTypes.bool.isRequired,
};

export default Cell;
