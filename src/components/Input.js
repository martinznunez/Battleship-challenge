import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  align-items: center;

  justify-content: center;
  input {
    width: 300px;
    padding: 20px;
  }
`;

const Input = ({ setUser, messageError, user }) => {
  return (
    <>
      <Container>
        <input
          onChange={(e) => setUser(e.target.value)}
          type="text"
          value={user}
          placeholder="Payer name"
        />
      </Container>
      {messageError ? <p> {messageError} </p> : null}
    </>
  );
};
Input.propTypes = {
  setUser: PropTypes.func.isRequired,
  messageError: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default Input;
