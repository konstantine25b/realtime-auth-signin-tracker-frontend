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

const GLOBAL_SIGNIN_COUNT_QUERY = gql`
  query globalSignInCount {
    globalSignInCount
  }
`;

function Dashboard() {
  const { data: globalData } = useQuery(GLOBAL_SIGNIN_COUNT_QUERY);

  return (
    <StyledContainer>
      {globalData?.globalSignInCount >= 5 && (
        <Notification>Global Sign-In Count Reached 5!</Notification>
      )}

      <CountContainer>
        <PersonalSignIn />

        <GlobalSignIn />
      </CountContainer>
    </StyledContainer>
  );
}

export default Dashboard;
