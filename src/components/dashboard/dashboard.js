import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Notification = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #f44336;
  color: white;
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
`;

const CountContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const CountColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CountTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const CountValue = styled.p`
  font-size: 1.2rem;
  color: #666;
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

function Dashboard() {
  const { data: meData } = useQuery(ME_QUERY);
  const { data: globalData } = useQuery(GLOBAL_SIGNIN_COUNT_QUERY);

  return (
    <StyledContainer>
      {globalData?.globalSignInCount >= 5 && (
        <Notification>Global Sign-In Count Reached 5!</Notification>
      )}

      <CountContainer>
        <CountColumn>
          <CountTitle>Your Sign-In Count:</CountTitle>
          <CountValue>{meData?.me?.signInCount}</CountValue>
        </CountColumn>

        <CountColumn>
          <CountTitle>Global Sign-In Count:</CountTitle>
          <CountValue>{globalData?.globalSignInCount}</CountValue>
        </CountColumn>
      </CountContainer>
    </StyledContainer>
  );
}

export default Dashboard;
