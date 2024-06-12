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

const RegisterText = styled.span`
  margin-top: 10px;
  text-decoration: underline;
  color: #1976D2;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #135293;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
      localStorage.setItem('token', data.login.token);
      navigate('/dashboard'); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register'); 
  };

  return (
    <StyledContainer>
      <h2>Login</h2>
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
          Login
        </StyledButton>
      </form>
      <RegisterText onClick={handleRegisterClick}>Don't have an account? Sign up here</RegisterText>
    </StyledContainer>
  );
}

export default Login;