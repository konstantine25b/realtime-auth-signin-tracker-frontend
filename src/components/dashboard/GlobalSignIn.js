import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { useAuth } from "../../context/AuthContext";

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
  }, [token]);

  useEffect(() => {
    

    const handleWebSocketMessage = () => {
      refetch(); 
    };

   
    const notiSocket = new WebSocket(`ws://127.0.0.1:8000/ws/noti/`);
    notiSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log("Message received:", data.message);
      handleWebSocketMessage(); 
    };

    notiSocket.onclose = function (e) {
      console.error("Notification socket closed unexpectedly");
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
