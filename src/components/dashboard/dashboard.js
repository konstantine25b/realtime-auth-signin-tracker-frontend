import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import PersonalSignIn from "./PersonalSignIn";
import GlobalSignIn from "./GlobalSignIn";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 0 1rem;
`;

const Notification = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #f44336;
  color: white;
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 20px;
  border-radius: 5px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const CountContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const GLOBAL_SIGNIN_COUNT_QUERY = gql`
  query globalSignInCount {
    globalSignInCount
  }
`;

const WINNER_QUERY = gql`
  query winner {
    winner {
      id
      username
    }
  }
`;

function Dashboard() {
  const { loading: globalLoading, data: globalData } = useQuery(GLOBAL_SIGNIN_COUNT_QUERY);
  const { loading: winnerLoading, data: winnerData } = useQuery(WINNER_QUERY, {
    skip: globalData?.globalSignInCount < 215,
  });

  if (globalLoading || winnerLoading) {
    return null; // or a loading spinner
  }

  return (
    <StyledContainer>

      {globalData?.globalSignInCount >= 215 && winnerData?.winner && (
        <Notification>
          Global Sign-In Count Reached 215! Winner: {winnerData.winner.username}
        </Notification>
      )}

      <CountContainer>
        <PersonalSignIn />
        <GlobalSignIn />
      </CountContainer>
    </StyledContainer>
  );
}

export default Dashboard;
