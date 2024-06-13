import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";

const GLOBAL_SIGNIN_COUNT_QUERY = gql`
  query globalSignInCount {
    globalSignInCount
  }
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

const GlobalSignIn = () => {
  const { data: globalData } = useQuery(GLOBAL_SIGNIN_COUNT_QUERY);
  return (
    <CountColumn>
      <CountTitle>Global Sign-In Count:</CountTitle>
      <CountValue>{globalData?.globalSignInCount}</CountValue>
    </CountColumn>
  );
};

export default GlobalSignIn;
