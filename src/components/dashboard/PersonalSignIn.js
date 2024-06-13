import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";

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

const PersonalSignIn = () => {
  const { loading, error, data: meData } = useQuery(ME_QUERY);

  return (
    <CountColumn>
      <CountTitle>Your Sign-In Count:</CountTitle>
      {error? <>Error: {error.message}</> :<></>}
      <CountValue>{meData?.me?.signInCount}</CountValue>
    </CountColumn>
  );
};

export default PersonalSignIn;
