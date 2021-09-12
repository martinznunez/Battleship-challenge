import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Square = styled.span`
  flex-basis: calc(10% - 4px);
  height: 30px;
  border: 2px solid #777;
  background: ${(p) => p.bgColor};
`;

const Cell = ({ onMouseOver, handleClick, index, bgColor }) => {
  return (
    <Square onClick={handleClick} bgColor={bgColor} onMouseOver={onMouseOver}>
      {index}
    </Square>
  );
};

Cell.defaultProps = {
  bgColor: null,
  onMouseOver: null,
  handleClick: null,
  index: null,
};

Cell.propTypes = {
  index: PropTypes.number,
  onMouseOver: PropTypes.func,
  handleClick: PropTypes.func,
  bgColor: PropTypes.string,
};

export default Cell;
