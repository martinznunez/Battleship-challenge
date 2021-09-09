import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Btn = styled.button`
  margin: 0;
  padding: 0;
  --c: goldenrod;
  color: var(--c);
  font-size: 16px;
  border: 0.3em solid var(--c);
  border-radius: 0.5em;
  width: 200px;
  height: 55px;
  text-transform: uppercase;
  font-weight: bold;
  font-family: sans-serif;
  letter-spacing: 0.3rem;
  text-align: center;
  line-height: 3rem;
  transition: 0.7s;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

const Button = ({ value, handlerClick }) => {
  return <Btn onClick={handlerClick}>{value}</Btn>;
};
Button.propTypes = {
  value: PropTypes.string.isRequired,
  handlerClick: PropTypes.func.isRequired,
};

export default Button;
