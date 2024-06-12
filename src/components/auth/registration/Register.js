import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #1976D2;
  color: white;
  border: none;
  cursor: pointer;
`;

const REGISTER_MUTATION = gql`
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      token
    }
  }
`;

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useMutation(REGISTER_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({ variables: { username, password } });
      localStorage.setItem('token', data.register.token);

      navigate('/dashboard'); 
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <StyledContainer>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <StyledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <StyledButton type="submit">
          Register
        </StyledButton>
      </form>
    </StyledContainer>
  );
}

export default Register;
