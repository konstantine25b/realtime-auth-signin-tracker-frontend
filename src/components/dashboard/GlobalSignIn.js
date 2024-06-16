import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { useAuth } from "../../context/AuthContext";
import { url } from "../../context/WebSocketUrl";

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
  const { error, data: globalData, refetch } = useQuery(GLOBAL_SIGNIN_COUNT_QUERY);
  const { token } = useAuth();

  useEffect(() => {
    refetch();
  }, [token,refetch]);

  useEffect(() => {
    

    const handleWebSocketMessage = () => {
      refetch(); 
    };

   
    const notiSocket = new WebSocket(url);
    notiSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log("Message received:", data.message);
      handleWebSocketMessage(); 
    };

    notiSocket.onclose = function (e) {
      console.log("WebSocket closed");
    };

    return () => {
      notiSocket.close();
    };
  }, [refetch]); 

  return (
    <CountColumn>
      <CountTitle>Global Sign-In Count:</CountTitle>
      {error ? <>Error: {error.message}</> : <></>}
      <CountValue>{globalData?.globalSignInCount}</CountValue>
    </CountColumn>
  );
};

export default GlobalSignIn;
