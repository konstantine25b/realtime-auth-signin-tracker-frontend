import React, { useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const StyledButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #1976D2;
  color: white;
  border: none;
  cursor: pointer;
`;

const StyledTypography = styled.p`
  margin-top: 20px;
  font-size: 1.2rem;
  color: red;
`;

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      signInCount
    }
  }
`;

const GLOBAL_SIGNIN_COUNT_QUERY = gql`
  query globalSignInCount {
    globalSignInCount
  }
`;

const INCREMENT_SIGNIN_COUNT_MUTATION = gql`
  mutation incrementSignInCount {
    incrementSignInCount {
      signInCount
    }
  }
`;

function Dashboard() {
  const { data: meData } = useQuery(ME_QUERY);
  const { data: globalData } = useQuery(GLOBAL_SIGNIN_COUNT_QUERY);
  const [incrementSignInCount] = useMutation(INCREMENT_SIGNIN_COUNT_MUTATION);

  useEffect(() => {
    // Logic for real-time updates can be added here
  }, []);

  const handleIncrement = async () => {
    await incrementSignInCount();
  };

  return (
    <StyledContainer>
      <h2>Welcome, {meData?.me?.username}</h2>
      <p>Your Sign-In Count: {meData?.me?.signInCount}</p>
      <p>Global Sign-In Count: {globalData?.globalSignInCount}</p>
      <StyledButton onClick={handleIncrement}>
        Increment Sign-In Count
      </StyledButton>
      {globalData?.globalSignInCount >= 5 && (
        <StyledTypography>
          Global Sign-In Count Reached 5!
        </StyledTypography>
      )}
    </StyledContainer>
  );
}

export default Dashboard;
