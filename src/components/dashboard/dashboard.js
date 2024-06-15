import React, { useState, useEffect } from "react";
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
  const [showNotification, setShowNotification] = useState(false);
  const { loading: globalLoading, data: globalData, refetch: refetchGlobalCount } = useQuery(
    GLOBAL_SIGNIN_COUNT_QUERY,
    { fetchPolicy: "network-only" } // Ensure network-only fetch policy to avoid caching
  );
  const { loading: winnerLoading, data: winnerData, refetch: refetchWinner } = useQuery(WINNER_QUERY);

  useEffect(() => {
    if (!globalLoading && !winnerLoading && globalData?.globalSignInCount >= 5 && winnerData?.winner) {
      setShowNotification(true);
    }
  }, [globalLoading, winnerLoading, globalData, winnerData]);

  useEffect(() => {
    if( globalData?.globalSignInCount>=5){
      refetchGlobalCount();
      refetchWinner()
    }

  }, [globalLoading]);
  if(globalLoading){
    return null
  }
  

  return (
    <StyledContainer>
      {showNotification && (
        <Notification>
          Global Sign-In Count Reached 5! Winner: {winnerData.winner.username}
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
